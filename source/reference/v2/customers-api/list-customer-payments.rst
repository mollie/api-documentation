List customer payments
======================
.. api-name:: Customers API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/customers/*customerId*/payments

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve all payments linked to the customer.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, for example ``cst_8wmqcHMN4U``.

This endpoint accepts the same parameters as the :doc:`List payments </reference/v2/payments-api/list-payments>`
endpoint.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

This endpoint returns results in the same format as the :doc:`List payments </reference/v2/payments-api/list-payments>`
endpoint.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/payments \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
    $payments = $mollie->customers->get("cst_8wmqcHMN4U")->payments();

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "count": 5,
       "_embedded": {
           "payments": [
               {
                   "resource": "payment",
                   "id": "tr_7UhSN1zuXS",
                   "mode": "test",
                   "createdAt": "2018-02-12T11:58:35.0Z",
                   "expiresAt": "2018-02-12T12:13:35.0Z",
                   "status": "open",
                   "isCancelable": false,
                   "amount": {
                       "value": "75.00",
                       "currency": "GBP"
                   },
                   "description": "test",
                   "method": "ideal",
                   "metadata": null,
                   "details": null,
                   "profileId": "pfl_QkEhN94Ba",
                   "customerId": "cst_kEn1PlbGa",
                   "redirectUrl": "https://webshop.example.org/order/12345/",
                   "_links": {
                       "checkout": {
                           "href": "https://www.mollie.com/paymentscreen/issuer/select/ideal/7UhSN1zuXS",
                           "type": "text/html"
                       },
                       "self": {
                           "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS",
                           "type": "application/hal+json"
                       }
                   }
               },
               { },
               { },
               { },
               { }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/payments?limit=5",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/payments?from=tr_SDkzMggpvx&limit=5",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/customers-api/list-customers",
               "type": "text/html"
           }
       }
   }
