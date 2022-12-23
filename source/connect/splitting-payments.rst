Splitting payments with Mollie Connect
======================================

.. note:: Split Payments are not enabled by default. To enable them for your organization, please reach out to
          our partner management team.

.. warning:: The split payments feature is not available (yet) for third-party payments methods (Gift Cards, Paypal,
             etc.). There is currently a closed beta for all Klarna methods (Klarna Pay now, Klarna Pay later, Klarna
             Slice it), please reach out to our partner management team to enable this feature.

With **Split payments** you can distribute and split payments between your platform and your connected merchant
accounts.

When using this functionality, your platform will remain the 'owner' of the payment. The Mollie fees you negotiated are
charged on your account directly, and will not be visible to your connected accounts. The chargeback liability also
remains on your account.

Splitting payments can also be useful if you want to control the timing and frequency of your users' settlements from
Mollie.

For simpler use cases, we offer :doc:`Application fees </connect/application-fees>`.

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

In the example below, we will route €3,50 of a €10,00 payment to the connected account ``org_23456``, and €4,00 to the
connected account ``org_56789``

On our own account, we will receive the remainder of €2,50 minus any payment fees charged by Mollie.

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d "amount[currency]=EUR" \
       -d "amount[value]=10.00" \
       -d "description=My first routed payment" \
       -d "redirectUrl=https://webshop.example.org/order/12345/" \
       -d "webhookUrl=https://webshop.example.org/payments/webhook/" \
       -d "routing[0][amount][currency]=EUR" \
       -d "routing[0][amount][value]=3.50" \
       -d "routing[0][destination][type]=organization" \
       -d "routing[0][destination][organizationId]=org_23456" \
       -d "routing[1][amount][currency]=EUR" \
       -d "routing[1][amount][value]=4.00" \
       -d "routing[1][destination][type]=organization" \
       -d "routing[1][destination][organizationId]=org_56789"

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
                   "value": "3.50",
                   "currency": "EUR"
               },
               "destination": {
                   "type": "organization",
                   "organizationId": "org_23456"
               }
           },
           {
               "resource": "route",
               "id": "rt_ikw93sr2",
               "amount": {
                   "value": "4.00",
                   "currency": "EUR"
               },
               "destination": {
                   "type": "organization",
                   "organizationId": "org_56789"
               }
           }
       ]
       "...": { }
   }

As soon as the payment is completed, the €3,50 and €4,00 will become available on the balance of the connected accounts,
and the €2,50 will become available on the balance of your platform account.

Delaying settlement of a split payment
--------------------------------------
The settlement of a routed payment can be delayed on payment level, by specifying a ``releaseDate`` on a route when
:doc:`creating a payment </reference/v2/payments-api/create-payment>`.

For example, the funds for the following payment will only become available on the balance of the connected account
``org_23456`` on 1 January 2025, and on the balance of the connected account ``org_56789`` on 12 January 2025:

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d "amount[currency]=EUR" \
       -d "amount[value]=10.00" \
       -d "description=My first delayed payment" \
       -d "redirectUrl=https://webshop.example.org/order/12345/" \
       -d "webhookUrl=https://webshop.example.org/payments/webhook/" \
       -d "routing[0][amount][currency]=EUR" \
       -d "routing[0][amount][value]=3.50" \
       -d "routing[0][destination][type]=organization" \
       -d "routing[0][destination][organizationId]=org_23456" \
       -d "routing[0][releaseDate]=2025-01-01" \
       -d "routing[1][amount][currency]=EUR" \
       -d "routing[1][amount][value]=4.00" \
       -d "routing[1][destination][type]=organization" \
       -d "routing[1][destination][organizationId]=org_56789" \
       -d "routing[1][releaseDate]=2025-01-12"

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
                   "value": "3.50",
                   "currency": "EUR"
               },
               "destination": {
                   "type": "organization",
                   "organizationId": "org_23456"
               },
               "releaseDate": "2025-01-01"
           },
           {
               "resource": "route",
               "id": "rt_ikw93sr2",
               "amount": {
                   "value": "4.00",
                   "currency": "EUR"
               },
               "destination": {
                   "type": "organization",
                   "organizationId": "org_56789"
               },
               "releaseDate": "2025-01-12"
           }
       ]
       "...": { }
   }

It is possible to update the release date of a transaction before it reaches the connected account's available balance, **as long
as the payment has already been paid by the consumer**, by simply updating the payment route object:

.. code-block:: bash
   :linenos:

   curl -X PATCH https://api.mollie.com/v2/payments/tr_2qkhcMzypH/routes/rt_9dk4al1n \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
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

The release date can be up to two years from the day of the payment's creation. For test payments, this limit is 10 days.
