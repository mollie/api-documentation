List balance transactions
=========================
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/balances/*balanceId*/transactions

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

With the List balance transactions endpoint you can retrieve a list of all the movements on your balance. This includes
payments, refunds, chargebacks, and settlements.

Parameters
----------
Replace ``balanceId`` in the endpoint URL by the balance ID, which can be retrieved by the
:doc:`List balances </reference/v2/balances-api/list-balances>` endpoint.

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

          * - ``resource``

              .. type:: string

            - Indicates the response contains a balance transaction object. Will always contain ``balance_transaction``
              for this endpoint.

          * - ``id``

              .. type:: string

            - The identifier uniquely referring to this balance transaction. Mollie assigns this identifier at
              transaction creation time. For example ``baltr_QM24QwzUWR4ev4Xfgyt29d``.

          * - ``type``

              .. type:: string

            - The type of movement, for example ``payment`` or ``refund``. Values include the below examples, although
              this list is not definitive.

              Regular payment processing: ``payment`` ``capture`` ``unauthorized-direct-debit`` ``failed-payment``

              Refunds and chargebacks: ``refund`` ``returned-refund`` ``chargeback`` ``chargeback-reversal``

              Settlements: ``outgoing-transfer`` ``canceled-outgoing-transfer`` ``returned-transfer``

              Invoicing: ``invoice-compensation`` ``balance-correction``

              Mollie Connect: ``application-fee`` ``split-payment`` ``platform-payment-refund`` ``platform-payment-chargeback``

          * - ``resultAmount``

              .. type:: amount object

            - The final amount that was moved to or from the balance, e.g. ``{"currency":"EUR", "value":"100.00"}``. If
              the transaction moves funds away from the balance, for example when it concerns a refund, the amount will
              be negative.

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

            - The amount that was to be moved to or from the balance, excluding fees. If the transaction moves funds away
              from the balance, for example when it concerns a refund, the amount will be negative.

              .. list-table::
                 :widths: auto

                 * - ``currency``

                     .. type:: string

                   - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code of the movement amount.

                 * - ``value``

                      .. type:: string

                   - A string containing the exact movement amount in the given currency.

          * - ``fees``

              .. type:: amount object
                :required: false

            - The total amount of fees withheld from the movement. For example, if a €10,00 payment comes in with a
              €0,29 fee, the ``fees`` amount will be ``{"currency":"EUR", "value":"-0.29"}``.

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

            - Depending on the ``type`` of the balance transaction, we will try to give more context about the specific
              event that triggered the movement. A few examples:

              * For type ``payment``: ``{"payment": {"id": "tr_..."}}``
              * For type ``refund``: ``{"payment": {"id": "tr_..."}, "refund": {"id": "re_..."}}``

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

   curl -X GET https://api.mollie.com/v2/balances/{balanceId}/transactions?limit=5 \
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
         "href": "https://docs.mollie.com/reference/v2/balances-api/list-balance-transactions",
         "type": "text/html"
       },
       "self": {
         "href": "https://api.mollie.com/v2/balances/bal_gVMhHKqSSRYJyPsuoPNFH/transactions?limit=5",
         "type": "application/hal+json"
       },
       "previous": null,
       "next": null
     }
   }
