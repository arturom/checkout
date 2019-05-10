export API_HOST='http://localhost:8800'

# Insert inventory items
curl -X POST \
  $API_HOST/inventory \
  -H 'Content-Type: application/json' \
  -d '{
    "item": {
        "sku": "120P90",
        "name": "Google Home",
        "price": 49.99
    },
    "quantity": 10
}'
echo
curl -X POST \
  $API_HOST/inventory \
  -H 'Content-Type: application/json' \
  -d '{
    "item": {
        "sku": "43N23P",
        "name": "MacBook Pro",
        "price": 5399.99
    },
    "quantity": 5
}'
echo
curl -X POST \
  $API_HOST/inventory \
  -H 'Content-Type: application/json' \
  -d '{
    "item": {
        "sku": "A304SD",
        "name": "Alexa Speaker",
        "price": 109.50
    },
    "quantity": 10
}'
echo
curl -X POST \
  $API_HOST/inventory \
  -H 'Content-Type: application/json' \
  -d '{
    "item": {
        "sku": "234234",
        "name": "Raspberry Pi B",
        "price": 30.00
    },
    "quantity": 2
}'
echo

# Insert promo rules
curl -X POST \
  $API_HOST/promos \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "BuyXQuantityGetYPercentOff",
    "description": "Buying more than 3 Alexa Speakers will have a 10% discount on all Alexa speakers",
    "primarySKU": "A304SD",
    "params": {
        "discountPercentAsDecimal": 0.1,
        "minimumQuantity": 3
    }
}'
echo
curl -X POST \
  $API_HOST/promos \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "BuyXItemGetYFree",
    "description": "Each sale of a MacBook Pro comes with a free Raspberry",
    "primarySKU": "234234",
    "params": {
        "fullPricedItemSKU": "43N23P"
    }
}'
echo
curl -X POST \
  $API_HOST/promos \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "BuyXAmountGetOneFree",
    "description": "Buy 3 Google Homes for the price of 2",
    "primarySKU": "120P90",
    "params": {
      "minimumCount": 3
    }
}'
echo
# Checkout items
# Scanned Items: MacBook Pro, Raspberry Pi B Total: $5,399.99
curl -X POST \
  $API_HOST/checkout \
  -H 'Content-Type: application/json' \
  -d '{
    "43N23P": 1,
    "234234": 1
}'
echo
# Scanned Items: Google Home, Google Home, Google Home Total: $99.98
curl -X POST \
  $API_HOST/checkout \
  -H 'Content-Type: application/json' \
  -d '{
    "120P90": 3
}'
echo
# Scanned Items: Alexa Speaker, Alexa Speaker, Alexa Speaker Total: $295.65
curl -X POST \
  $API_HOST/checkout \
  -H 'Content-Type: application/json' \
  -d '{
    "A304SD": 3
}'
echo