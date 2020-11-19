Create balance
==============
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/balances

.. authentication::
   :api_keys: false
   :oauth: true

Create a custom balance. You can transfer payments to this balance, split payments across multiple balances, and
schedule payouts of those balances to external bank accounts. See :doc:`Mollie Marketplaces & Platforms </guides/payouts>` for more
details.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``description``

       .. type:: string
          :required: true

     - The balance's unique description.

   * - ``transferDestination``

       .. type:: object
          :required: true

     - The destination where the available amount will be automatically transfered to if a ``transferFrequency`` is
       configured.

       .. list-table::
          :widths: auto

          * - ``type``

              .. type:: string
                 :required: true

            - The default destination of automatic scheduled transfers. Currently only ``bank-account`` is supported.

              Possible values:

              * ``bank-account`` Transfer the balance amount to an external bank account.

          * - ``bankAccount``

              .. type:: string
                 :required: true

            - Required for transfer method ``bank-account``. The bank account number of the beneficiary the balance
              amount is to be transferred to.

              Currently only IBANs are accepted.

          * - ``beneficiaryName``

              .. type:: string
                 :required: true

            - Required for transfer method ``bank-account``. The full name of the beneficiary the balance amount is to
              be transferred to.
       
       .. note:: We use this information to create a submerchant in our system and run a process of verification of the details provided. 
                If the information requires further clarification, the balance will show a ``pending`` status. 
                `Read more about balance status /reference/v2/balances-api/get-balance#response`.
   
   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to create a test mode balance. Defatuls to ``false``.

   * - ``transferFrequency``

       .. type:: string
          :required: false

     - The frequency at which the available amount on the balance will be transfered away to the configured transfer
       destination. See ``transferDestination``. Defaults to ``twice-a-week``.

       Possible values:

       * ``never`` Never.
       * ``daily`` Every business day.
       * ``twice-a-week`` Every Tuesday and Friday.
       * ``every-monday`` Every Monday.
       * ``every-tuesday`` Every Tuesday.
       * ``every-wednesday`` Every Wednesday.
       * ``every-thursday`` Every Thursday.
       * ``every-friday`` Every Friday.
       * ``twice-a-month`` On the first and the fifteenth of the month.
       * ``monthly`` On the first of the month.

       .. note:: If the transfer is for an external destination, and the transfer is created in a weekend or during a
                 bank holiday, the actual bank transfer will take place on the next business day.

   * - ``transferThreshold``

       .. type:: amount object
          :required: false

     - Configure a minimum amount for scheduled automatic balance transfers. As soon as the amount on the balance
       exceeds this threshold, the complete balance will be paid out to the ``transferDestination`` according to the
       configured ``transferFrequency``.

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

            - A string containing the exact EUR threshold. The string represents an amount between 5,00 and 1.000,00 EUR and must have exactly two decimals. Non-string
              values are not accepted.

Response
--------
``201`` ``application/hal+json; charset=utf-8``

A balance object is returned, as described in :doc:`Get balance </reference/v2/balances-api/get-balance>`.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/balances \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW" \
       -d "description=My custom balance" \
       -d "transferDestination[type]=bank-account" \
       -d "transferDestination[bankAccount]=NL53INGB0654422370" \
       -d "transferDestination[beneficiaryName]=Jack Bauer" \
       -d "transferThreshold[currency]=EUR" \
       -d "transferThreshold[value]=40.00" \
       -d "transferFrequency=daily"

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

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
       },
       "documentation": {
         "href": "https://docs.mollie.com/reference/v2/balances-api/create-balance",
         "type": "text/html"
       }
     }
   }
