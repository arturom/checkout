import { googleHome, macbookPro, raspberryPiB, alexaSpeaker } from './items';
import { Rule as BuyXAmountGetOneFreeRule } from '../promotions/rules/buy_x_amount_get_one_free';
import { Rule as BuyXItemGetYItemFreeRule } from '../promotions/rules/buy_x_item_get_y_item_free';
import { Rule as BuyXQuantityGetYPercentOffRule } from '../promotions/rules/buy_x_quantity_get_all_for_y_percent_off';

export const googleHomeBuy3GetOneFree: BuyXAmountGetOneFreeRule = {
    type: 'BuyXAmountGetOneFree',
    description: 'Buy 3 Google Homes for the price of 2',
    primarySKU: googleHome.sku,
    params: {
        minimumCount: 3
    }
};

export const macbookProBuyOneGetRaspberryPiFree: BuyXItemGetYItemFreeRule = {
    type: 'BuyXItemGetYFree',
    description: 'Each sale of a MacBook Pro comes with a free Raspberry',
    primarySKU: raspberryPiB.sku,
    params: {
        fullPricedItemSKU: macbookPro.sku
    }
};

export const alexaBuyMoreThan3ForTenPercentOff: BuyXQuantityGetYPercentOffRule = {
    type: 'BuyXQuantityGetYPercentOff',
    description: 'Buying more than 3 Alexa Speakers will have a 10% discount on all Alexa speakers',
    primarySKU: alexaSpeaker.sku,
    params: {
        discountPercentAsDecimal: 0.10,
        minimumQuantity: 3
    }
};