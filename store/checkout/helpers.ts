import { buildCreateOrderBody } from "@/lib/controllers/buildOrdersBody";
import { createOrder } from "@/lib/server/handlers";
import { toast } from "sonner";
import { CheckoutStore } from "./types";
import { v4 as uuidv4 } from "uuid";
import { CartItemReady } from "@/types/user";

export async function handleCreateOrder({
  next,
  state,
}: {
  next: (orderId: string) => void;
  state: {
    actions: CheckoutStore["actions"];
    orderProcessData: CheckoutStore["orderProcessData"];
  };
}) {
  const {
    actions,
    orderProcessData: {
      itemsForOrder,
      userInfo,
      paymentMethod,
      idempotencyKey: ipk,
    },
  } = state;
  actions.setLoaders("create-order");
  try {
    const body = buildCreateOrderBody(itemsForOrder, userInfo, paymentMethod);
    const idempotencyKey = ipk || uuidv4();

    const res = await createOrder({
      body: { ...body, idempotencyKey },
    });
    if (res?.data.orderId) {
      // clearCart({
      //   itemsOnOrder: itemsForOrder.map((i) => ({
      //     pid: i.productId,
      //     vsku: i.variantSku,
      //   })),
      // });
      const newId = res.data.orderId;
      actions.setOrderId(newId);
      next(newId);
      return newId;
    }
    throw new Error("Failed to create order");
  } catch {
    toast.error("Failed to create order");
    return null;
  } finally {
    actions.setLoaders(null);
  }
}

export const checkInventoryAvailability = async (items: CartItemReady[]) => {
  try {
    if (!items || items.length === 0) return [];

    const inventoryChecks = await Promise.all(
      items.map(async (item) => {
        const response = await fetch(
          `/api/inventory/${item.productId}/${item.variantSku}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          return { available: false, item, currentStock: 0 };
        }

        const data = await response.json();
        const currentStock = data.data?.currentStock ?? 0;
        const stockThreshold = data.data?.stockThreshold ?? 0;
        const available = currentStock - (item.quantity || 1) >= stockThreshold;

        return { available, item, currentStock };
      })
    );

    const unavailableItems = inventoryChecks.filter((c) => !c.available);
    const availableItems = inventoryChecks.filter((c) => c.available);

    if (unavailableItems.length > 0) {
      const itemNames = unavailableItems
        .map(
          (check) =>
            `${check.item.name} (${check.currentStock} available, ${check.item.quantity} requested)`
        )
        .join(", ");
      toast.warning(
        `Some items are no longer available in the requested quantity: ${itemNames}`
      );
    }

    return availableItems.map((check) => ({
      ...check.item,
      currentStock: check.currentStock,
    }));
  } catch (err) {
    toast.error("Unable to verify product availability. Please try again.");
    console.error(err);
    return null;
  }
};
