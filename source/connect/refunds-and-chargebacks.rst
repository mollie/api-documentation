Refunds and chargebacks
=======================
Refund and chargeback processing works differently based on whether you work with
:doc:`Application fees </connect/application-fees>` or with :doc:`Split payments </connect/splitting-payments>`.

Refunding a payment with application fees
-----------------------------------------
When using :doc:`Application fees </connect/application-fees>`, the connected merchant account is in full control of the
payment, and any refunds and chargebacks are also processed on their account.

As a platform, you can create refunds on behalf of the connected account by using the
:doc:`Refunds API </reference/v2/refunds-api/create-refund>` with the connected account's permission. Refunding
previously charged application fees is not possible, however.

For more fine-grained control over the refund and chargeback flows, consider using
:doc:`Split payments </connect/splitting-payments>` instead.

Refunding a split payment
-------------------------
When using :doc:`Split payments </connect/splitting-payments>`, your platform is liable for refunds and chargebacks.

You can issue a refund for a split payment by :doc:`creating a refund </reference/v2/refunds-api/create-refund>`
on the original payment, like you would with any other payment. By default, the full refund will be deducted from the
platform balance. In other words, by default the parts of the payment that were sent to connected accounts will remain
untouched.

If you wish to pull back the money that was sent to connected accounts, you can do so by 'reversing the routes' when
issuing the refund request.

For a full reversal of the split that was specified during payment creation, simply set ``reverseRouting=true`` when
creating the refund, so that a full compensation is created for every route of the original payment.
This flag **only works with full refunds**, namely a refund of the same amount (or more) than the
original payment. For partial refunds and for more fine grained control on how compensations are created
see next paragraph.

In the example below we will refund the €10,00 payment from earlier, and pull back the €3,50 and the €4,00 that were
sent to connected accounts ``org_23456`` and ``org_56789``.

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
       "routingReversals": [
           {
               "amount": {
                    "value": "3.50",
                    "currency": "EUR"
               },
               "source": {
                    "organizationId": "org_23456"
               }

           },
           {
               "amount": {
                    "value": "4.50",
                    "currency": "EUR"
               },
               "source": {
                    "organizationId": "org_56789"
               }
           }
       ]
       "...": { }
   }

Partial refund for a split payment
----------------------------------

If you wish to pull back the money that was sent to connected accounts within the creation of a partial refund (namely
a refund of less of the amount of the original payment), you can do so by setting the ``routingReversals`` array in the
request (see :doc:`create a refund </reference/v2/refunds-api/create-refund>`).

In the example below we will partially refund the €10,00 payment from earlier, and pull back €2,00 and €3,00 from the
funds that were sent to connected accounts ``org_23456`` and ``org_56789``.

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments/tr_7UhSN1zuXS/refunds \
      -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW" \
      -d "amount[currency]=EUR" \
      -d "amount[value]=5.00" \
      -d "routingReversals[0][source][type]= organization" \
      -d "routingReversals[0][source][organizationId]= org_23456" \
      -d "routingReversals[0][amount][value]=2.00" \
      -d "routingReversals[0][amount][currency]=EUR" \
      -d "routingReversals[1][source][type]= organization" \
      -d "routingReversals[1][source][organizationId]= org_78901" \
      -d "routingReversals[1][amount][value]=3.00" \
      -d "routingReversals[1][amount][currency]=EUR"

.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "refund",
       "id": "re_gj08ZdgmVx",
       "amount": {
           "currency": "EUR",
           "value": "5.00"
       },
       "status": "pending",
       "paymentId": "tr_7UhSN1zuXS",
       "routingReversals": [
           {
               "amount": {
                    "value": "2.00",
                    "currency": "EUR"
               },
               "source": {
                    "organizationId": "org_23456"
               }

           },
           {
               "amount": {
                    "value": "3.00",
                    "currency": "EUR"
               },
               "source": {
                    "organizationId": "org_56789"
               }
           }
       ]
       "...": { }
   }

