"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddressItem from "@/components/pages/account/AddressItem";
import AddAddressDialog from "@/components/pages/account/AddAddressDialog";
import { useUserStore } from "@/store/user";
import { useState } from "react";
import type { Address } from "@/types/user";

export default function AddressesPage() {
  const { user } = useUserStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  if (!user) return null;

  const handleAddAddress = (newAddress: Omit<Address, 'id'>) => {
    // Here you would typically make an API call to add the address
    console.log('Add new address:', newAddress);
  };

  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Saved Addresses</CardTitle>
          <Button variant="outline" onClick={() => setIsAddDialogOpen(true)}>
            Add New Address
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.addresses.map((address) => (
              <AddressItem key={address.city} address={address} />
            ))}
          </div>
        </CardContent>
      </Card>

      <AddAddressDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddAddress}
      />
    </div>
  );
}
