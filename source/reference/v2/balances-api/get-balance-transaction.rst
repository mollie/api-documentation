Get balance transaction
=======================
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/balances/default/transactions/*id*

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

With the Get balance transaction endpoint you can retrieve specific movements on your balance. This includes payments,
refunds, chargebacks, and settlements.

The endpoint response always includes an ``initialAmount`` and a ``resultAmount``. For example, a €10,00 payment with a
€0,29 fee has an initial amount of €10, but results in a €9,71 movement on the balance.

Parameters
----------
Replace ``id`` in the endpoint URL by the transaction's ID, for example ``baltr_x1ym4q``.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a balance transaction object. Will always contain ``balance_transaction`` for
       this endpoint.

   * - ``id``

       .. type:: string

     - The identifier uniquely referring to this balance transaction. Mollie assigns this identifier at transaction
       creation time. For example ``baltr_x1ym4q``.

   * - ``type``

       .. type:: string

     - The type of movement, for example ``payment`` or ``refund``. Values include the below examples, although this
       list is not definitive.

       Regular payment processing: ``payment`` ``capture`` ``unauthorized-direct-debit`` ``failed-payment``

       Refunds and chargebacks: ``refund`` ``returned-refund`` ``chargeback`` ``chargeback-reversal``

       Settlements: ``outgoing-transfer`` ``canceled-outgoing-transfer`` ``returned-transfer``

       Invoicing: ``invoice-compensation`` ``balance-correction``

       Mollie Connect: ``application-fee`` ``split-payment`` ``platform-payment-refund`` ``platform-payment-chargeback``

   * - ``resultAmount``

       .. type:: amount object

     - The final amount that was moved to or from the balance, e.g. ``{"currency":"EUR", "value":"100.00"}``. If the
       transaction moves funds away from the balance, for example when it concerns a refund, the amount will be
       negative.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code of the movement amount.

          * - ``value``

              .. type:: string

            - A string containing the exact movement amount in the given currency.

   * - ``initialAmount``

       .. type:: amount object

     - The amount that was to be moved to or from the balance, excluding fees. If the transaction moves funds away from
       the balance, for example when it concerns a refund, the amount will be negative.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code of the initial movement amount.

          * - ``value``

              .. type:: string

            - A string containing the exact initial movement amount in the given currency.

   * - ``fees``

       .. type:: amount object
          :required: false

     - The total amount of fees withheld from the movement. For example, if a €10,00 payment comes in with a €0,29 fee,
       the ``fees`` amount will be ``{"currency":"EUR", "value":"-0.29"}``.

       When moving funds to a balance, we always round the fee to a 'real' amount. Any differences between these
       realtime rounded amounts and the final invoice will be compensated when the invoice is generated.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code of the fee.

          * - ``value``

              .. type:: string

            - A string containing the exact fee in the given currency.

   * - ``createdAt``

       .. type:: datetime

     - The date and time of the movement, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``context``

       .. type:: object

     - Depending on the ``type`` of the balance transaction, we will try to give more context about the specific event
       that triggered the movement. A few examples:

       * For type ``payment``: ``{"payment": {"id": "tr_...", "description": "..."}}``
       * For type ``refund``:
         ``{"payment": {"id": "tr_...", "description": "..."}, "refund": {"id": "re_...", "description": "..."}}``

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
