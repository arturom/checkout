import { PromoRule, PromoProcessor, Discount, ItemsInCartBySKU } from "../../models";

export interface RuleParams {
    fullPricedItemSKU: string;
}

export type Rule = PromoRule<'BuyXItemGetYFree', RuleParams>;

export class Processor implements PromoProcessor {
    rule: Rule;

    constructor(rule: Rule) {
        this.rule = rule;
    }

    calculateDiscount(cartItems: ItemsInCartBySKU): Discount | null {
        const { primarySKU, params, description } = this.rule;
        const { fullPricedItemSKU } = params;
        const affectedItem = cartItems[primarySKU];
        const fullPricedItem = cartItems[fullPricedItemSKU];

        if (affectedItem === undefined || affectedItem.quantity < 1) {
            return null;
        }

        if (fullPricedItem === undefined || fullPricedItem.quantity < 1) {
            return null;
        }

        const quantityAffected = Math.min(fullPricedItem.quantity, affectedItem.quantity);
        const freeItemPrice = affectedItem.item.price;

        return {
            description,
            primarySKU,
            quantityAffected,
            discountTotal: quantityAffected * freeItemPrice,
        };
    }
}