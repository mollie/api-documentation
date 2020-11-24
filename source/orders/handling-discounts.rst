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

.. note:: If you want to partially cancel, ship or refund an order line with a non-zero ``discountAmount``, you will
          have to pass the ``amount`` parameter too. See the :ref:`Partial discounts<partial-discounts>` section for
          an explanation and an example.

Gift cards
----------
If Mollie does not handle your :doc:`gift cards</guides/gift-cards>` for you, you can add an additional line of the type
``gift_card`` instead if your customer wants to apply a gift card. The line must then have a negative amount.

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
               "value": "39.98"
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

Discounts and vouchers
----------------------
If your customer exchanges a voucher that gives a certain discount in your store, you may want to apply a negative
value-added tax to the discount.

Here's an example where a shopper uses a discount code for 10% off:

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
           "type": "discount",
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

Please make sure you use the same VAT rate for the discount as you use for other products in the order.

If you have multiple VAT rates in your order (e.g., the order contains both low and high rate VAT products), and you
want to use discounts, please make sure that if you sum the VAT per rate, none of the sums go below zero. In that case,
it may be necessary to add multiple discount lines, one for each VAT rate used in the order.

Any orders with a negative total VAT amount will be rejected by the Mollie API.

.. _partial-discounts:

Partial discounts
-----------------
In most cases, canceling, shipping or refunding orders is quite straightforward. You specify which
order lines you want to act on and the quantity of each line you want to act on. Amounts are determined automatically by
Mollie.


However, when partially canceling, shipping or refunding an order line that has a non-zero ``discountAmount``, you will
have to pass the ``amount`` parameter as well, as Mollie cannot automatically determine the amount you intended to
cancel, ship or refund.

To put this into perspective, let us show an example of shipping the 2-for-1 promotion as mentioned above, in two steps.

When shipping the first item, we will have to decide whether we want to apply the discount as part of this shipment,
partly apply the discount, or not apply the discount to this shipment.

This means that the ``amount`` parameter that we can pass has to be between €0.00 and €19.99:

``amount`` €0.00
    Fully apply the discount as part of the first shipment. As a result, this unit will be shipped for free. The second
    item will have to be shipped for the full price.

``amount`` €5.00
    Partially apply the discount. As a result, you will have to apply €14.99 discount as part of the next shipment.

``amount`` €19.99
    Do not apply the discount as part of this shipment. As a result, you will have to apply the full discount as part of
    the next shipment.
