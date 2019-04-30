import { Rule as BuyXAmountGetOneFreeRule, Processor as BuyXAmountGetOneFreeProcessor } from './rules/buy_x_amount_get_one_free';
import { Rule as BuyXItemGetYItemFreeRule, Processor as BuyXItemGetYItemFreeProcessor } from './rules/buy_x_item_get_y_item_free';
import { Rule as BuyXQuantityGetYPercentOffRule, Processor as BuyXQuantityGetYPercentOffProcessor } from './rules/buy_x_quantity_get_all_for_y_percent_off';
import { PromoProcessor } from '../models';

type SupportedRules = BuyXAmountGetOneFreeRule | BuyXItemGetYItemFreeRule | BuyXQuantityGetYPercentOffRule;

export function instantiateProcessor(rule: SupportedRules): PromoProcessor {
    switch(rule.type) {
        case "BuyXAmountGetOneFree":
            return new BuyXAmountGetOneFreeProcessor(rule);
        case "BuyXItemGetYFree":
            return new BuyXItemGetYItemFreeProcessor(rule);
        case "BuyXQuantityGetYPercentOff":
            return new BuyXQuantityGetYPercentOffProcessor(rule);
    }
    throw new Error("Unknown rule")
}