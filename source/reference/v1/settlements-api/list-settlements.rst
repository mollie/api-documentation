List settlements
================
.. api-name:: Settlements API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for listing settlements in the new v2 API can be found
             :doc:`here </reference/v2/settlements-api/list-settlements>`. For more information on the v2 API, refer to
             our :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/settlements

.. authentication::
   :api_keys: false
   :organization_access_tokens: false
   :oauth: true

Retrieve all settlements, ordered from new to old.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``reference``

       .. type:: string
          :required: false

     - Use this parameter to filter for a settlement with a specific reference. The reference is visible on
       your bank statement and in emails. An example reference would be ``1182161.1506.02``.

   * - ``offset``

       .. type:: integer
          :required: false

     - The number of settlements to skip.

   * - ``count``

       .. type:: integer
          :required: false

     - The number of settlements to return (with a maximum of 250).

Response
--------
``200`` ``application/json``

.. list-table::
   :widths: auto

   * - ``totalCount``

       .. type:: integer

     - The total number of settlements available.

   * - ``offset``

       .. type:: integer

     - The number of skipped settlements as requested.

   * - ``count``

       .. type:: integer

     - The number of settlements found in ``data``, which is either the requested number (with a maximum of 250) or the
       default number.

   * - ``data``

       .. type:: array

     - An array of settlement objects as described in
       :doc:`Get settlement </reference/v1/settlements-api/get-settlement>`.

   * - ``links``

       .. type:: object

     - Links to help navigate through the lists of settlements, based on the given offset.

       .. list-table::
          :widths: auto

          * - ``previous``

              .. type:: string

            - The previous set of settlements, if available.

          * - ``next``

              .. type:: string

            - The next set of settlements, if available.

          * - ``first``

              .. type:: string

            - The first set of settlements, if available.

          * - ``last``

              .. type:: string

            - The last set of settlements, if available.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/settlements \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "totalCount": 9,
       "offset": 0,
       "count": 9,
       "data": [
           {
               "resource": "settlement",
               "id": "stl_jDk30akdN",
               "reference": "123456.1501.02",
               "createdDatetime": "2015-01-09T07:00:00.0Z",
               "settledDatetime": "2015-01-09T07:00:00.0Z",
               "status": "paidout",
               "amount": "994.55",
               "periods": {
                   "2015": {
                       "01": {
                           "revenue": [
                               {
                                   "description": "iDEAL",
                                   "method": "ideal",
                                   "count": 3,
                                   "amount": {
                                       "net": "100.0000",
                                       "vat": null,
                                       "gross": "100.0000"
                                   }
                               }
                           ],
                           "costs": [
                               {
                                   "description": "iDEAL",
                                   "method": "ideal",
                                   "count": 3,
                                   "amount": {
                                       "net": "4.5000",
                                       "vat": "0.9450",
                                       "gross": "5.4450"
                                   }
                               }
                           ]
                       }
                   }
               },
               "links": {
                   "chargebacks": "https://api.mollie.com/v1/settlements/stl_jDk30akdN/chargebacks",
                   "payments": "https://api.mollie.com/v1/settlements/stl_jDk30akdN/payments",
                   "refunds": "https://api.mollie.com/v1/settlements/stl_jDk30akdN/refunds"
               },
               "paymentIds": [
                   "tr_RpAwK4A7dg",
                   "tr_V22Ek4ttj5",
                   "tr_ReitZQReAz"
               ]
           },
           {
               "resource": "settlement",
               "id": "stl_pAd3Vq83",
               "reference": "123456.1501.01",
               "settledDatetime": "2015-01-02T07:00:00.0Z",
               "status": "paidout",
               "amount": "993.58",
               "periods": {
                   "2015": {
                       "01": {
                           "revenue": [
                               {
                                   "description": "Creditcard",
                                   "method": "creditcard",
                                   "count": 10,
                                   "amount": {
                                       "net": "100.0000",
                                       "vat": null,
                                       "gross": "100.0000"
                                   }
                               }
                           ],
                           "costs": [
                               {
                                   "description": "Creditcard",
                                   "method": "creditcard",
                                   "count": 10,
                                   "rate": {
                                       "fixed": "0.25",
                                       "percent": null
                                   },
                                   "amount": {
                                       "net": "2.5000",
                                       "vat": "0.5250",
                                       "gross": "3.0250"
                                   }
                               },
                               {
                                   "description": "Creditcard vaste transactiekosten",
                                   "method": "creditcard",
                                   "count": 10,
                                   "rate": {
                                       "fixed": null,
                                       "percent": "2.80"
                                   },
                                   "amount": {
                                       "net": "2.8000",
                                       "vat": "0.5880",
                                       "gross": "3.3880"
                                   }
                               }
                           ]
                       }
                   }
               },
               "links": {
                   "chargebacks": "https://api.mollie.com/v1/settlements/stl_pAd3Vq83/chargebacks",
                   "payments": "https://api.mollie.com/v1/settlements/stl_pAd3Vq83/payments",
                   "refunds": "https://api.mollie.com/v1/settlements/stl_pAd3Vq83/refunds"
               },
               "paymentIds": [
                   "tr_s3cMndA7dg",
                   "tr_Vs3cPTdtj5",
                   "tr_Q3cEnMReAz",
                   "..."
               ]
           },
           { },
           { }
       ],
       "links": {
           "first": "https://api.mollie.com/v1/settlements?count=10&offset=0",
           "previous": null,
           "next": "https://api.mollie.com/v1/settlements?count=10&offset=10",
           "last": "https://api.mollie.com/v1/settlements?count=10&offset=20"
       }
   }
