Handling discounts
==================
Using the :doc:`Orders API </orders/overview>` you can pass the full details of your customers' orders to Mollie.
Of course, in some cases you might want to give the customer a discount. This document describes how you can pass
various types of discounts and promotions.


2-for-1 type promotions
-----------------------
You may want to offer 2-for-1 type promotions, or other promotions where the customer gets a certain percentage off if
they buy multiple units of the same product. In such cases, your customer gets some part of the order
line for free.

You can do this using the ``discountAmount`` property on the ``lines`` array.

Here's an example of an order line that has a 2-for-1 type promotion:

.. code-block:: json
   :linenos:

   [
       {
           "name": "LEGO City Monster Truck 60180 Building Kit",
           "type": "physical",
           "unitPrice": {
               "currency": "EUR",
               "value": "19.99"
           },
           "vatRate": "21.00",
           "quantity": 2,
           "totalAmount": {
               "currency": "EUR",
               "value": "19.99"
           },
           "discountAmount": {
               "currency": "EUR",
               "value": "19.99"
           },
           "vatAmount": {
               "currency": "EUR",
               "value": "3.47"
           }
       }
   ]

Note how the VAT is only calculated over the amount actually charged to your customer.

Gift cards
----------
If Mollie does not handle your :doc:`gift cards</guides/gift-cards>` for you, you can add an additional line of the type
``giftcard`` instead if your customer wants to apply a gift card. The line must then have a negative amount.

Here's an example where a shopper exchanges a €10.00 gift card:

.. code-block:: json
   :linenos:

   [
       {
           "name": "LEGO City Monster Truck 60180 Building Kit",
           "type": "physical",
           "unitPrice": {
               "currency": "EUR",
               "value": "19.99"
           },
           "vatRate": "21.00",
           "quantity": 2,
           "totalAmount": {
               "currency": "EUR",
               "value": "38.98"
           },
           "vatAmount": {
               "currency": "EUR",
               "value": "6.94"
           }
       },
       {
           "name": "€ 10 VVV Gift card",
           "type": "gift_card",
           "unitPrice": {
               "currency": "EUR",
               "value": "-10.00"
           },
           "vatRate": "0.00",
           "quantity": 1,
           "totalAmount": {
               "currency": "EUR",
               "value": "-10.00"
           },
           "vatAmount": {
               "currency": "EUR",
               "value": "0.00"
           }
       }
   ]

As a gift card is simply a means of payment and is untaxed, this does not affect the VAT amount charged to your
customer.

Store credit and vouchers
-------------------------
If your customer exchanges a voucher that gives a certain discount in your store, you may want to apply value-added tax
to the discount.

Here's an example where a shopper uses a voucher for 10% off:

.. code-block:: json
   :linenos:

   [
       {
           "name": "LEGO City Monster Truck 60180 Building Kit",
           "type": "physical",
           "unitPrice": {
               "currency": "EUR",
               "value": "19.99"
           },
           "vatRate": "21.00",
           "quantity": 2,
           "totalAmount": {
               "currency": "EUR",
               "value": "38.98"
           },
           "vatAmount": {
               "currency": "EUR",
               "value": "6.94"
           }
       },
       {
           "name": "HERFST10 voucher code",
           "type": "store_credit",
           "unitPrice": {
               "currency": "EUR",
               "value": "-3.90"
           },
           "vatRate": "21.00",
           "quantity": 1,
           "totalAmount": {
               "currency": "EUR",
               "value": "-3.90"
           },
           "vatAmount": {
               "currency": "EUR",
               "value": "-0.68"
           }
       }
   ]
