Testing the Mollie API
======================
During the process of building your integration, it is important to properly test it. As briefly explained in our
:doc:`authentication guide </overview/authentication>`, you can access the test mode of the Mollie API in two ways: by
using the *Test API key*, or, if you are using organization access tokens or app tokens, by providing the ``testmode``
parameter in your API request.

Any payments or other resources you create in test mode are completely isolated from your live mode data. Going back and
forth between test and live mode is as easy as switching out the API key - or toggling the ``testmode`` parameter in
case of the other authentication methods.

Test mode checkout screen
-------------------------
When creating payments or orders in test mode, the regular checkout hosted payment pages will be replaced by a test mode
checkout screen. Most test mode payment resources will feature a ``checkout`` URL just like in live mode, which then
allows you to walk through the payment process without spending actual money. You can try out different payment statuses
and see whether your integration handles it correctly.

.. image:: images/testmode-checkout.png

For test mode :doc:`recurring payments </payments/recurring>`, the resource will not contain a ``checkout`` URL, because
these payments are executed without any interaction of your customer. Instead, a ``changePaymentState`` URL is added,
which allows you to set the final payment state for these payments.

For paid test mode payments the resource will also include the ``changePaymentState`` URL which allows you to
:doc:`create a refund </payments/refunds>` or chargeback for that payment directly from our hosted payment page. This
can be used to test refund and chargeback functionality.

Apart from the hosted payment pages and the fact that test mode payments are created instead of real ones, the Mollie
API behaves identical in both environments. This includes calling your :doc:`webhook </overview/webhooks>`.

Testing card payments
---------------------
Credit card payments can fail for various reasons ranging from having provided an invalid card number to having the card
issuer reject the payment due to insufficient funds. In the case of a failed credit card payment, the API therefore
includes a ``failureReason`` in the :doc:`payment response </reference/v2/payments-api/get-payment>` to provide more
context.

To test the various failure reasons the Mollie API can return, you can create your test mode card payment with a
specific amount according to the table below. If you then force the payment to the ``failed`` status in the test flow,
the payment response will include the appropriate failure reason.

.. table::
   :header-alignment: left right
   :column-alignment: left right

   +------------------------------+--------------+
   | Failure reason to trigger    | Magic amount |
   +==============================+==============+
   | ``invalid_card_number``      |   € 1,001.00 |
   +------------------------------+--------------+
   | ``invalid_cvv``              |   € 1,002.00 |
   +------------------------------+--------------+
   | ``invalid_card_holder_name`` |   € 1,003.00 |
   +------------------------------+--------------+
   | ``card_expired``             |   € 1,004.00 |
   +------------------------------+--------------+
   | ``invalid_card_type``        |   € 1,005.00 |
   +------------------------------+--------------+
   | ``refused_by_issuer``        |   € 1,006.00 |
   +------------------------------+--------------+
   | ``insufficient_funds``       |   € 1,007.00 |
   +------------------------------+--------------+
   | ``inactive_card``            |   € 1,008.00 |
   +------------------------------+--------------+
   | ``possible_fraud``           |   € 1,009.00 |
   +------------------------------+--------------+
   | ``authentication_failed``    |   € 1,010.00 |
   +------------------------------+--------------+
   | ``card_declined``            |   € 1,011.00 |
   +------------------------------+--------------+

Testing different types of cards
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
When using our hosted checkout solution to test card payments, you don't have to fill out any card details to test
different statuses. This does mean however that you cannot test different types of cards with our hosted checkout.

For embedded checkout solutions — i.e. when using :doc:`Mollie Components </components/overview>` — you can use the test
card numbers below to test different card brands.

.. table::
   :header-alignment: left left left left
   :column-alignment: left left left left

   +------------------+-------------------------+-------------+------+
   | Brand            | Card number             | Expiry date | CVV  |
   +==================+=========================+=============+======+
   | American Express | ``3782 822463 10005``   | Any         | Any  |
   +------------------+-------------------------+-------------+------+
   | Mastercard       | ``2223 0000 1047 9399`` | Any         | Any  |
   +------------------+-------------------------+-------------+------+
   | VISA             | ``4543 4740 0224 9996`` | Any         | Any  |
   +------------------+-------------------------+-------------+------+
