Place a hold for a payment
==========================
.. customize-document-title::
   :beta: true

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
      -d "method=creditcard" \
      -d "captureMode=manual"

Have the consumer authorize the payment either via our hosted checkout or using Mollie Components, just like they would
complete a regular payment. See the guide on :doc:`building your own checkout </payments/build-your-own-checkout>` for
more details.

Once the consumer authorizes the payment, the payment status will change to `authorized`.

Capturing the authorized funds
------------------------------
To collect the funds that the consumer authorized, you can create a capture on the payment using the
:doc:`Create capture </reference/v2/captures-api/overview>` endpoint. A capture can either be for the full amount or for
a reduced amount. If you leave the amount field empty, Mollie will capture the full authorized amount.

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments/tr_.../captures \
      -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
      -d "amount[currency]=EUR" \
      -d "amount[value]=10.00" \
      -d "description=Capture for order #12345"

Captures have their own status. We will call your webhook when the status changes.

*pending*
  The capture is created but is not yet processed.

*succeeded*
  The capture was successful. The payment status will change to `paid`.

*failed*
  The capture failed. For example, the capture will be rejected when the authorization has expired.  
  Please refer to the "Authorization expiriation window" section below for further details.

Cancel an authorization
-----------------------
To cancel an authorization, simply call the :doc:`Cancel payment endpoint </reference/v2/payments-api/cancel-payment>` on
a payment that is set to `authorized`. Please note that the full remaining amount will be reversed.

Canceling an authorization can also be performed in the Mollie dashboard.

.. code-block:: bash
   :linenos:

   curl -X DELETE https://api.mollie.com/v2/payments/tr_... \
      -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Mollie will do its best to process cancelation requests, but we cannot guarantee cancelation requests will succeed. 
It is up to the issuing bank if and when the hold will be released.

If the cancelation does succeed, the payment status will change to  `canceled`.

Authorization expiration window
-------------------------------
An authorized payment is a guaranteed amount, yet authorizations are generally not meant to remain open for longer than
a number of days. The exact allowed authorization window depends on the type of card your consumer used — the different
card schemes will have slightly different rules.

Authorizations remain open for at least 7 days for American Express and Visa cards and up to 30 days for
Mastercard and Cartes Bancaires cards. It is highly recommended to capture payments as soon as you can fulfill the order and within
the recommended time period. If you do not capture a payment in time the authorization will expire and the capture will
be declined by the issuing bank. Once the issuer declined the payment due to authorization expired, the payment status
will change to `failed`.

The Payments API will include a `captureBefore` field on authorized payments that indicates by what time you need to
capture the payment, to prevent you from being unable to capture the funds.

Delayed automatic capturing
---------------------------
In some cases you may want Mollie to always capture the funds after a number of days, unless you explicitly cancel the
authorization in the meantime.

In these cases you can set `captureMode` back to `automatic`, and provide a `captureDelay`. The payment will then first
move to `authorized`, and after the delay you specified Mollie will automatically capture the funds. As mentioned, you
will still be able to either cancel the payment or to use the Captures API to manually capture the payment before the
automatic capture is executed by Mollie.

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
      -d "method=creditcard" \
      -d "captureDelay=2 days"
