Cancel payment
==============
.. api-name:: Payments API
   :version: 2

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/payments

.. authentication::
   :api_keys: true
   :oauth: true

Some payment methods are cancellable for an amount of time, usually until the next day. Or as long as the payment status
is open. Payments may be canceled manually from the Dashboard, or automatically by using this endpoint.

The ``isCancelable`` property on the :doc:`Payment object </reference/v2/payments-api/get-payment>` will indicate if the
payment can be canceled.

Parameters
----------
Replace ``id`` in the endpoint URL by the payment's ID, for example ``tr_7UhSN1zuXS``.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

A payment object is returned, as described in :doc:`Get payment </reference/v2/payments-api/get-payment>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X DELETE https://api.mollie.com/v2/payments/tr_WDqYK6vllg \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
    $canceled_payment = $mollie->payments->delete("tr_WDqYK6vllg");

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "payment",
       "id": "tr_WDqYK6vllg",
       "mode": "live",
       "createdAt": "2018-03-19T10:18:33+00:00",
       "amount": {
           "value": "35.07",
           "currency": "EUR"
       },
       "description": "Order 33",
       "method": "banktransfer",
       "metadata": null,
       "status": "canceled",
       "canceledAt": "2018-03-19T10:19:15+00:00",
       "details": {
           "bankName": "Stichting Mollie Payments",
           "bankAccount": "NL53ABNA0627535577",
           "bankBic": "ABNANL2A",
           "transferReference": "RF12-3456-7890-1234"
       },
       "profileId": "pfl_QkEhN94Ba",
       "sequenceType": "oneoff",
       "redirectUrl": "https://webshop.example.org/order/33/",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/payments-api/cancel-payment",
               "type": "text/html"
           }
       }
   }
