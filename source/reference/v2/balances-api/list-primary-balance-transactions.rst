List primary balance transactions
=================================
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/balances/primary/transactions

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

With the List primary balance transactions endpoint you can retrieve a list of all the movements on your primary
balance. This includes payments, refunds, chargebacks, and settlements.

This endpoint is an alias of the :doc:`List balance transactions </reference/v2/balances-api/list-balance-transactions>`.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``from``

       .. type:: string
          :required: false

     - Offset the result set to the balance transactions with this ID. The balance transaction with this ID is included
       in the result set as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of balance transactions to return (with a maximum of 250).

Response
--------
``200`` ``application/hal+json; charset=utf-8``

For the full list of fields, see :doc:`List balance transactions </reference/v2/balances-api/list-balance-transactions>`. Only
``_links`` is listed here.

.. list-table::
   :widths: auto

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of balance transactions. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current set of balance transactions.

          * - ``previous``

              .. type:: URL object

            - The previous set of balance transactions, if available.

          * - ``next``

              .. type:: URL object

            - The next set of balance transactions, if available.

          * - ``documentation``

              .. type:: URL object

            - The URL to the balance transactions list endpoint documentation.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/balances/primary/transactions?limit=5 \
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
       "balance_transactions": [
          {
            "resource": "balance_transaction",
            "id": "baltr_QM24QwzUWR4ev4Xfgyt29A",
            "type": "refund",
            "resultAmount": {
              "value": "-10.25",
              "currency": "EUR"
            },
            "initialAmount": {
              "value": "-10.00",
              "currency": "EUR"
            },
            "fees": {
              "value": "-0.25",
              "currency": "EUR"
            },
            "createdAt": "2021-01-10T12:06:28+00:00",
            "context": {
              "payment": {
                "id": "tr_7UhSN1zuXS"
              },
              "refund": {
                "id": "re_4qqhO89gsT"
              }
            }
          },
          {
            "resource": "balance_transaction",
            "id": "baltr_QM24QwzUWR4ev4Xfgyt29B",
            "type": "payment",
            "resultAmount": {
              "value": "9.71",
              "currency": "EUR"
            },
            "initialAmount": {
              "value": "10.00",
              "currency": "EUR"
            },
            "fees": {
              "value": "-0.29",
              "currency": "EUR"
            },
            "createdAt": "2021-01-10T12:06:28+00:00",
            "context": {
              "payment": {
                "id": "tr_7UhSN1zuXS"
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
         "href": "https://docs.mollie.com/reference/v2/balances-api/list-primary-balance-transactions",
         "type": "text/html"
       },
       "self": {
         "href": "https://api.mollie.com/v2/balances/primary/transactions?limit=5",
         "type": "application/hal+json"
       },
       "previous": null,
       "next": null
     }
   }
