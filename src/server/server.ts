import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Checkout, calculateInvoiceItems } from '../checkout/checkout_system';
import { InMemoryInventory } from '../inventory/in_memory_inventory';
import { chain } from 'lodash';
import { ItemInCart } from '../models';
import { instantiateProcessor } from '../promotions/factory';
import { alexaSpeaker, googleHome, macbookPro, raspberryPiB  } from '../fixtures/inventory_items';
import { alexaBuyMoreThan3ForTenPercentOff, googleHomeBuy3GetOneFree, macbookProBuyOneGetRaspberryPiFree } from '../fixtures/promo_rules';

const app = express();

const inventory = new InMemoryInventory();
const processors = [];
const checkoutSystem = new Checkout(inventory, processors);


inventory.introduceItem(alexaSpeaker);
inventory.introduceItem(googleHome);
inventory.introduceItem(macbookPro);
inventory.introduceItem(raspberryPiB);

processors.push(instantiateProcessor(alexaBuyMoreThan3ForTenPercentOff));
processors.push(instantiateProcessor(macbookProBuyOneGetRaspberryPiFree));
processors.push(instantiateProcessor(googleHomeBuy3GetOneFree));

app.use(bodyParser.json());

app.post('/cart', (req, res) => {
    const items: Record<string, number> = req.body;
    const itemsInCart: ItemInCart[] = chain(items)
        .toPairs()
        .map(([sku, quantity]) => ({
            item: inventory.getItem(sku).item,
            quantity
        }))
        .value();
    res.json(calculateInvoiceItems(processors, itemsInCart));
});

app.post('/checkout', (req, res) => {
    const items: Record<string, number> = req.body;
    const itemsInCart: ItemInCart[] = chain(items)
        .toPairs()
        .map(([sku, quantity]) => ({
            item: inventory.getItem(sku).item,
            quantity
        }))
        .value();
    res.json(checkoutSystem.checkout(itemsInCart));
});

app.get('/inventory/:sku', (req, res) => {
    res.json(inventory.getItem(req.params.sku));
});

app.get('/inventory', (req, res) => {
    res.json(inventory.getAllItems());
});

app.post('/inventory', (req, res) => {
    inventory.introduceItem(req.body);
    res.json(req.body);
});

app.post('/promos', (req, res) => {
    processors.push(instantiateProcessor(req.body));
    res.json(req.body);
});

app.listen(8800, () => {
    console.log('Server listening on port 8800');
});