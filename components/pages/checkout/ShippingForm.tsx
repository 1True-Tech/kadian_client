import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/form/input";
import { Label } from "@/components/ui/label";

type Props = {
  formData: any;
  onChange: (field: string, value: string | boolean) => void;
  visible: boolean;
};

export const ShippingForm = ({ formData, onChange, visible }: Props) => {
  if (!visible) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" value={formData.firstName} onChange={(e) => onChange("firstName", e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" value={formData.lastName} onChange={(e) => onChange("lastName", e.target.value)} required />
          </div>
        </div>
        {/* Other fields: city, state, zip, country */}
        <Checkbox checked={formData.saveAddress} onCheckedChange={(checked) => onChange("saveAddress", !!checked)}>Save for future</Checkbox>
      </CardContent>
    </Card>
  );
};
