"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { UserDataMini, UserRole } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Trash2Icon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";


export const columns: (props:{setUsers:Dispatch<SetStateAction<UserDataMini[]>>})=>ColumnDef<UserDataMini>[] = ({setUsers})=>( [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return `${user.name.first} ${user.name.last}`;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");
      return isActive ? "Active" : "Inactive";
    },
  },
  {
    accessorKey: "lastSeen",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Seen
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const lastSeen:string = row.getValue("lastSeen");
      return lastSeen ? new Date(lastSeen).toLocaleString() : "Never";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const deleteUser = () => {
        fetch(`/api/users/${user.id}`, { method: "DELETE" }).then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete user");
          }
          if(res.ok && res.status===200){
            // Remove user from the list
            setUsers((prev) => prev.filter((u) => u.id !== user.id));
          }
        });
      };
      const setAs = (role: UserRole) => {
        fetch(`/api/users/${user.id}/role`, {
          method: "PATCH",
          body: JSON.stringify({ role }),
        }).then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete user");
          }
          if(res.ok && res.status===200){
            // Update user role in the list
            setUsers((prev) =>
              prev.map((u) =>
                u.id === user.id
                  ? {
                      ...u,
                      role: role,
                    }
                  : u
              )
            );
          }
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-48 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-1"
          >
            <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase">
              Actions
            </DropdownMenuLabel>

            <DropdownMenuItem asChild>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                    <Trash2Icon className="h-4 w-4" />
                    Delete User
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete{" "}
                      <b>
                        {user.name.first} {user.name.last}
                      </b>
                      ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently remove
                      the user account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-lg">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={deleteUser}
                      className="rounded-lg bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                      Yes, Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem
              onClick={() => setAs(user.role === "user" ? "admin" : "user")}
              className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <span className={cn("h-2 w-2 rounded-full", {
                "bg-green-500": user.role === "user",
                "bg-yellow-500": user.role === "admin",
              })} />
              Set as {user.role === "user" ? "Admin" : "User"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]);
