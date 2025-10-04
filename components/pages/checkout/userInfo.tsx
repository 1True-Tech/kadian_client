"use client";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCheckoutStore } from "@/store/checkout";
import { OrderUserInfo } from "@/store/checkout/types";
import { processShippingData } from "@/lib/controllers/processShippingRegions";
import { ShippingCountry } from "@/lib/controllers/processShippingRegions/types";

export const UserInfoForm = () => {
  const {
    orderProcessData: { userInfo },
    actions: { handleNextStep, setUserInfo },
  } = useCheckoutStore();

  const [shippingRegions, setShippingRegions] = useState<ShippingCountry[]>([]);

  useEffect(() => {
    async function load() {
      const res = await processShippingData();
      setShippingRegions(res);
    }
    load();
  }, []);

  const statesForCountry = useMemo(() => {
    const selected = shippingRegions.find(
      (c) => c.id === userInfo.country || c.code === userInfo.country || `${c.name}(${c.code})` === userInfo.country
    );
    return selected ? selected.states : [];
  }, [userInfo.country, shippingRegions]);

  function handleInputChange(field: keyof OrderUserInfo, value: string | boolean) {
    setUserInfo({ [field]: value });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                type="phone"
                value={userInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+2037933102"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

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
                value={userInfo.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={userInfo.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={userInfo.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Select
                value={userInfo.state}
                onValueChange={(v) => handleInputChange("state", v)}
                disabled={statesForCountry.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {statesForCountry.map((state) => (
                    <SelectItem key={state.id} value={state.name}>
                      {state.name} - {state.zone.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={userInfo.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Select
                value={userInfo.country}
                onValueChange={(v) => {
                  handleInputChange("country", v);
                  handleInputChange("state", ""); // reset state
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {shippingRegions.map((country) => (
                    <SelectItem key={country.id} value={`${country.name}(${country.code})`}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="saveAddress"
              checked={userInfo.saveAddress}
              onCheckedChange={(checked) =>
                handleInputChange("saveAddress", !!checked)
              }
            />
            <Label htmlFor="saveAddress" className="text-sm">
              Save this address for future orders
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" className="btn-hero" onClick={() => handleNextStep()}>
          Continue to Review
        </Button>
      </div>
    </>
  );
};
