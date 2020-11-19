List balances
=============
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/balances

.. authentication::
   :api_keys: false
   :oauth: true

Retrieve all the organization's balances, including the default balance, ordered from newest to oldest.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to true to only retrieve balances made in test mode. By default, only live balances are returned.

   * - ``from``

       .. type:: string
          :required: false

     - Offset the result set to the balance with this ID. The balance with this ID is included in the result set as
       well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of balances to return (with a maximum of 250).

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of balances found in ``_embedded``, which is either the requested number (with a maximum of 250) or
       the default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``balances``

              .. type:: array

            - An array of balance objects as described in :doc:`Get balance </reference/v2/balances-api/get-balance>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of balances. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current set of balances.

          * - ``previous``

              .. type:: URL object

            - The previous set of balances, if available.

          * - ``next``

              .. type:: URL object

            - The next set of balances, if available.

          * - ``documentation``

              .. type:: URL object

            - The URL to the balances list endpoint documentation.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/balances?limit=5 \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW"

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
     "count": 5,
     "_embedded": {
       "balances": [
          {
            "resource": "balance",
            "id": "bal_hinmkh",
            "mode": "live",
            "createdAt": "2019-01-10T12:06:28+00:00",
            "type": "custom",
            "currency": "EUR",
            "description": "My custom balance",
            "status": "accepted",
            "availableAmount": {
              "value": "0.00",
              "currency": "EUR"
            },
            "incomingAmount": {
              "value": "0.00",
              "currency": "EUR"
            },
            "outgoingAmount": {
              "value": "0.00",
              "currency": "EUR"
            },
            "transferFrequency": "daily",
            "transferThreshold": {
              "value": "40.00",
              "currency": "EUR"
            },
            "transferDestination": {
              "type": "bank-account",
              "beneficiaryName": "Jack Bauer",
              "bankAccount": "NL53INGB0654422370"
            },
            "_links": {
              "self": {
                "href": "https://api.mollie.com/v2/balances/bal_hinmkh",
                "type": "application/hal+json"
              }
            }
          }, 
          {
            "resource": "balance",
            "id": "bal_3t2a2h",
            "mode": "live",
            "createdAt": "2019-01-10T10:23:41+00:00",
            "type": "default",
            "status": "accepted",
            "currency": "EUR",
            "description": "",
            "availableAmount": {
              "value": "0.00",
              "currency": "EUR"
            },
            "incomingAmount": {
              "value": "0.00",
              "currency": "EUR"
            },
            "outgoingAmount": {
              "value": "0.00",
              "currency": "EUR"
            },
            "transferFrequency": "twice-a-month",
            "transferThreshold": {
              "value": "5.00",
              "currency": "EUR"
            },
            "transferDestination": {
              "type": "bank-account",
              "beneficiaryName": "JABBA REN",
              "bankAccount": "NL97MOLL6351480700"
            },
            "_links": {
              "self": {
                "href": "https://api.mollie.com/v2/balances/bal_3t2a2h",
                "type": "application/hal+json"
              }
            }
          },
          { },
          { },
          { }
       ]
     },
     "_links": {
       "documentation": {
         "href": "https://docs.mollie.com/reference/v2/balances-api/list-balances",
         "type": "text/html"
       },
       "self": {
         "href": "https://api.mollie.com/v2/balances?limit=5",
         "type": "application/hal+json"
       },
       "previous": null,
       "next": {
         "href": "https://api.mollie.com/v2/balances?from=bal_i6ow3k81&limit=5",
         "type": "application/hal+json"
       }
     }
   }
