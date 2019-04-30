import { PromoRule, PromoProcessor, Discount, ItemsInCartBySKU } from "../../models";

export interface RuleParams {
    minimumCount: number;
}

export type Rule = PromoRule<'BuyXAmountGetOneFree', RuleParams>;

export class Processor implements PromoProcessor {
    rule: Rule;

    constructor(rule: Rule) {
        this.rule = rule;
    }

    calculateDiscount(cartItems: ItemsInCartBySKU): Discount | null {
        const { primarySKU, params, description } = this.rule;
        const { minimumCount } = params;
        const affectedItem = cartItems[primarySKU];

        if (affectedItem === undefined || affectedItem.quantity < minimumCount) {
            return null;
        }

        const quantityAffected = Math.floor(affectedItem.quantity / minimumCount);
        const skuPrice = affectedItem.item.price;

        return {
            description,
            primarySKU,
            quantityAffected,
            discountTotal: quantityAffected * skuPrice,
        };
    }
}