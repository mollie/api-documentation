Get next settlement
===================
.. api-name:: Settlements API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for retrieving the next settlement in the new v2 API can be found
             :doc:`here </reference/v2/settlements-api/get-next-settlement>`. For more information on the v2 API, refer
             to our :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/settlements/next

.. authentication::
   :api_keys: false
   :organization_access_tokens: false
   :oauth: true

Retrieve the details of the current settlement that has not yet been paid out.

Response
--------
``200`` ``application/json``

The next settlement is returned in the same fashion as the
:doc:`Get settlement </reference/v1/settlements-api/get-settlement>` endpoint.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/settlements/next \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "resource": "settlement",
       "id": "next",
       "reference": null,
       "createdDatetime": "2015-11-06T06:00:01.0Z",
       "settledDatetime": null,
       "status": "open",
       "amount": "39.75",
       "periods": {
           "2015": {
               "11": {
                   "revenue": [
                       {
                           "description": "iDEAL",
                           "method": "ideal",
                           "count": 6,
                           "amount": {
                               "net": "86.1000",
                               "vat": null,
                               "gross": "86.1000"
                           }
                       },
                       {
                           "description": "Refunds iDEAL",
                           "method": "refund",
                           "count": 2,
                           "amount": {
                               "net": "-43.2000",
                               "vat": null,
                               "gross": "-43.2000"
                           }
                       }
                   ],
                   "costs": [
                       {
                           "description": "iDEAL",
                           "method": "ideal",
                           "count": 6,
                           "rate": {
                               "fixed": "0.3500",
                               "percentage": null
                           },
                           "amount": {
                               "net": "2.1000",
                               "vat": "0.4410",
                               "gross": "2.5410"
                           }
                       },
                       {
                           "description": "Refunds iDEAL",
                           "method": "refund",
                           "count": 2,
                           "rate": {
                               "fixed": "0.2500",
                               "percentage": null
                           },
                           "amount": {
                               "net": "0.5000",
                               "vat": "0.1050",
                               "gross": "0.6050"
                           }
                       }
                   ]
               }
           }
       }
   }
