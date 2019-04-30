import { macbookPro, raspberryPiB } from '../../fixtures/items';
import { macbookProBuyOneGetRaspberryPiFree } from '../../fixtures/promo_rules';
import { ItemsInCartBySKU } from '../../models';
import { Processor } from './buy_x_item_get_y_item_free';

test('No discount when not buying primary item', () => {
    const processor = new Processor(macbookProBuyOneGetRaspberryPiFree);
    const cartItems: ItemsInCartBySKU = {};
    cartItems[raspberryPiB.sku] = {
        item: raspberryPiB,
        quantity: 2
    };
    expect(processor.calculateDiscount(cartItems)).toBe(null);
});

test('No discount when not buying secondary item', () => {
    const processor = new Processor(macbookProBuyOneGetRaspberryPiFree);
    const cartItems: ItemsInCartBySKU = {};
    cartItems[macbookPro.sku] = {
        item: macbookPro,
        quantity: 2
    };
    expect(processor.calculateDiscount(cartItems)).toBe(null);
});

test('Discount when buying one of each items', () => {
    const processor = new Processor(macbookProBuyOneGetRaspberryPiFree);
    const cartItems: ItemsInCartBySKU = {};
    cartItems[macbookPro.sku] = {
        item: macbookPro,
        quantity: 1
    };
    cartItems[raspberryPiB.sku] = {
        item: raspberryPiB,
        quantity: 1
    };
    const discount = processor.calculateDiscount(cartItems);
    expect(discount).not.toBe(null);
    expect(discount.description).toBe(macbookProBuyOneGetRaspberryPiFree.description);
    expect(discount.quantityAffected).toBe(1);
    expect(discount.discountTotal).toBe(30.00);
});

test('Double discount when buying two of each items', () => {
    const processor = new Processor(macbookProBuyOneGetRaspberryPiFree);
    const cartItems: ItemsInCartBySKU = {};
    cartItems[macbookPro.sku] = {
        item: macbookPro,
        quantity: 2
    };
    cartItems[raspberryPiB.sku] = {
        item: raspberryPiB,
        quantity: 2
    };
    const discount = processor.calculateDiscount(cartItems);
    expect(discount).not.toBe(null);
    expect(discount.description).toBe(macbookProBuyOneGetRaspberryPiFree.description);
    expect(discount.quantityAffected).toBe(2);
    expect(discount.discountTotal).toBe(60.00);
});

test('Single discount when buying one full-price item', () => {
    const processor = new Processor(macbookProBuyOneGetRaspberryPiFree);
    const cartItems: ItemsInCartBySKU = {};
    cartItems[macbookPro.sku] = {
        item: macbookPro,
        quantity: 1
    };
    cartItems[raspberryPiB.sku] = {
        item: raspberryPiB,
        quantity: 2
    };
    const discount = processor.calculateDiscount(cartItems);
    expect(discount).not.toBe(null);
    expect(discount.description).toBe(macbookProBuyOneGetRaspberryPiFree.description);
    expect(discount.quantityAffected).toBe(1);
    expect(discount.discountTotal).toBe(30.00);
});

test('Single discount when buying one promo item', () => {
    const processor = new Processor(macbookProBuyOneGetRaspberryPiFree);
    const cartItems: ItemsInCartBySKU = {};
    cartItems[macbookPro.sku] = {
        item: macbookPro,
        quantity: 2
    };
    cartItems[raspberryPiB.sku] = {
        item: raspberryPiB,
        quantity: 1
    };
    const discount = processor.calculateDiscount(cartItems);
    expect(discount).not.toBe(null);
    expect(discount.description).toBe(macbookProBuyOneGetRaspberryPiFree.description);
    expect(discount.quantityAffected).toBe(1);
    expect(discount.discountTotal).toBe(30.00);
});