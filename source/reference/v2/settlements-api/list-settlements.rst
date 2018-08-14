List settlements
================
.. api-name:: Settlements API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/settlements

.. authentication::
   :api_keys: false
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
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of settlements found in ``_embedded``, which is either the requested number (with a maximum of 250) or
       the default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``settlements``

              .. type:: array

            - An array of settlement objects as described in
              :doc:`Get settlement </reference/v2/settlements-api/get-settlement>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of settlements. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current set of settlements.

          * - ``previous``

              .. type:: URL object

            - The previous set of settlements, if available.

          * - ``next``

              .. type:: URL object

            - The next set of settlements, if available.

          * - ``documentation``

              .. type:: URL object

            - The URL to the settlements list endpoint documentation.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/settlements?limit=5 \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
    $settlements = $mollie->settlements->page();

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "count": 5,
       "_embedded": {
           "settlements": [
               {
                   "resource": "settlement",
                   "id": "stl_jDk30akdN",
                   "reference": "1234567.1804.03",
                   "createdDatetime": "2018-04-06T06:00:01.0Z",
                   "settledDatetime": "2018-04-06T09:41:44.0Z",
                   "amount": {
                       "currency": "EUR",
                       "value": "39.75"
                   },
                   "periods": {
                       "2018": {
                           "4": {
                               "revenue": [ ],
                               "costs": [ ]
                           }
                       }
                   },
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/settlements/next",
                           "type": "application/hal+json"
                       },
                       "payments": {
                           "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN/payments",
                           "type": "application/hal+json"
                       },
                       "refunds": {
                           "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN/refunds",
                           "type": "application/hal+json"
                       },
                       "chargebacks": {
                           "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN/chargebacks",
                           "type": "application/hal+json"
                       },
                       "documentation": {
                           "href": "https://docs.mollie.com/reference/v2/settlements-api/get-settlement",
                           "type": "text/html"
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
               "href": "https://api.mollie.com/v2/settlements?limit=5",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/settlements?from=stl_QM8w7JDEhU&limit=5",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/settlements-api/list-settlements",
               "type": "text/html"
           }
       }
   }
