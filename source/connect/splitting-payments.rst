Splitting payments with Mollie Connect
======================================
.. note:: This feature is currently in closed beta. Please contact our partner management team if you are interested in
          testing this functionality with us.

.. warning:: The split payments feature is not available for third-party payments methods (e.g.: gift cards, Paypal, etc.)
             or captures (e.g.: Klarna slice it, Klarna pay later, etc.)

With Mollie you can distribute and split payments between connected accounts using 'payment routing'. This guide will
explain how it works.

Splitting payments can be useful if you want to charge your users a fee for payments processed through your app,
and cover the Mollie payment fee yourself. This way, the fees you negotiated with Mollie will not be visible to your
users, since the fees are deducted and invoiced on your platform's Mollie account.

Splitting payments can also be useful if you want to control the timing and frequency of your users' settlements from
Mollie.

For simpler use cases, we also offer :doc:`Application fees </connect/application-fees>`.

Getting started: Connecting an account
--------------------------------------
To start connecting accounts to process payments for, please contact your Mollie partner manager. They can enable Split
payments on your account.

Once your account is setup properly, any new merchants you :doc:`onboard via your app </connect/onboarding>` will
automatically get linked to your account.

Routing part of a payment to a connected account
------------------------------------------------
Now that you have an account connected to yours, you can start sending parts of each payment to their balance. This can
be done by specifying the payment routing when :doc:`creating a payment </reference/v2/payments-api/create-payment>`.

In the example below, we will route €7,50 of a €10,00 payment to the connected account ``org_23456``.

On our own account, we will receive the remainder of €2,50 minus any payment fees charged by Mollie.

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW" \
       -d "amount[currency]=EUR" \
       -d "amount[value]=10.00" \
       -d "description=My first routed payment" \
       -d "redirectUrl=https://webshop.example.org/order/12345/" \
       -d "webhookUrl=https://webshop.example.org/payments/webhook/" \
       -d "routing[0][amount][currency]=EUR" \
       -d "routing[0][amount][value]=7.50" \
       -d "routing[0][destination][type]=organization" \
       -d "routing[0][destination][organizationId]=org_23456"

.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "payment",
       "id": "tr_7UhSN1zuXS",
       "amount": {
           "value": "10.00",
           "currency": "EUR"
       },
       "description": "My first routed payment",
       "status": "open",
       "redirectUrl": "https://webshop.example.org/order/12345/",
       "webhookUrl": "https://webshop.example.org/payments/webhook/",
       "routing": [
           {
               "resource": "route",
               "id": "rt_k6cjd01h",
               "amount": {
                   "value": "2.50",
                   "currency": "EUR"
               },
               "destination": {
                   "type": "organization",
                   "organizationId": "me"
               }
           },
           {
               "resource": "route",
               "id": "rt_9dk4al1n",
               "amount": {
                   "value": "7.50",
                   "currency": "EUR"
               },
               "destination": {
                   "type": "organization",
                   "organizationId": "org_23456"
               }
           }
       ]
       "...": { }
   }

As soon as the payment is completed, the €7,50 will become available on the balance of the connected account, and the
€2,50 will become available on the balance of your platform account.

Delaying settlement of a split payment
--------------------------------------
The settlement of a routed payment can be delayed on payment level, by specifying a ``releaseDate`` on a route when
:doc:`creating a payment </reference/v2/payments-api/create-payment>`.

For example, the funds for the following payment will only become available on the balance of the connected account on 1
January 2025:

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW" \
       -d "amount[currency]=EUR" \
       -d "amount[value]=10.00" \
       -d "description=My first delayed payment" \
       -d "redirectUrl=https://webshop.example.org/order/12345/" \
       -d "webhookUrl=https://webshop.example.org/payments/webhook/" \
       -d "routing[0][amount][currency]=EUR" \
       -d "routing[0][amount][value]=7.50" \
       -d "routing[0][destination][type]=organization" \
       -d "routing[0][destination][organizationId]=org_23456" \
       -d "routing[0][releaseDate]=2025-01-01"

.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "payment",
       "id": "tr_2qkhcMzypH",
       "amount": {
           "value": "10.00",
           "currency": "EUR"
       },
       "description": "My first routed payment",
       "status": "open",
       "redirectUrl": "https://webshop.example.org/order/12345/",
       "webhookUrl": "https://webshop.example.org/payments/webhook/",
       "routing": [
           {
               "resource": "route",
               "id": "rt_k6cjd01h",
               "amount": {
                   "value": "2.50",
                   "currency": "EUR"
               },
               "destination": {
                   "type": "organization",
                   "organizationId": "me"
               }
           },
           {
               "resource": "route",
               "id": "rt_9dk4al1n",
               "amount": {
                   "value": "7.50",
                   "currency": "EUR"
               },
               "destination": {
                   "type": "organization",
                   "organizationId": "org_23456"
               },
               "releaseDate": "2025-01-01"
           }
       ]
       "...": { }
   }

The release date can still be updated while the release date is in the future, by simply updating the payment route
object:

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments/tr_2qkhcMzypH/routes/rt_9dk4al1n \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW" \
       -d "releaseDate=2026-01-01"

.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "route",
       "id": "rt_9dk4al1n",
       "amount": {
           "value": "7.50",
           "currency": "EUR"
       },
       "destination": {
           "type": "organization",
           "organizationId": "org_23456"
       },
       "releaseDate": "2026-01-01"
   }

Refunding a split payment
-------------------------
Since your platform is liable for refunds and chargebacks, when issuing a refund for a split payment, by default the
full refund is deducted from the platform balance. In other words, by default the parts of the payment that were sent to
connected accounts will remain untouched.

If you wish to pull back the money that was sent to a connected account, you can do so by 'reversing the routes' when
:doc:`creating a refund </reference/v2/refunds-api/create-refund>`.

For a full reversal of the split that was specified during payment creation, simply set ``reverseRouting=true`` when
creating the refund.

In the example below we will refund the €10,00 payment from earlier, and pull back the €7,50 that was sent to connected
account ``org_23456``.

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/refunds \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW" \
       -d "amount[currency]=EUR" \
       -d "amount[value]=10.00" \
       -d "reverseRouting=true"

.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "refund",
       "id": "re_gj08ZdgmVx",
       "amount": {
           "currency": "EUR",
           "value": "10.00"
       },
       "status": "pending",
       "paymentId": "tr_7UhSN1zuXS",
       "routingReversal": [
           {
               "amount": {
                    "value": "7.50",
                    "currency": "EUR"
               },
               "source": {
                    "organizationId": "org_23456"
               }

           }
       ]
       "...": { }
   }
