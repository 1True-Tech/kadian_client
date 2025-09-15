import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckoutFormData } from "@/types/checkout";

interface ShippingAddressSectionProps {
  formData: CheckoutFormData;
  formErrors: Record<string, string>;
  onInputChange: (field: keyof CheckoutFormData, value: string | boolean) => void;
}

const ShippingAddressSection = ({
  formData,
  formErrors,
  onInputChange,
}: ShippingAddressSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => onInputChange("firstName", e.target.value)}
              required
            />
            {formErrors.firstName && (
              <span className="text-sm text-red-500">{formErrors.firstName}</span>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => onInputChange("lastName", e.target.value)}
              required
            />
            {formErrors.lastName && (
              <span className="text-sm text-red-500">{formErrors.lastName}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => onInputChange("city", e.target.value)}
              required
            />
            {formErrors.city && (
              <span className="text-sm text-red-500">{formErrors.city}</span>
            )}
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => onInputChange("state", e.target.value)}
              required
            />
            {formErrors.state && (
              <span className="text-sm text-red-500">{formErrors.state}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => onInputChange("zipCode", e.target.value)}
              required
            />
            {formErrors.zipCode && (
              <span className="text-sm text-red-500">{formErrors.zipCode}</span>
            )}
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => onInputChange("country", e.target.value)}
              required
            />
            {formErrors.country && (
              <span className="text-sm text-red-500">{formErrors.country}</span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="saveAddress"
            checked={formData.saveAddress}
            onCheckedChange={(checked) =>
              onInputChange("saveAddress", !!checked)
            }
          />
          <Label htmlFor="saveAddress" className="text-sm">
            Save this address for future orders
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingAddressSection;
