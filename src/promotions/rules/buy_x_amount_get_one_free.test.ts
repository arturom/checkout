import { googleHome } from '../../fixtures/items';
import { googleHomeBuy3GetOneFree } from '../../fixtures/promo_rules';
import { ItemsInCartBySKU } from '../../models';
import { Processor } from './buy_x_amount_get_one_free';

test('No discount when quantity under minimum', () => {
    const processor = new Processor(googleHomeBuy3GetOneFree);
    const cartItems: ItemsInCartBySKU = {};
    cartItems[googleHome.sku] = {
        item: googleHome,
        quantity: 2
    };
    expect(processor.calculateDiscount(cartItems)).toBe(null);
});

test('Discount when quantity equal to minimum', () => {
    const processor = new Processor(googleHomeBuy3GetOneFree);
    const cartItems: ItemsInCartBySKU = {};
    cartItems[googleHome.sku] = {
        item: googleHome,
        quantity: 3
    };
    const discount = processor.calculateDiscount(cartItems);
    expect(discount).not.toBe(null);
    expect(discount.description).toBe(googleHomeBuy3GetOneFree.description);
    expect(discount.quantityAffected).toBe(1);
    expect(discount.discountTotal).toBe(49.99);
});

test('Discount when quantity above minimum', () => {
    const processor = new Processor(googleHomeBuy3GetOneFree);
    const cartItems: ItemsInCartBySKU = {};
    cartItems[googleHome.sku] = {
        item: googleHome,
        quantity: 5
    };
    const discount = processor.calculateDiscount(cartItems);
    expect(discount).not.toBe(null);
    expect(discount.description).toBe(googleHomeBuy3GetOneFree.description);
    expect(discount.quantityAffected).toBe(1);
    expect(discount.discountTotal).toBe(49.99);
});

test('Double discount value when quantity is twice the minimum', () => {
    const processor = new Processor(googleHomeBuy3GetOneFree);
    const cartItems: ItemsInCartBySKU = {};
    cartItems[googleHome.sku] = {
        item: googleHome,
        quantity: 6
    };
    const discount = processor.calculateDiscount(cartItems);
    expect(discount).not.toBe(null);
    expect(discount.description).toBe(googleHomeBuy3GetOneFree.description);
    expect(discount.quantityAffected).toBe(2);
    expect(discount.discountTotal).toBe(99.98);
});