List settlement chargebacks
===========================
.. api-name:: Settlements API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for listing chargebacks included in a settlement in the new v2 API can be found
             :doc:`here </reference/v2/settlements-api/list-settlement-chargebacks>`. For more information on the v2
             API, refer to our :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/settlements/*settlementId*/chargebacks

.. authentication::
   :api_keys: false
   :organization_access_tokens: false
   :oauth: true

Retrieve all chargebacks included in a settlement.

Parameters
----------
Replace ``settlementId`` in the endpoint URL by the settlement's ID, for example ``stl_jDk30akdN``.

This endpoint is an alias of the :doc:`List chargebacks </reference/v1/chargebacks-api/list-chargebacks>` endpoint. All
parameters for that endpoint can be used here as well.

Response
--------
``200`` ``application/json``

This endpoint is an alias of the :doc:`List chargebacks </reference/v1/chargebacks-api/list-chargebacks>` endpoint. The
response is therefore the exact same.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/settlements/stl_jDk30akdN/chargebacks \
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
               "resource": "chargeback",
               "id": "chb_n9z0tp",
               "payment": "tr_2qkhcMzypH",
               "amount": "25.00",
               "chargebackDatetime": "2017-01-11T15:39:53.0Z",
               "reversedDatetime": null,
               "links": {
                   "self": "https://api.mollie.com/v1/payments/tr_2qkhcMzypH/chargebacks/chb_n9z0tp"
               }
           },
           { },
           { }
       ],
       "links": {
           "first": "https://api.mollie.com/v1/settlements/stl_QM8w7JDEhU/chargebacks?count=10&offset=0",
           "previous": null,
           "next": "https://api.mollie.com/v1/settlements/stl_QM8w7JDEhU/chargebacks?count=10&offset=10",
           "last": "https://api.mollie.com/v1/settlements/stl_QM8w7JDEhU/chargebacks?count=10&offset=20"
       }
   }
