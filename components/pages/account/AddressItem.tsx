import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@/lib/server/client-hook";
import { useUserStore } from "@/store/user";
import { Address } from "@/types/user";
import { LoaderIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  address: Address;
};

function EditAddressDialog({
  address,
  isOpen,
  onClose,
}: {
  address: Address;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user, actions } = useUserStore();
  const [editedAddress, setEditedAddress] = useState(address);
  const updateAddress = useQuery("updateAddresses");
  const [opened, setOpened] = useState(isOpen);

  React.useEffect(() => {
    setOpened(isOpen);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(1);
    try {
      const res = await updateAddress.run({
        body: {
          updateData: [editedAddress],
        },
      });
      if (!res?.success || !res?.data) {
        throw new Error("Failed to update address");
      }

      actions.setUser({
        ...user!,
        addresses: res.data,
      });
      toast.success("Address updated successfully");
      setOpened(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update address: " + (error as Error).message);
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
          <DialogDescription>
            Make changes to your address here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedAddress.country}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    country: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input
                id="addressLine1"
                value={editedAddress.line1}
                onChange={(e) =>
                  setEditedAddress({ ...editedAddress, line1: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input
                id="addressLine2"
                value={editedAddress.line2}
                onChange={(e) =>
                  setEditedAddress({ ...editedAddress, line2: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={editedAddress.city}
                  onChange={(e) =>
                    setEditedAddress({ ...editedAddress, city: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={editedAddress.state}
                  onChange={(e) =>
                    setEditedAddress({
                      ...editedAddress,
                      state: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="zipCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={editedAddress.postal}
                  onChange={(e) =>
                    setEditedAddress({
                      ...editedAddress,
                      postal: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={editedAddress.country}
                  onChange={(e) =>
                    setEditedAddress({
                      ...editedAddress,
                      country: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={updateAddress.isLoading}
              variant="outline"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button disabled={updateAddress.isLoading} type="submit">
              {updateAddress.isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteAddressDialog({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  id: string;
  onClose: () => void;
}) {
  const { user, actions } = useUserStore();
  const deleteAddress = useQuery("deleteAddress");

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await deleteAddress.run({
        body: {
          addressId: id,
        },
      });
      if (!res?.success) {
        throw new Error("Failed to delete address");
      }
      if (user) {
        actions.setUser({
          ...user,
          addresses: user.addresses.filter((addr) => addr.id !== id),
        });
      }

      toast.success("Address Deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete address: " + (error as Error).message);
    }
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Address</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this address? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={deleteAddress.isLoading}
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={deleteAddress.isLoading}
            variant="destructive"
            onClick={handleConfirm}
          >
            {deleteAddress.isLoading && (
              <LoaderIcon
                className="size-5 animate-spin"
                style={{
                  animationDuration: "1.5s",
                }}
              />
            )}

            {deleteAddress.isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AddressItem({ address }: Props) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium">{address.country}</h3>
              {/* {address. && <Badge variant="secondary">Default</Badge>} */}
            </div>
            <p className="text-sm text-muted-foreground">
              {address.line1}
              <br />
              {address.line2 && (
                <>
                  <br />
                  {address.line2}
                </>
              )}
              {address.city}, {address.state} {address.city}
              <br />
              {address.country}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      <EditAddressDialog
        address={address}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />

      <DeleteAddressDialog
        id={address.id}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
}
