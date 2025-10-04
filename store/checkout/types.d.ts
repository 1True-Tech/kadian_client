import { PaymentMethod } from "@/types/order";
import { CartItemReady } from "@/types/user";
import { storeUser } from "../user/types";

export type CheckoutFlow =
  | "UserInfo"
  | "Review"
  | "Payment"
  | "Complete"
  | "Cancelled";
export type OrderProcessingStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "failed";
export interface OrderUserInfo {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
  country: string;
  saveAddress: boolean;
}
export type FlowLoaders = "create-order" | "process-payment" | "user-orders" | "initializing" | null
export interface CheckoutStore {
  currentFlow: CheckoutFlow;
  orderProcessingStatus: OrderProcessingStatus;
  loaders: FlowLoaders;
  emptyOrder:boolean;
  orderProcessData: {
    userInfo: OrderUserInfo;
    orderId: string | null;
    idempotencyKey: string | null;
    itemsForOrder: CartItemReady[];
    proofFile: File | null;
    paymentMethod: PaymentMethod;
  };
  totalItems: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  actions: {
    setCurrentFlow: (flow: CheckoutFlow) => void;
    setOrderProcessingStatus: (status: OrderProcessingStatus) => void;
    setUserInfo: (info: Patrial<OrderUserInfo>) => void;
    setOrderId: (id: string) => void;
    setIdempotencyKey: (key: string) => void;
    setItemsForOrder: (items: CartItemReady[]) => void;
    removeItemFromOrder: (itemId: string) => void;
    setProofFile: (file: File | null) => void;
    setPaymentMethod: (method: PaymentMethod) => void;
    calculateTotals: () => void;
    handleNextStep: (
        continueProcess?: (currentFlow: CheckoutFlow) => Promise<boolean>
    ) => void;
    handlePreviousStep: (
        continueProcess?: (currentFlow: CheckoutFlow) => Promise<boolean>
    ) => void;
    resetCheckout: () => void;
    setLoaders: (loader: FlowLoaders) => void;
    loadUserCartItemsForOrder: (user:storeUser) => void;
    setEmptyOrder: (isEmpty:boolean) => void;
  };
}
