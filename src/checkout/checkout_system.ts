import { PromoProcessor, Inventory, ItemInCart, ItemsInCartBySKU, InvoiceItems, Discount } from '../models';
import { keyBy, chain } from 'lodash';

export class Checkout {
    processors: PromoProcessor[];
    inventory: Inventory;

    constructor(inventory: Inventory, processors: PromoProcessor[]) {
        this.inventory = inventory;
        this.processors = processors;
    }

    checkout(itemsInCart: ItemInCart[]): InvoiceItems {
        this.inventory.subtractItems(itemsInCart);
        return calculateInvoiceItems(this.processors, itemsInCart);
    }
}

export function calculatePromoDiscounts(processors: PromoProcessor[], itemsInCart: ItemsInCartBySKU): Discount[] {
    return chain(processors)
        .map(processor => processor.calculateDiscount(itemsInCart))
        .filter(x => x !== null)
        .value();
}

export function calculateTotalDiscount(discounts: Discount[]): number {
    return chain(discounts)
        .map(discount => discount.discountTotal)
        .reduce((prev, curr) => prev + curr, 0)
        .value();
}

export function calculateInvoiceItems(processors: PromoProcessor[], itemsInCart: ItemInCart[]): InvoiceItems {
    const itemsBySku = keyBy(itemsInCart, item => item.item.sku);
    const discounts = calculatePromoDiscounts(processors, itemsBySku);
    const totalDiscount = calculateTotalDiscount(discounts);
    const subTotal = calculateSubTotal(itemsInCart);
    const total = subTotal - totalDiscount;
    return {
        itemsInCart,
        discounts,
        subTotal,
        totalDiscount,
        total
    };
}

export function calculateSubTotal(itemsInCart: ItemInCart[]): number {
    return itemsInCart
        .map(item => item.item.price * item.quantity)
        .reduce((prev, curr) => prev + curr, 0);
}