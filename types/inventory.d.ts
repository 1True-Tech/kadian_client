import { ProductReady } from "./product";

/**
 * A single variant's stock info
 */
export interface InventoryVariant {
  /** Matches the "sku" field in Sanity's product.variant (e.g. "EB-CL-mens-ts") */
  sku: string;
  /** Current (live) stock level for this SKU */
  stock: number;
  /** Minimum stock before alerting */
  stockThreshold: number;
  /** Current stock level, synced from DB */
  currentStock: number;
  /** Price for this variant */
  price: number;
}

export interface InventoryItemSanity {
  /** Label for the inventory item */
  name: string;
  /** The Sanity product ID this inventory document belongs to */
  id: string;
  /** Product slug */
  slug: string;
  /** Array of all variants for the given product, each with its current stock */
  variants: Omit<InventoryVariant, 'currentStock'>[];
  /** ISO timestamp of when the inventory was created in MongoDB */
  createdAt: string;
  /** ISO timestamp of when the inventory was last updated in MongoDB */
  updatedAt: string;
}
/**
 * A product's inventory record
 */
export interface InventoryItem {
  /** Label for the inventory item */
  label: string;
  /** The Sanity product ID this inventory document belongs to */
  sanityProductId: string;
  /** Product slug */
  slug: string;
  /** Array of all variants for the given product, each with its current stock */
  variants: InventoryVariant[];
  /** ISO timestamp of when the inventory was created in MongoDB */
  createdAt: string;
  /** ISO timestamp of when the inventory was last updated in MongoDB */
  updatedAt: string;
}
export interface InventoryItemReady extends InventoryItem {

  productData?: ProductReady
}

/* --------------------------- RESPONSE TYPES --------------------------- */

/**
 * Response for GET /api/v1/inventory/:productId
 */
export interface InventoryGetResponse {
  data?: InventoryItemReady;
}

/**
 * Response for PATCH /api/v1/inventory/:productId
 */
export interface InventoryPutResponse {
  data?: InventoryItemReady;
}

/**
 * Response for GET /api/v1/inventory
 */
export interface InventoryItemsResponse {
  data?: InventoryItemReady[];
}

/**
 * Response for GET /api/v1/inventory/:productId/:sku
 */
export interface InventoryVariantResponse {
  data?: InventoryVariant;
}

/**
 * Response for PATCH /api/v1/inventory/:productId/:sku/stock
 */
export interface InventoryStockUpdateResponse {
  data?: {
    /** SKU of the updated variant */
    sku: string;
    /** Updated stock count */
    stock: number;
    /** Timestamp of the stock update */
    updatedAt: string;
  };
}

/**
 * Response for GET /api/v1/inventory/stock (single variant check)
 */
export interface InventoryStockGetResponse {
  data?: InventoryVariant;
}
