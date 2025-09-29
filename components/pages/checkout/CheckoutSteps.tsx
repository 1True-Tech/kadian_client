"use client";
import { OrderStatus } from "@/types/order";
import { ShoppingBag, User, CreditCard } from "lucide-react";

export type CheckoutStep = "user-info" | "review" | "payment" | OrderStatus;

interface Props {
  currentStep: CheckoutStep;
}

export const CheckoutSteps = ({ currentStep }: Props) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {/* User Info */}
        <div className={`flex flex-col items-center ${currentStep === "user-info" ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === "user-info" ? "bg-primary text-white" : "bg-muted"}`}>
            <User className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium">Information</span>
        </div>

        <div className="flex-1 h-1 mx-4 bg-muted">
          <div className={`h-full bg-primary ${currentStep === "user-info" ? "w-0" : currentStep === "review" ? "w-1/2" : "w-full"}`}></div>
        </div>

        {/* Review */}
        <div className={`flex flex-col items-center ${currentStep === "review" ? "text-primary" : currentStep === "payment" ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === "review" ? "bg-primary text-white" : currentStep === "payment" ? "bg-primary text-white" : "bg-muted"}`}>
            <ShoppingBag className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium">Review</span>
        </div>

        <div className="flex-1 h-1 mx-4 bg-muted">
          <div className={`h-full bg-primary ${currentStep === "payment" ? "w-full" : "w-0"}`}></div>
        </div>

        {/* Payment */}
        <div className={`flex flex-col items-center ${currentStep === "payment" ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === "payment" ? "bg-primary text-white" : "bg-muted"}`}>
            <CreditCard className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium">Payment</span>
        </div>
      </div>
    </div>
  );
};
