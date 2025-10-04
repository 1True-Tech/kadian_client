import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Address } from "@/types/user";
import { useQuery } from "@/lib/server/client-hook";
import { useUserStore } from "@/store/user";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

const emptyAddress: Omit<Address, "id"> = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal: "",
  country: "",
};

interface AddAddressDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAddressDialog({
  isOpen,
  onClose,
}: AddAddressDialogProps) {
  const [newAddress, setNewAddress] = useState(emptyAddress);
  const { user, actions } = useUserStore();

  const [isDialogOpen, setIsAddDialogOpen] = useState(isOpen);
  React.useEffect(() => {
    setIsAddDialogOpen(isOpen);
  }, [isOpen]);

  const addAddress = useQuery("addAddresses");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addAddress.run({
        body: {
          updateData: [newAddress as Address],
        },
      });
      if (!res?.success || !res?.data) {
        throw new Error("Failed to add address");
      }
      // Update user addresses in the store
      actions.setUser({
        ...user!,
        addresses: res.data,
      });
      setIsAddDialogOpen(false);
      toast.success("Address added successfully");
    } catch (error) {
      toast.error("Failed to add address: " + (error as Error).message);
    }
    setNewAddress(emptyAddress);
    onClose();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
          <DialogDescription>
            Add a new delivery address to your account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input
                id="addressLine1"
                value={newAddress.line1}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, line1: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="addressLine1">Address Line 2</Label>
              <Input
                id="addressLine2"
                value={newAddress.line2}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, line2: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={newAddress.postal}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, postal: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={newAddress.country}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, country: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
            disabled={addAddress.isLoading} 
            variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button 
            disabled={addAddress.isLoading} 
            type="submit">
              {addAddress.isLoading&&<LoaderIcon className="size-5 animate-spin" style={{
                animationDuration: "1.5s"
              }} />}
              {addAddress.isLoading ? "Adding..." : "Add Address"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
