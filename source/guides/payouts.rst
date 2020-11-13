Marketplaces & platforms
=======
With Mollie Marketplaces & platforms, you can send payments to the bank accounts of your beneficiaries directly and split payments
between multiple parties. Additionally, with Mollie Marketplaces & platforms you can control the delay on a payout

Mollie Marketplaces & platforms allows you to process third party funds for your platform in a PSD2-compliant manner.

This guide will explain step-by-step how to:

* Configure a custom balance for your beneficiary.
* Send payments to the beneficiary's balance.
* Track automatic balance payouts, and trigger manual payouts.
* Split payments across multiple beneficiary balances.
* Purposely delay payments to be paid out at a later point.

Getting started: creating a balance
-----------------------------------
To get started with Mollie Marketplaces & platforms, :doc:`create a custom balance </reference/v2/balances-api/create-balance>` for your
beneficiary first:

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/balances \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW" \
       -d "description=My custom balance" \
       -d "transferDestination[type]=bank-account" \
       -d "transferDestination[bankAccount]=NL53INGB0654422370" \
       -d "transferDestination[beneficiaryName]=Jack Bauer" \
       -d "transferThreshold[currency]=EUR" \
       -d "transferThreshold[value]=40.00" \
       -d "transferFrequency=daily"

.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

   {
     "resource": "balance",
     "id": "bal_hinmkh",
     "mode": "live",
     "createdAt": "2019-01-10T12:06:28+00:00",
     "type": "custom",
     "currency": "EUR",
     "description": "My custom balance",
     "availableAmount": {
       "value": "0.00",
       "currency": "EUR"
     },
     "incomingAmount": {
       "value": "0.00",
       "currency": "EUR"
     },
     "outgoingAmount": {
       "value": "0.00",
       "currency": "EUR"
     },
     "transferFrequency": "daily",
     "transferThreshold": {
       "value": "40.00",
       "currency": "EUR"
     },
     "transferDestination": {
       "type": "bank-account",
       "beneficiaryName": "Jack Bauer",
       "bankAccount": "NL53INGB0654422370"
     },
     "...": {}
    }

The created balance has been configured to do an automatic payout on a daily basis to the given bank account of your
beneficiary.

Transferring a payment to the balance
-------------------------------------
Now that we have configured a balance for the beneficiary, we can start routing payments to the balance. This can be
done by specifying the payment routing upon :doc:`payment creation </reference/v2/payments-api/create-payment>`.

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW" \
       -d "amount[currency]=EUR" \
       -d "amount[value]=10.00" \
       -d "description=My first routed payment" \
       -d "redirectUrl=https://webshop.example.org/order/12345/" \
       -d "webhookUrl=https://webshop.example.org/payments/webhook/" \
       -d "routing[0][destination][type]=balance" \
       -d "routing[0][destination][balanceId]=bal_hinmkh"

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
               "id": "rt_9dk4al1n",
               "amount": {
                   "value": "10.00",
                   "currency": "EUR"
               },
               "destination": {
                   "type": "balance",
                   "balanceId": "bal_hinmkh"
               }
           }
       ]
       "...": { }
   }

As soon as the payment is completed, the €10.00 will become available on the balance ``bal_hinmkh``. Performing a
:doc:`Get balance </reference/v2/balances-api/get-balance>` request when the payment has succeeded will show the €10.00
has been moved to the custom balance:

.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/balances/bal_hinmkh \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW"

.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "balance",
       "id": "bal_hinmkh",
       "transferFrequency": "daily",
       "transferDestination": {
           "type": "bank-account",
           "bankAccount": "NL53INGB0654422370"
       },
       "availableAmount": {
           "value": "10.00",
           "currency": "EUR"
       },
       "incomingAmount": {
           "value": "0.00",
           "currency": "EUR"
       },
       "outgoingAmount": {
           "value": "0.00",
           "currency": "EUR"
       },
       "...": { }
   }

.. note:: Payment fees are always charged on your default balance, not on the custom balance.

Tracking balance payouts
------------------------
Once a custom balance holds funds, the funds will automatically be paid out according to its payout schedule configured
earlier.

In the example above, the balance ``bal_hinmkh`` holds €10.00 and has been configured to get paid out on a daily basis to
bank account ``NL53INGB0654422370``.

Hence, within a day after the €10.00 has become available on the balance it will get paid out automatically. A
:doc:`Transfer object </reference/v2/transfers-api/get-transfer>` will be created for this event, that can be retrieved
to track the payout status.

.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/transfers \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW"

.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "count": 1,
       "_embedded": {
           "transfers": [
               {
                   "resource": "transfer",
                   "id": "trf_j6ln0a1d",
                   "status": "open",
                   "amount": {
                       "value": "10.00",
                       "currency": "EUR"
                   },
                   "source": {
                       "type": "balance",
                       "balanceId": "bal_hinmkh"
                   },
                   "destination": {
                       "type": "bank-account",
                       "bankAccount": "NL53INGB0654422370"
                   },
                   "...": { }
               }
           ]
       },
       "...": { }
   }

As soon as the payout has been queued as a transfer, the €10.00 will no longer be available on the balance.

To overwrite the default payout schedule, either :doc:`update the balance </reference/v2/balances-api/update-balance>`
or trigger a transfer manually by :doc:`creating a transfer </reference/v2/transfers-api/create-transfer>` as shown
below.

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/transfers \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW" \
       -d "source[type]=balance" \
       -d "source[balanceId]=bal_hinmkh"

.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "transfer",
       "id": "trf_j7hn0d6x",
       "status": "open",
       "amount": {
           "value": "10.00",
           "currency": "EUR"
       },
       "source": {
           "type": "balance",
           "balanceId": "bal_hinmkh"
       },
       "destination": {
           "type": "bank-account",
           "bankAccount": "NL53INGB0654422370"
       },
       "...": { }
   }

A manually created transfer will be picked up for payout with the next payout round. Payouts are processed every
morning on business days.

Splitting payments across multiple balances
-------------------------------------------
When routing payments to balances, a single payment can be split to multiple destinations by defining more than one
route during :doc:`payment creation </reference/v2/payments-api/create-payment>`.

The following example splits the payment between the default balance and beneficiary balance ``bal_8irzh1y2``. If the
payment succeeds, €7.50 will become available on the beneficiary balance, while the default balance will hold €2.50
(minus any payment fees).

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW" \
       -d "amount[currency]=EUR" \
       -d "amount[value]=10.00" \
       -d "description=My first split payment" \
       -d "redirectUrl=https://webshop.example.org/order/12345/" \
       -d "webhookUrl=https://webshop.example.org/payments/webhook/" \
       -d "routing[0][amount][currency]=EUR" \
       -d "routing[0][amount][value]=2.50" \
       -d "routing[0][destination][type]=balance" \
       -d "routing[0][destination][balanceId]=default" \
       -d "routing[1][amount][currency]=EUR" \
       -d "routing[1][amount][value]=7.50" \
       -d "routing[1][destination][type]=balance" \
       -d "routing[1][destination][balanceId]=bal_8irzh1y2"

.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "payment",
       "id": "tr_WDqYK6vllg",
       "amount": {
           "value": "10.00",
           "currency": "EUR"
       },
       "description": "My first split payment",
       "status": "open",
       "routing": [
           {
               "resource": "route",
               "id": "rt_k6cjd01h",
               "amount": {
                   "value": "2.50",
                   "currency": "EUR"
               },
               "destination": {
                   "type": "balance",
                   "balanceId": "default"
               }
           },
           {
               "resource": "route",
               "id": "rt_nz9d6jfp",
               "amount": {
                   "value": "7.50",
                   "currency": "EUR"
               },
               "destination": {
                   "type": "balance",
                   "balanceId": "bal_8irzh1y2"
               }
           }
       ]
       "...": { }
   }

Delaying payouts
----------------
Payouts can be delayed either on balance level by
:doc:`changing the balance's payout scheme </reference/v2/balances-api/update-balance>`, or on payment level by
specifying a ``releaseDate`` on a route when :doc:`creating a payment </reference/v2/payments-api/create-payment>`.

For example, the funds for the following payment will only become available on the balance on 1 January 2019:

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW" \
       -d "amount[currency]=EUR" \
       -d "amount[value]=10.00" \
       -d "description=My first delayed payment" \
       -d "redirectUrl=https://webshop.example.org/order/12345/" \
       -d "webhookUrl=https://webshop.example.org/payments/webhook/" \
       -d "routing[0][destination][type]=balance" \
       -d "routing[0][destination][balanceId]=bal_8irzh1y2" \
       -d "routing[0][releaseDate]=2019-01-01"

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
               "id": "rt_9dk4al1n",
               "amount": {
                   "value": "10.00",
                   "currency": "EUR"
               },
               "destination": {
                   "type": "balance",
                   "balanceId": "bal_8irzh1y2"
               },
               "releaseDate": "2019-01-01"
           }
       ]
       "...": { }
   }

The release date can still be updated while the release date is still in the future, by simply updating the payment
route object:

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments/tr_2qkhcMzypH/routes/rt_9dk4al1n \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW" \
       -d "releaseDate=2019-02-01"

.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "route",
       "id": "rt_9dk4al1n",
       "amount": {
           "value": "10.00",
           "currency": "EUR"
       },
       "destination": {
           "type": "balance",
           "balanceId": "bal_8irzh1y2"
       },
       "releaseDate": "2019-02-01"
   }
