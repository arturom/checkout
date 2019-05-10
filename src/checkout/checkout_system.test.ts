import { InMemoryInventory } from '../inventory/in_memory_inventory';
import { alexaSpeaker, googleHome, macbookPro, raspberryPiB } from '../fixtures/inventory_items';
import { alexaBuyMoreThan3ForTenPercentOff, googleHomeBuy3GetOneFree, macbookProBuyOneGetRaspberryPiFree } from '../fixtures/promo_rules';
import { calculateInvoiceItems } from './checkout_system';
import { instantiateProcessor } from '../promotions/factory';
import { ItemInCart } from '../models';

const processors = [
    instantiateProcessor(alexaBuyMoreThan3ForTenPercentOff),
    instantiateProcessor(googleHomeBuy3GetOneFree),
    instantiateProcessor(macbookProBuyOneGetRaspberryPiFree),
];

const inventory = new InMemoryInventory();
inventory.introduceItem(macbookPro);
inventory.introduceItem(raspberryPiB);

test('Scanned Items: MacBook Pro, Raspberry Pi B', () => {
    const itemsInCart: ItemInCart[] = [
        {
            item: macbookPro.item,
            quantity: 1
        },
        {
            item: raspberryPiB.item,
            quantity: 1
        },
    ];
    const invoiceItems = calculateInvoiceItems(processors, itemsInCart);

    expect(invoiceItems.discounts.length).toBe(1);
    expect(invoiceItems.discounts[0].description).toBe(macbookProBuyOneGetRaspberryPiFree.description);
    expect(invoiceItems.subTotal).toBe(5429.99);
    expect(invoiceItems.total).toBe(5399.99);
});

test('Scanned Items: Google Home, Google Home, Google Home', () => {
    const itemsInCart: ItemInCart[] = [
        {
            item: googleHome.item,
            quantity: 3
        },
    ];
    const invoiceItems = calculateInvoiceItems(processors, itemsInCart);

    expect(invoiceItems.discounts.length).toBe(1);
    expect(invoiceItems.discounts[0].description).toBe(googleHomeBuy3GetOneFree.description);
    expect(invoiceItems.subTotal).toBe(149.97);
    expect(invoiceItems.total).toBe(99.98);
});

test('Scanned Items: Alexa Speaker, Alexa Speaker, Alexa Speaker', () => {
    const itemsInCart: ItemInCart[] = [
        {
            item: alexaSpeaker.item,
            quantity: 3
        },
    ];
    const invoiceItems = calculateInvoiceItems(processors, itemsInCart);

    expect(invoiceItems.discounts.length).toBe(1);
    expect(invoiceItems.discounts[0].description).toBe(alexaBuyMoreThan3ForTenPercentOff.description);
    expect(invoiceItems.subTotal).toBe(328.50);
    expect(invoiceItems.total).toBe(295.65);
});