export interface Item {
    sku: string;
    name: string;
    price: number;
}

export interface ItemInCart {
    item: Item;
    quantity: number;
}

export type ItemsInCartBySKU = Record<string, ItemInCart>;

export interface InventoryItem {
    item: Item;
    quantity: number;
}

export interface Discount {
    primarySKU: string;
    description: string;
    quantityAffected: number;
    discountTotal: number;
}

export interface PromoRule<PromoRuleType, ParamsType> {
    type: PromoRuleType;
    primarySKU: string;
    description: string;
    params: ParamsType;
}

export interface PromoProcessor {
    calculateDiscount(cartItems: ItemsInCartBySKU): Discount | null;
}

export interface Inventory {
    introduceItem(item: InventoryItem): void;
    updateItemQuantity(sku: string, delta: number): number;
    getItemQuantity(sku: string): number;
    containsAllItems(items: ItemInCart[]): boolean;
    subtractItems(items: ItemInCart[]): void;
}

export interface InvoiceItems {
    itemsInCart: ItemInCart[],
    discounts: Discount[],
    subTotal: number;
    totalDiscount: number;
    total: number;
}