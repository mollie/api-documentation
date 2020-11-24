List settlement payments
========================
.. api-name:: Settlements API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for listing payments included in a settlement in the new v2 API can be found
             :doc:`here </reference/v2/settlements-api/list-settlement-payments>`. For more information on the v2 API,
             refer to our :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/settlements/*settlementId*/payments

.. authentication::
   :api_keys: false
   :organization_access_tokens: false
   :oauth: true

Retrieve all payments included in a settlement.

Note that payments for *pay after delivery* methods (such as Klarna Pay Later) are not listed in here. These payment
methods are settled using captures. To retrieve the captures, the v2 api needs to be used, see the
:doc:`List settlement captures </reference/v2/settlements-api/list-settlement-captures>` endpoint.

Parameters
----------
Replace ``settlementId`` in the endpoint URL by the settlement's ID, for example ``stl_jDk30akdN``.

This endpoint is an alias of the :doc:`List payments </reference/v1/payments-api/list-payments>` endpoint. All
parameters for that endpoint can be used here as well.

Response
--------
``200`` ``application/json``

This endpoint is an alias of the :doc:`List payments </reference/v1/payments-api/list-payments>` endpoint. The response
is therefore the exact same.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/settlements/stl_jDk30akdN/payments \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

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
               "method": "ideal",
               "mode": "test",
               "createdDatetime": "2018-03-17T01:47:50.0Z"
               "status": "paid",
               "amount": "10.00",
               "description": "Order #12345",
               "metadata": null,
               "profileId": "pfl_QkEhN94Ba",
               "customerId": "cst_4qqhO89gsT",
               "settlementId": "stl_jDk30akdN",
               "links": {
                   "settlement": "https://api.mollie.com/v1/settlements/stl_jDk30akdN",
                   "redirectUrl": "https://webshop.example.org/order/12345/"
               }
           },
           { },
           { }
       ],
       "links": {
           "first": "https://api.mollie.com/v1/settlements/stl_jDk30akdN/payments?count=10&offset=0",
           "previous": null,
           "next": "https://api.mollie.com/v1/settlements/stl_jDk30akdN/payments?count=10&offset=10",
           "last": "https://api.mollie.com/v1/settlements/stl_jDk30akdN/payments?count=10&offset=270"
       }
   }
