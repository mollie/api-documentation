List customer payments
======================
.. api-name:: Customers API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for listing payments of a customer in the new v2 API can be found
             :doc:`here </reference/v2/customers-api/list-customer-payments>`. For more information on the v2 API, refer
             to our :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/customers/*customerId*/payments

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Retrieve all payments linked to the customer.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, for example ``cst_8wmqcHMN4U``.

This endpoint accepts the same parameters as the :doc:`List payments </reference/v1/payments-api/list-payments>`
endpoint.

Response
--------
``200`` ``application/json``

This endpoint returns results in the same format as the :doc:`List payments </reference/v1/payments-api/list-payments>`
endpoint.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/customers/cst_8wmqcHMN4U/payments \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "totalCount": 280,
       "offset": 0,
       "count": 10,
       "data": [
           {
               "resource": "payment",
               "id": "tr_7UhSN1zuXS",
               "mode": "test",
               "createdDatetime": "2018-03-16T17:09:01.0Z",
               "status": "open",
               "expiryPeriod": "PT15M",
               "amount": "10.00",
               "description": "Order #12345",
               "metadata": {
                   "order_id": "12345"
               },
               "locale": "nl_NL",
               "profileId": "pfl_QkEhN94Ba",
               "customerId": "cst_8wmqcHMN4U",
               "links": {
                   "redirectUrl": "https://webshop.example.org/order/12345/"
               }
           },
           { },
           { }
       ],
       "links": {
           "first": "https://api.mollie.com/v1/payments?count=10&offset=0",
           "previous": null,
           "next": "https://api.mollie.com/v1/payments?count=10&offset=10",
           "last": "https://api.mollie.com/v1/payments?count=10&offset=270"
       }
   }
