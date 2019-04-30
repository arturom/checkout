import { alexaSpeaker } from '../../fixtures/items';
import { alexaBuyMoreThan3ForTenPercentOff } from '../../fixtures/promo_rules';
import { ItemsInCartBySKU } from '../../models';
import { Processor } from './buy_x_quantity_get_all_for_y_percent_off';

test('No discount when quantity under minimum', () => {
    const processor = new Processor(alexaBuyMoreThan3ForTenPercentOff);
    const cartItems: ItemsInCartBySKU = {};
    cartItems[alexaSpeaker.sku] = {
        item: alexaSpeaker,
        quantity: 2
    };
    expect(processor.calculateDiscount(cartItems)).toBe(null);
});

test('Discount when quantity equal to minimum', () => {
    const processor = new Processor(alexaBuyMoreThan3ForTenPercentOff);
    const cartItems: ItemsInCartBySKU = {};
    cartItems[alexaSpeaker.sku] = {
        item: alexaSpeaker,
        quantity: 3
    };
    const discount = processor.calculateDiscount(cartItems);
    expect(discount).not.toBe(null);
    expect(discount.description).toBe(alexaBuyMoreThan3ForTenPercentOff.description);
    expect(discount.quantityAffected).toBe(3);
    expect(discount.discountTotal).toBe(32.85);
});

test('Discount when quantity above minimum', () => {
    const processor = new Processor(alexaBuyMoreThan3ForTenPercentOff);
    const cartItems: ItemsInCartBySKU = {};
    cartItems[alexaSpeaker.sku] = {
        item: alexaSpeaker,
        quantity: 5
    };
    const discount = processor.calculateDiscount(cartItems);
    expect(discount).not.toBe(null);
    expect(discount.description).toBe(alexaBuyMoreThan3ForTenPercentOff.description);
    expect(discount.quantityAffected).toBe(5);
    expect(discount.discountTotal).toBe(54.75);
});