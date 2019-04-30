import { Inventory, InventoryItem, ItemInCart } from '../models';
import { InventoryError } from './errors';


export class InMemoryInventory implements Inventory {
    private items: Record<string, InventoryItem>;

    constructor() {
        this.items = {};
    }

    introduceItem(item: InventoryItem): void {
        const sku = item.item.sku;
        if (this.items[sku] !== undefined) {
            throw new InventoryError("Cannot introduce the same SKU twice");
        }
        this.items[sku] = item;
    }

    updateItemQuantity(sku: string, delta: number): number {
        if (this.items[sku] === undefined) {
            throw new InventoryError("Cannot update non existent item");
        }
        if (this.items[sku].quantity + delta < 0) {
            throw new InventoryError("Cannot deduct more than the available inventory");
        }
        return this.items[sku].quantity += delta;
    }

    getItem(sku: string): InventoryItem {
        return this.items[sku];
    }

    getAllItems(): InventoryItem[] {
        return Object.values(this.items);
    }

    getItemQuantity(sku: string): number {
        if (this.items[sku] === undefined) {
            return 0;
        }
        return this.items[sku].quantity;
    }

    containsAllItems(items: ItemInCart[]): boolean {
        return items.every(item => (this.items[item.item.sku] !== undefined) && (item.quantity <= this.items[item.item.sku].quantity));
    }

    subtractItems(items: ItemInCart[]): void {
        if (!this.containsAllItems(items)) {
            throw new InventoryError("Not all items are available");
        };
        items.forEach(item => this.updateItemQuantity(item.item.sku, item.quantity * -1));
    }
}