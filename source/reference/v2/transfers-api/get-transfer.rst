Get transfer
============
.. api-name:: Transfers API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/transfers/*id*

.. authentication::
   :api_keys: false
   :oauth: true

Retrieve a transfer by its unique token.

See the guide on :doc:`Mollie Payouts </guides/payouts>` for more details on managing transfers for custom balances.

Parameters
----------
Replace ``id`` in the endpoint URL by the transfer's ID, for example ``trf_j7hn0d6x``.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to get a transfer made in test mode. If you omit this parameter, you can only retrieve live
       mode transfers.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a transfer object. Will always contain ``transfer`` for this endpoint.

   * - ``id``

       .. type:: string

     - The identifier uniquely referring to this transfer. Mollie assigns this identifier at transfer creation time. For
       example ``trf_j7hn0d6x``.

   * - ``mode``

       .. type:: string

     - The mode used to create this transfer. Test transfers can only be created for test balances.

       Possible values: ``live`` ``test``

   * - ``reference``

       .. type:: string

     - The settlement’s bank reference, as found on your invoice and in your Mollie account.

   * - ``createdAt``

       .. type:: datetime

     - The transfer's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``status``

       .. type:: string

     - The status of the transfer.

       Possible values:

       * ``open`` In case of a transfer to an external bank account, this status indicates the transfer will be picked
         up for processing with the next daily payout round.
       * ``pending`` The transfer has been picked up and is being processed.
       * ``completed`` The transfer has been completed.
       * ``failed`` The transfer could not be processed.

   * - ``currency``

       .. type:: string

     - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code of the amount to be transferred.

   * - ``amount``

       .. type:: amount object

     - The amount to be transferred to its destination.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code of the amount to be transferred.

          * - ``value``

              .. type:: string

            - A string containing the exact amount of the transfer in the given currency.

   * - ``source``

       .. type:: object

     - The source the amount is being transferred from.

       .. list-table::
          :widths: auto

          * - ``type``

              .. type:: string

            - The type of transfer source. Can currently only be ``balance``.

              Possible values: ``balance``

          * - ``balanceId``

              .. type:: string

            - In case of a transfer from a balance, this field will hold the ID of the source balance.
              For example: ``bal_8irzh1y2``.

   * - ``destination``

       .. type:: object

     - The destination the amount is being transferred to.

       .. list-table::
          :widths: auto

          * - ``type``

              .. type:: string

            - The type of transfer destination. Can currently only be ``bank-account``.

              Possible values: ``bank-account``

          * - ``bankAccount``

              .. type:: string

            - In case of a transfer to a bank account, this field will hold the bank account number.

              Currently only IBAN bank account destinations are supported.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the transfer. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the transfer itself.

          * - ``documentation``

              .. type:: URL object

            - The URL to the transfer retrieval endpoint documentation.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/transfers/trf_zam45a \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW"

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
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
         "href": "https://docs.mollie.com/reference/v2/transfers-api/get-transfer",
         "type": "text/html"
       }
     }
   }
