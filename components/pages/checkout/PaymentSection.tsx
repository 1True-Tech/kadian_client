import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PaymentMethod } from "@/types/checkout";
import { CreditCard, Lock, Truck } from "lucide-react";

interface PaymentSectionProps {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentSection = ({
  paymentMethod,
  onPaymentMethodChange,
  onFileUpload,
}: PaymentSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          value={paymentMethod}
          onValueChange={(val) => onPaymentMethodChange(val as PaymentMethod)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <option value="card">Credit Card</option>
            <option value="transfer">Bank Transfer</option>
            <option value="delivery">Pay on Delivery</option>
          </SelectContent>
        </Select>

        {paymentMethod === "card" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </div>
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  required
                />
              </div>
              <div>
                <Label htmlFor="cardName">Name on Card</Label>
                <Input
                  id="cardName"
                  placeholder="John Smith"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              Your payment information is secure and encrypted
            </div>
          </div>
        )}

        {paymentMethod === "transfer" && (
          <div className="space-y-4">
            <div className="text-sm space-y-2">
              <p>Please transfer the total amount to:</p>
              <div className="bg-muted p-4 rounded">
                <p>Bank: Example Bank</p>
                <p>Account: 1234567890</p>
                <p>Name: Your Company Name</p>
              </div>
              <p>Upload your transfer receipt:</p>
              <Input
                type="file"
                accept="image/*"
                onChange={onFileUpload}
                required
              />
            </div>
          </div>
        )}

        {paymentMethod === "delivery" && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="h-4 w-4" />
            Pay the full amount in cash or card when your order arrives
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentSection;
