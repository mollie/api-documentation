List settlement refunds
=======================
.. api-name:: Settlements API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for listing refunds included in a settlement in the new v2 API can be found
             :doc:`here </reference/v2/settlements-api/list-settlement-refunds>`. For more information on the v2 API,
             refer to our :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/settlements/*settlementId*/refunds

.. authentication::
   :api_keys: false
   :organization_access_tokens: false
   :oauth: true

Retrieve all refunds included in a settlement.

Parameters
----------
Replace ``settlementId`` in the endpoint URL by the settlement's ID, for example ``stl_jDk30akdN``.

This endpoint is an alias of the :doc:`List refunds </reference/v1/refunds-api/list-refunds>` endpoint. All parameters
for that endpoint can be used here as well.

Response
--------
``200`` ``application/json``

This endpoint is an alias of the :doc:`List refunds </reference/v1/refunds-api/list-refunds>` endpoint. The response is
therefore the exact same.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/settlements/stl_jDk30akdN/refunds \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "totalCount": 28,
       "offset": 0,
       "count": 10,
       "data": [
           {
               "id": "re_CkS3qkJ8Ny",
               "payment": {
                   "resource": "payment",
                   "id": "tr_2qkhcMzypH",
                   "mode": "live",
                   "createdDatetime": "2017-01-11T15:38:55.0Z",
                   "status": "refunded",
                   "paidDatetime": "2017-01-11T15:40:59.0Z",
                   "amount": "25.00",
                   "amountRefunded": "5.00",
                   "amountRemaining": "45.00",
                   "description": "Test payment 25 EU",
                   "method": "ideal",
                   "metadata": null,
                   "profileId": "pfl_D96wnsu869",
                   "links": {
                       "refunds": "https://api.mollie.com/v1/payments/tr_2qkhcMzypH/refunds",
                       "settlement": "https://api.mollie.com/v1/settlements/stl_QM8w7JDEhU"
                   },
                   "settlementId": "stl_QM8w7JDEhU"
               },
               "amount": "5.00",
               "status": "processing",
               "refundedDatetime": "2017-01-11T15:39:53.0Z",
               "description": "Test refund 5 EU",
               "links": {
                   "self": "https://api.mollie.com/v1/payments/tr_2qkhcMzypH/refunds/re_CkS3qkJ8Ny"
               }
           },
           { },
           { }
       ],
       "links": {
           "first": "https://api.mollie.com/v1/settlements/stl_QM8w7JDEhU/refunds?count=10&offset=0",
           "previous": null,
           "next": "https://api.mollie.com/v1/settlements/stl_QM8w7JDEhU/refunds?count=10&offset=10",
           "last": "https://api.mollie.com/v1/settlements/stl_QM8w7JDEhU/refunds?count=10&offset=20"
       }
   }
