List balance transactions
=========================
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/balances/*apiBalanceToken*/transactions

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

With the List balance transactions endpoint you can retrieve a list of all the movements on your balance. This includes
payments, refunds, chargebacks, and settlements.

Parameters
----------

Replace ``apiBalanceToken`` in the endpoint URL by the balance token, which can be retrieved by the
:doc:`List balances </reference/v2/balances-api/list-balances>` endpoint.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of transactions found in ``_embedded``, which is either the requested number (with a maximum of 250)
       or the default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``captures``

              .. type:: array

            - An array of transaction objects.

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

   curl -X GET https://api.mollie.com/v2/balances/default/transactions \
       -H 'Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW'

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
            "id": "baltr_x1ym4q",
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
                "id": "tr_7UhSN1zuXS",
                "description": "My first payment"
              },
              "refund": {
                "id": "re_4qqhO89gsT",
                "description": "My first refund"
              }
            },
            "_links": {
              "self": {
                "href": "https://api.mollie.com/v2/balances/bal_hinmkh/transactions/baltr_x1ym4q",
                "type": "application/hal+json"
              }
            }
          },
          {
            "resource": "balance_transaction",
            "id": "baltr_13l9pt",
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
                "id": "tr_7UhSN1zuXS",
                "description": "My first payment"
              }
            },
            "_links": {
              "self": {
                "href": "https://api.mollie.com/v2/balances/bal_hinmkh/transactions/baltr_13l9pt",
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
         "href": "https://docs.mollie.com/reference/v2/balances-api/list-balance-transactions",
         "type": "text/html"
       },
       "self": {
         "href": "https://api.mollie.com/v2/balances/default/transactions?limit=5",
         "type": "application/hal+json"
       },
       "previous": null,
       "next": {
         "href": "https://api.mollie.com/v2/balances/default/transactions?from=baltr_qp1w3kpl&limit=5",
         "type": "application/hal+json"
       }
     }
   }
