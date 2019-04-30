import { PromoRule, PromoProcessor, Discount, ItemsInCartBySKU } from "../../models";

export interface RuleParams {
    minimumQuantity: number;
    discountPercentAsDecimal: number;
}

export type Rule = PromoRule<'BuyXQuantityGetYPercentOff', RuleParams>;

export class Processor implements PromoProcessor {
    rule: Rule;

    constructor(rule: Rule) {
        this.rule = rule;
    }

    calculateDiscount(cartItems: ItemsInCartBySKU): Discount | null {
        const { primarySKU, params, description } = this.rule;
        const { minimumQuantity, discountPercentAsDecimal } = params;
        const affectedItem = cartItems[primarySKU];

        if (affectedItem === undefined || affectedItem.quantity < minimumQuantity) {
            return null;
        }

        const quantityAffected = affectedItem.quantity;

        return {
            description,
            primarySKU,
            quantityAffected,
            discountTotal: quantityAffected * affectedItem.item.price * discountPercentAsDecimal,
        };
    }
}