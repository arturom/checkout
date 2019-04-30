import { InMemoryInventory } from './in_memory_inventory';
import { InventoryError } from './errors';
import { ItemInCart } from '../models';
import { macbookPro, raspberryPiB } from '../fixtures/items';

test('Can add items to inventory and update quantities', () => {
    const inventory = new InMemoryInventory();

    inventory.introduceItem({ item: macbookPro, quantity: 100 });
    inventory.introduceItem({ item: raspberryPiB, quantity: 200 });

    expect(inventory.getItemQuantity(macbookPro.sku)).toBe(100);
    expect(inventory.getItemQuantity(raspberryPiB.sku)).toBe(200);

    expect(inventory.updateItemQuantity(macbookPro.sku, 10)).toBe(110);
    expect(inventory.updateItemQuantity(raspberryPiB.sku, -10)).toBe(190);

    expect(inventory.updateItemQuantity(macbookPro.sku, -10)).toBe(100);
    expect(inventory.updateItemQuantity(raspberryPiB.sku, 10)).toBe(200);

    expect(inventory.getItemQuantity(macbookPro.sku)).toBe(100);
    expect(inventory.getItemQuantity(raspberryPiB.sku)).toBe(200);
});

test('Cannot introduce the same SKU twice to same inventory instance', () => {
    const inventory = new InMemoryInventory();

    function addSampleItemToInventory() {
        inventory.introduceItem({item: macbookPro, quantity: 10});
    }

    addSampleItemToInventory();
    expect(addSampleItemToInventory).toThrow(new InventoryError("Cannot introduce the same SKU twice"));
});

test('Can check inventory contents', () => {
    const inventory = new InMemoryInventory();
    const items: ItemInCart[] = [
        {
            item: macbookPro,
            quantity: 100
        }
    ];

    expect(inventory.containsAllItems(items)).toBe(false);

    inventory.introduceItem({item: macbookPro, quantity: 99});
    expect(inventory.containsAllItems(items)).toBe(false);

    inventory.updateItemQuantity(macbookPro.sku, 1);
    expect(inventory.containsAllItems(items)).toBe(true);

    inventory.updateItemQuantity(macbookPro.sku, 1);
    expect(inventory.containsAllItems(items)).toBe(true);
});

test('Can subtract inventory contents', () => {
    const inventory = new InMemoryInventory();
    const items: ItemInCart[] = [
        {
            item: macbookPro,
            quantity: 100
        }
    ];

    inventory.introduceItem({item: macbookPro, quantity: 99});
    expect(() => inventory.subtractItems(items)).toThrow(new InventoryError("Not all items are available"));
    expect(inventory.getItemQuantity(macbookPro.sku)).toBe(99);

    inventory.updateItemQuantity(macbookPro.sku, 1);
    inventory.subtractItems(items);
    expect(inventory.getItemQuantity(macbookPro.sku)).toBe(0);

    expect(() => inventory.subtractItems(items)).toThrow(new InventoryError("Not all items are available"));
    expect(inventory.getItemQuantity(macbookPro.sku)).toBe(0);
});