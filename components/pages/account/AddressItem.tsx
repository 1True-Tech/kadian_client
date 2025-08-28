import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Address } from "@/types/user";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/user";

type Props = {
  address: Address;
};

function EditAddressDialog({ address, isOpen, onClose, onSave }: { 
  address: Address; 
  isOpen: boolean; 
  onClose: () => void;
  onSave: (address: Address) => void;
}) {
  const [editedAddress, setEditedAddress] = useState(address);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedAddress);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
          <DialogDescription>
            Make changes to your address here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedAddress.name}
                onChange={(e) =>
                  setEditedAddress({ ...editedAddress, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                value={editedAddress.street}
                onChange={(e) =>
                  setEditedAddress({ ...editedAddress, street: e.target.value })
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
                    setEditedAddress({ ...editedAddress, state: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={editedAddress.zipCode}
                  onChange={(e) =>
                    setEditedAddress({ ...editedAddress, zipCode: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={editedAddress.country}
                  onChange={(e) =>
                    setEditedAddress({ ...editedAddress, country: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteAddressDialog({ isOpen, onClose, onConfirm }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Address</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this address? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AddressItem({ address }: Props) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { actions } = useUserStore();
  const handleEdit = (updatedAddress: Address) => {
    // Here you would typically make an API call to update the address
    console.log('Update address:', updatedAddress);
  };

  const handleDelete = () => {
    // Here you would typically make an API call to delete the address
    console.log('Delete address:', address.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium">{address.name}</h3>
              {address.isDefault && <Badge variant="secondary">Default</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">
              {address.street}
              <br />
              {address.city}, {address.state} {address.zipCode}
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
        onSave={handleEdit}
      />

      <DeleteAddressDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
