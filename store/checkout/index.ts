import queries from "@/lib/queries";
import { client } from "@/lib/utils/NSClient";
import { CartItem, CartItemReady } from "@/types/user";
import { produce } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CheckoutStore } from "./types";
import { v4 as uuidv4 } from "uuid";
import { checkInventoryAvailability } from "./helpers";

export const useCheckoutStore = create<CheckoutStore>()(
  immer((set, get) => ({
    currentFlow: "UserInfo",
    orderProcessingStatus: "not-started",
    emptyOrder: true,
    orderProcessData: {
      userInfo: {
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        city: "",
        state: "",
        addressLine1: "",
        addressLine2: "",
        zipCode: "",
        country: "",
        saveAddress: false,
      },
      orderId: null,
      idempotencyKey: null,
      itemsForOrder: [],
      proofFile: null,
      paymentMethod: "paypal",
    },
    totalItems: {
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
    },
    loaders: "initializing",
    actions: {
      setCurrentFlow: (flow) => {
        set((state) => {
          state.currentFlow = flow;
        });
      },
      setEmptyOrder(isEmpty) {
        set((state) => {
          state.emptyOrder = isEmpty;
        });
      },
      setOrderProcessingStatus: (status) => {
        set((state) => {
          state.orderProcessingStatus = status;
        });
      },
      resetCheckout: () => {
        set((state) => {
          state.currentFlow = "UserInfo";
          state.orderProcessingStatus = "not-started";
          state.loaders = null;
          state.orderProcessData = {
            userInfo: {
              email: "",
              phone: "",
              firstName: "",
              lastName: "",
              city: "",
              state: "",
              addressLine1: "",
              addressLine2: "",
              zipCode: "",
              country: "",
              saveAddress: false,
            },
            orderId: null,
            idempotencyKey: null,
            itemsForOrder: [],
            proofFile: null,
            paymentMethod: "paypal",
          };
          state.totalItems = {
            subtotal: 0,
            shipping: 0,
            tax: 0,
            total: 0,
          };
        });
      },
      setLoaders: (loader) => {
        set((state) => {
          state.loaders = loader;
        });
      },

      setUserInfo: (info) => {
        set(
          produce((state) => {
            state.orderProcessData.userInfo = {
              ...state.orderProcessData.userInfo,
              ...info,
            };
          })
        );
      },

      setOrderId: (id) => {
        set((state) => {
          state.orderProcessData.orderId = id;
        });
      },
      setIdempotencyKey: (key) => {
        set((state) => {
          state.orderProcessData.idempotencyKey = key;
        });
      },
      setItemsForOrder: (items) => {
        set((state) => {
          state.orderProcessData.itemsForOrder = items;
        });
      },
      loadUserCartItemsForOrder: async (user) => {
        let cart = [];
        if (user && user.cart) {
          cart = user.cart;
        } else {
          cart = JSON.parse(
            localStorage.getItem("cartItems") || "[]"
          ) as CartItem[];
        }

        if (cart?.length > 0) {
          get().actions.setLoaders("user-orders");
          const loadCartProduct: CartItemReady[] = await client.fetch(
            queries.productCartItem,
            {
              ids: cart.map((c) => c.productId),
              vSku: cart.map((c) => c.variantSku),
            }
          );
          const availableItems =
            await checkInventoryAvailability(loadCartProduct);
          if (!availableItems || availableItems.length === 0) {
            get().actions.setEmptyOrder(true);
            get().actions.setLoaders(null);
            return;
          }

          const newItems = availableItems.map((item) => ({
            ...item,
            quantity:
              cart.find((c) => c.variantSku === item.variantSku)?.quantity || 1,
            variantSku: item.variantSku,
          }));
          get().actions.setEmptyOrder(false);
          get().actions.setLoaders(null);
          get().actions.setItemsForOrder(newItems);
          get().actions.setIdempotencyKey(uuidv4());
        } else {
          get().actions.setEmptyOrder(true);
          get().actions.setLoaders(null);
        }
      },
      removeItemFromOrder: (itemId) => {
        set(
          produce<CheckoutStore>((state) => {
            state.orderProcessData.itemsForOrder =
              state.orderProcessData.itemsForOrder.filter(
                (item) => item.id !== itemId
              );
            if (state.orderProcessData.itemsForOrder.length === 0) {
              get().actions.setEmptyOrder(true);
            }
          })
        );
      },
      setProofFile: (file) => {
        set((state) => {
          state.orderProcessData.proofFile = file;
        });
      },
      setPaymentMethod: (method) => {
        set((state) => {
          state.orderProcessData.paymentMethod = method;
        });
      },
      calculateTotals: () => {
        set(
          produce<CheckoutStore>((state) => {
            const subtotal = state.orderProcessData.itemsForOrder.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            );
            const shipping = subtotal > 100 ? 0 : 10; // Example: free shipping over $100
            const tax = subtotal * 0.07; // Example: 7% tax
            const total = subtotal + shipping + tax;

            state.totalItems = {
              subtotal,
              shipping,
              tax,
              total,
            };
          })
        );
      },
      handleNextStep: async (continueProcess) => {
        if (continueProcess) {
          const shouldContinue = await continueProcess(get().currentFlow);
          if (shouldContinue) {
            set((state) => {
              if (state.currentFlow === "UserInfo") {
                state.currentFlow = "Review";
              } else if (state.currentFlow === "Review") {
                state.currentFlow = "Payment";
              }
            });
          }
        } else {
          set((state) => {
            if (state.currentFlow === "UserInfo") {
              state.currentFlow = "Review";
            } else if (state.currentFlow === "Review") {
              state.currentFlow = "Payment";
            }
          });
        }
      },
      handlePreviousStep: async (continueProcess) => {
        if (continueProcess) {
          const shouldContinue = await continueProcess(get().currentFlow);
          if (shouldContinue) {
            set((state) => {
              if (state.currentFlow === "Payment") {
                state.currentFlow = "Review";
              } else if (state.currentFlow === "Review") {
                state.currentFlow = "UserInfo";
              }
            });
          }
        } else {
          set((state) => {
            if (state.currentFlow === "Payment") {
              state.currentFlow = "Review";
            } else if (state.currentFlow === "Review") {
              state.currentFlow = "UserInfo";
            }
          });
        }
      },
    },
  }))
);
