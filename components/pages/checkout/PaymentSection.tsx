"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  paymentMethod: string;
  setPaymentMethod: (method: any) => void;
  proofFile: File | null;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProcessPayment: () => void;
  handlePreviousStep: () => void;
}

export const PaymentMethodForm = ({ paymentMethod, setPaymentMethod, proofFile, handleFileUpload, handleProcessPayment, handlePreviousStep }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="flex items-center gap-2">
            <input type="radio" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("stripe")} />
            Credit/Debit Card (Stripe)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={paymentMethod === "transfer"} onChange={() => setPaymentMethod("transfer")} />
            Bank Transfer / Upload Proof
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={paymentMethod === "delivery"} onChange={() => setPaymentMethod("delivery")} />
            Pay on Delivery
          </label>
        </div>

        {paymentMethod === "transfer" && (
          <div>
            <Label htmlFor="proof">Upload Proof of Payment</Label>
            <Input type="file" id="proof" onChange={handleFileUpload} />
          </div>
        )}

        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={handlePreviousStep}>Back</Button>
          <Button size="lg" className="btn-hero" onClick={handleProcessPayment}>Pay Now</Button>
        </div>
      </CardContent>
    </Card>
  );
};
