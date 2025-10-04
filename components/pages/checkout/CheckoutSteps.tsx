"use client";

import { CheckoutFlow } from "@/store/checkout/types";
import {
  ShoppingBag,
  User,
  CreditCard,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Props {
  currentStep: CheckoutFlow;
}

const steps: { key: CheckoutFlow; label: string; icon: React.ElementType }[] = [
  { key: "UserInfo", label: "Information", icon: User },
  { key: "Review", label: "Review", icon: ShoppingBag },
  { key: "Payment", label: "Payment", icon: CreditCard },
];

export const CheckoutSteps = ({ currentStep }: Props) => {
  // If flow is finished (success or cancelled), only show that state
  if (currentStep === "Complete" || currentStep === "Cancelled") {
    const isSuccess = currentStep === "Complete";
    const Icon = isSuccess ? CheckCircle : XCircle;
    const label = isSuccess ? "Successful" : "Cancelled";
    const color = isSuccess
      ? "text-green-600 bg-green-100"
      : "text-red-600 bg-red-100";

    return (
      <div className="mb-8 flex justify-center">
        <div className="flex flex-row items-center gap-5">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${color}`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <span
            className={`text-sm font-medium ${isSuccess ? "text-green-600" : "text-red-600"}`}
          >
            {label}
          </span>
        </div>
      </div>
    );
  }

  // Normal checkout flow
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div
              key={step.key}
              className="flex-1 flex flex-col items-center relative"
            >
              {/* Step circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2
            ${isActive ? "bg-primary text-white" : isCompleted ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Label */}
              <span
                className={`text-sm font-medium ${
                  isActive || isCompleted
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>

              {/* Connector line (not for last step) */}
              {index < steps.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-1 -translate-y-1/2 z-[-1]">
                  <div className="w-full bg-muted h-1">
                    <div
                      className={`h-1 bg-primary transition-all ${
                        index < currentIndex ? "w-full" : "w-0"
                      }`}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
