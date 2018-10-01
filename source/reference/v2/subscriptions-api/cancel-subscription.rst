Cancel subscription
===================
.. api-name:: Subscriptions API
   :version: 2

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/customers/*customerId*/subscriptions/*id*

.. authentication::
   :api_keys: true
   :oauth: true

A subscription can be canceled any time by calling ``DELETE`` on the resource endpoint.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, and replace ``id`` by the subscription's ID. For
example: ``/v2/customers/cst_stTC2WHAuS/subscriptions/sub_rVKGtNd6s3``.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

A subscription object is returned, as described in
:doc:`Get subscription </reference/v2/subscriptions-api/get-subscription>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X DELETE https://api.mollie.com/v2/customers/cst_stTC2WHAuS/subscriptions/sub_rVKGtNd6s3 \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

    $customer = $mollie->customers->get("cst_stTC2WHAuS");
    $subscription = $customer->cancelSubscription("sub_rVKGtNd6s3");

Response
^^^^^^^^
.. code-block:: json
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "subscription",
       "id": "sub_rVKGtNd6s3",
       "mode": "live",
       "createdAt": "2018-06-01T12:23:34+00:00",
       "status": "canceled",
       "amount": {
           "value": "25.00",
           "currency": "EUR"
       },
       "times": 4,
       "interval": "3 months",
       "nextPaymentDate": null,
       "description": "Quarterly payment",
       "method": null,
       "startDate": "2016-06-01",
       "webhookUrl": "https://webshop.example.org/payments/webhook",
       "canceledAt": "2018-08-01T11:04:21+00:00",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/customers/cst_stTC2WHAuS/subscriptions/sub_rVKGtNd6s3",
               "type": "application/hal+json"
           },
           "customer": {
               "href": "https://api.mollie.com/v2/customers/cst_stTC2WHAuS",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/subscriptions-api/cancel-subscription",
               "type": "text/html"
           }
       }
   }
