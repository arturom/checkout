# Checkout System #

### Synopsis ###
This app simulates two steps in the checkout process of a retail system:
 1. Calculate the total price after applying promo discounts 
 2. Update the inventory counts after a succesful transaction

 The tests of biggest significance are in [checkout_system.test.ts](/src/checkout/checkout_system.test.ts).

 ### Approach to Calculate Discounts ###
 To calculate discounts, these concepts are used:
 - **Discount:** An object that describes savings based on some promotion. Discounts can be placed in a "discounts" section of an invoice.
 - **Promo Processor Interface:** An interface that analyzes the contents of a shopping cart and returns a `Discount` object.
 - **Promo Processor Class:** An class that implements the `PromoProcessor` interface.
 - **Promo Rule:** An serializable object used to instantiate and configure concrete instances of a Promo Processor class
 - **Promo Processor Factory:** A function that takes a Promo Rule and instantiates the correct Promo Procesor.

### API Endpoints ###
 - `POST /inventory` - Introduces a new item to the inventory
 - `GET /inventory` - Gets a list of all items in the inventory
 - `GET /inventory/:sku` - Gets a single item from the inventory
 - `POST /promos` - Adds a new promo rule
 - `POST /cart` - Submits the contents of a cart to evaluate promos and subtotals
 - `POST /checkout` - Submits the contents of a cart, deducts the items from inventory, and 

 The last two endpoints take an object with SKUs as keys and quantity of items in cart as the object values. For example:
 ```json
{
	"234234": 2,
	"A304SD": 1 
}
 ```


### Possible Improvements ###
- Create a client library and a client UI
- Use client library to load initial items from a config file
- Validate user input
- Add an audit log of inventory transactions
- Separate app into services (inventory, shopping-carts, checkout)
- Create API endpoint to update promo rules dynamically at runtime
- Support async locks in inventory to allow a transaction with multiple inventory changes to be atomic
- Define rules for when and how promos can be stacked on the same product
- Save inventory items to a database instead of only storing them in memory
- Put promo rules in a database instead of only holding them in memory
- Separate Express routes into controller

### Running the App ###
```bash
# Install dependencies
npm i

# Run unit tests
npm run tests

# Transpile Typescript to Javascript
npm run compile

# Run server after transpiling
node buld/server/server.js
```