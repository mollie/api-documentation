Place a hold for a payment
==========================
When you create a Mollie payment, your consumer authorizes the payment with the payment method and we automatically
collect the funds for you.

With certain payment methods you can break this process up into two separate steps. First, you gather the consumer's
authorization to place a hold for a specified amount on their account. Then at a later point you can decide whether you
want Mollie to collect (*capture*) the pending funds either fully or partially, or to cancel (*void*) the authorization.

Placing a hold is particularly useful in cases where you are not yet sure up front whether you will be able to fulfill
the order completely. Rather than collecting the funds immediately and having to perform a partial or even full refund
in your fulfillment process, you can simply perform a partial capture or void the authorization entirely.

Payment method support
----------------------
For card payments, Mollie offers the ability to place a hold as an optional feature. By default, card payments are
authorized and collected in one go.

For Klarna payments, placing a hold and collecting the funds manually is the only available flow. However, Klarna
payments require the Orders API. Please refer to the :doc:`Orders API overview </orders/overview>` for more information.

Getting started: requesting an authorization-only payment
---------------------------------------------------------
To place a hold, simply create a card payment via the
:doc:`Create payment endpoint </reference/v2/payments-api/create-payment>` as usual, but with `captureMode` set to
`manual`.

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments \
      -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
      -d "amount[currency]=EUR" \
      -d "amount[value]=10.00" \
      -d "description=Order #12345" \
      -d "redirectUrl=https://webshop.example.org/order/12345/" \
      -d "captureMode=manual"

Have the consumer authorize the payment either via our hosted checkout or using Mollie Components, just like they would
complete a regular payment. See the guide on :doc:`building your own checkout </payments/build-your-own-checkout>` for
more details.

Once the consumer authorizes the payment, the payment will move to status `authorized`.

Capturing the authorized funds
------------------------------
To collect the funds that the consumer authorized, you can create a capture on the payment using the
:doc:`Create capture </reference/v2/captures-api/overview>` endpoint. A capture can either be for the full amount or for
a reduced amount.

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments/tr_.../captures \
      -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
      -d "amount[currency]=EUR" \
      -d "amount[value]=10.00" \
      -d "description=Capture for order #12345"

Voiding an authorization
------------------------
To void an authorization, simply call the :doc:`Cancel payment endpoint </reference/v2/payments-api/cancel-payment>` on
a payment that is set to `authorized`.

Voiding an authorization can also be performed in the Mollie dashboard.

.. code-block:: bash
   :linenos:

   curl -X DELETE https://api.mollie.com/v2/payments/tr_... \
      -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Authorization expiry window
---------------------------
Authorizations are generally not meant to remain open for longer than a number of days. Leaving the authorizations open
for too long can even lead to a fine from the card network. To prevent such fines and ensure a smooth consumer
experience, Mollie will therefore automatically expire (i.e. void) any authorization that is left open for too long.

The exact allowed authorization window depends on the type of card your consumer used — the different card schemes will
have slightly different rules depending on your type of business.

Generally speaking, credit card authorizations remain open for at least 7 days and up to 30 days.

The Payments API will include an `captureBefore` field on authorized payments that indicates by what time you need to
capture the payment, to prevent Mollie from automatically voiding the authorization.

If you wish to gather an authorization to collect funds for a longer period of time, please consider implementing
:doc:`recurring payments </payments/recurring>` instead. With the right mandate from the consumer, you can then manually
charge their account after any period of time and for any amount.

Delayed automatic capturing
---------------------------
In some cases you may want Mollie to always capture the funds after a number of days, unless you explicitly void the
authorization in the meantime.

In these cases you can set `captureMode` back to `automatic`, and provide a `captureDelay`. The payment will then first
move to `authorized`, and after the delay you specified Mollie will automatically capture the funds.

Since the exact authorization window depends on the card used by the consumer, and the card is not known up front, we
only support automatic capturing for up to 7 days after the authorization.

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments \
      -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
      -d "amount[currency]=EUR" \
      -d "amount[value]=10.00" \
      -d "description=Order #12345" \
      -d "redirectUrl=https://webshop.example.org/order/12345/" \
      -d "captureDelay=2 days"
