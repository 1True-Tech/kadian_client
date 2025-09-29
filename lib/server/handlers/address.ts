import cookies from "@/lib/utils/cookies";
import { GeneralResponse } from "@/types/structures";
import { Address } from "@/types/user";
// Request body to add or update addresses
export interface AddressRequestBody {
  updateData: Address[];   // Array of addresses
}

// Request body to delete a single address
export interface AddressDeleteRequest {
  addressId: string;                  // Address _id
}

// Response when returning addresses
export interface AddressResponse extends GeneralResponse {
  data?: Address | Address[];
}
/**
 * Get user addresses
 */
export async function getAddresses(): Promise<GeneralResponse & { data?: Address[] }> {
  const token = cookies.get("access_token") || "";
  const res = await fetch("/api/auth/me/address", {
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

/**
 * Add new addresses
 */
export async function addAddresses({ body }: { body: AddressRequestBody }): Promise<GeneralResponse & { data?: Address[] }> {
  const token = cookies.get("access_token") || "";
  const res = await fetch("/api/auth/me/address", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });

  const data: GeneralResponse & { data?: Address[] } = await res.json();
  return data;
}

/**
 * Update addresses by id
 */
export async function updateAddresses({ body }: { body: AddressRequestBody }): Promise<GeneralResponse & { data?: Address[] }> {
  const token = cookies.get("access_token") || "";
  const res = await fetch("/api/auth/me/address", {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });

  const data: GeneralResponse & { data?: Address[] } = await res.json();
  return data;
}

/**
 * Delete an address by id
 */
export async function deleteAddress({ body }: { body: AddressDeleteRequest }): Promise<GeneralResponse> {
  const token = cookies.get("access_token") || "";
  const res = await fetch("/api/auth/me/address", {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });

  const data: GeneralResponse = await res.json();
  return data;
}
