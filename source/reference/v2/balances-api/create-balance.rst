Create balance
==============
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/balances

.. authentication::
   :api_keys: true
   :oauth: true

Create a custom balance. You can transfer payments to this balance, split payments across multiple balances, and
schedule payouts of those balances to external bank accounts. See :doc:`Mollie Payouts </guides/payouts>` for more
details.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``description``

       .. type:: string
          :required: true

     - The balance's unique description.

   * - ``payoutFrequency``

       .. type:: string
          :required: false

     - The frequency with which this balance should be paid out using the configured payout method. See
       ``payoutMethod``. Defaults to ``twice-a-week``.

       Possible values:

       * ``daily`` Every business day.
       * ``twice-a-week`` Every Tuesday and Friday.
       * ``every-monday`` Every Monday.
       * ``every-tuesday`` Every Tuesday.
       * ``every-wednesday`` Every Wednesday.
       * ``every-thursday`` Every Thursday.
       * ``every-friday`` Every Friday.
       * ``twice-a-month`` On the first and the fifteenth of the month.
       * ``monthly`` On the first of the month.

       .. note:: If the transfer is created in a weekend or during a bank holiday, the actual payout will take place on
                 the next business day.

   * - ``payoutThreshold``

       .. type:: amount object
          :required: false

     - Configure a minimum amount for scheduled balance payouts. As soon as the amount on the balance exceeds this
       threshold, the complete balance will be paid out according to the configured ``payoutFrequency`` and
       ``payoutMethod``.

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

            - A string containing the exact EUR amount you want to charge in. Make sure to send the right amount of
              decimals. Non-string values are not accepted.

   * - ``payoutMethod``

       .. type:: object
          :required: true

     - The method used to pay out the balance, once the balance is eligible for payout according to its
       ``payoutFrequency`` and ``payoutThreshold``.

       .. list-table::
          :widths: auto

          * - ``type``

              .. type:: string
                 :required: true

            - The type of method used to pay out the balance. Currently only ``bankaccount`` is supported.

              Possible values:

              * ``bankaccount`` Transfer the balance amount to an external bank account.

          * - ``bankAccount``

              .. type:: string
                 :required: false

            - Required for payout method ``bankaccount``. The bank account number of the beneficiary the balance amount
              is to be transferred to.

              Currently only IBANs are accepted.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` parameter is also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to create a test mode balance.

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
       -H "Authorization: Bearer live_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d "description=My custom balance" \
       -d "payoutMethod[type]=bankaccount" \
       -d "payoutMethod[bankAccount]=NL53INGB0654422370"

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "balance",
       "id": "bal_8irzh1y2",
       "mode": "live",
       "createdAt": "2018-06-14T14:32:16+00:00",
       "type": "custom",
       "currency": "EUR",
       "description": "My custom balance",
       "payoutFrequency": "twice-a-week",
       "payoutMethod": {
           "type": "bankaccount",
           "bankAccount": "NL53INGB0654422370"
       },
       "availableAmount": {
           "value": "0.00",
           "currency": "EUR"
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/balances/bal_8irzh1y2",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/balances-api/create-balance",
               "type": "text/html"
           }
       }
   }
