Create transfers
================
.. api-name:: Transfers API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/transfers

.. authentication::
   :api_keys: false
   :oauth: true

Transfer funds away from a balance by creating a transfer.

See the guide on :doc:`Mollie Marketplaces & Platforms </guides/marketplaces-platforms>` for more details on managing transfers for custom balances.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``source``

       .. type:: object
          :required: true

     - The source the amount is to be transferred from.

       .. list-table::
          :widths: auto

          * - ``type``

              .. type:: string
                 :required: true

            - The type of transfer source. Can currently only be ``balance``.

              Possible values: ``balance``

          * - ``balanceId``

              .. type:: string
                 :required: true

            - In case of a transfer from a balance, specify the ID of the source balance. For example: ``bal_8irzh1y2``.

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to create a test mode transfer.

   * - ``currency``

       .. type:: string
          :required: false

     - An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. Currently only ``EUR`` is supported.
       Only needs to be provided when no amount object is specified

   * - ``amount``

       .. type:: amount object
          :required: false

     - Optionally specify the amount you want to transfer. If no amount is given, the total available amount on the
       balance will be transferred.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string
                 :required: true

            - An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. Currently only ``EUR`` is
              supported.

          * - ``value``

              .. type:: string
                 :required: true

            - A string containing the exact EUR amount you want to transfer. Make sure to send the right amount of
              decimals. Non-string values are not accepted.

   * - ``destination``

       .. type:: object
          :required: false

     - The destination the amount is to be transferred to. If no destination is specified, the amount will be
       transferred to the bank account set as transfer destination on the source balance.

       .. list-table::
          :widths: auto

          * - ``type``

              .. type:: string
                 :required: true

            - The type of transfer destination.

              Possible values: ``balance``

          * - ``balanceId``

              .. type:: string
                 :required: true

            - The ID of the destination balance, for example: ``bal_a4hje5``.

Response
--------
``201`` ``application/hal+json; charset=utf-8``

A transfer object is returned, as described in :doc:`Get transfer </reference/v2/transfers-api/get-transfer>`.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/transfers \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW" \
       -d "source[type]=balance" \
       -d "source[balanceId]=bal_hinmkh"

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

   {
     "resource": "transfer",
     "id": "trf_zam45a",
     "mode": "live",
     "reference": "00000004.1901.01",
     "createdAt": "2019-01-10T13:37:50+00:00",
     "status": "open",
     "currency": "EUR",
     "amount": {
       "value": "30.00",
       "currency": "EUR"
     },
     "source": {
       "type": "balance",
       "balanceId": "bal_hinmkh"
     },
     "destination": {
       "type": "bank-account",
       "beneficiaryName": "Jack Bauer",
       "bankAccount": "NL53INGB0654422370"
     },
     "_links": {
       "self": {
         "href": "https://api.mollie.com/v2/transfers/trf_zam45a",
         "type": "application/hal+json"
       },
       "documentation": {
         "href": "https://docs.mollie.com/reference/v2/transfers-api/create-transfer",
         "type": "text/html"
       }
     }
   }
