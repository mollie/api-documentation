Get primary balance
===================
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/balances/primary

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

When processing payments with Mollie, we put all incoming funds — minus Mollie fees — on a balance. Once you have linked
a bank account to your Mollie account, we can pay out your balance towards this bank account.

With the Balances API you can retrieve your current balance. The response includes three amounts:

* The 'incoming amount'. These are payments that have been marked as 'paid', but are not yet available for paying out.
* The 'available amount'. This is the amount that you can get paid out to your bank account.
* The 'outgoing amount'. When we process a payout, the funds will be kept on your outgoing balance until your bank
  confirms the settlement.

With instant payment methods like iDEAL, payments are moved to the available balance instantly. With slower payment
methods, like credit card for example, it can take a few days before the funds are available on your balance. These
funds will be shown under the 'incoming amount' in the meanwhile.

If you process funds in multiple currencies, we will create one balance for each currency. The ``primary`` endpoint will
return the balance of your primary currency, but with the ``currency`` parameter you can retrieve your other balances as
well.

.. list-table::
   :widths: auto

   * - ``currency``

       .. type:: string
          :required: false

     - By default, the endpoint returns the balance of your primary currency. You can provide this parameter with a
       `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code to retrieve one of your foreign currency
       balances.

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to get the primary test mode balance. If you omit this parameter, the primary live mode
       balance will be returned.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a balance object. Will always contain ``balance`` for this endpoint.

   * - ``id``

       .. type:: string

     - The identifier uniquely referring to this balance. Mollie assigns this identifier at balance creation time. For
       example ``bal_8irzh1y2``.

   * - ``mode``

       .. type:: string

     - The mode used to create this balance. Mode determines whether real or test payments can be moved to this balance.

       Possible values: ``live`` ``test``

   * - ``createdAt``

       .. type:: datetime

     - The balance's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``currency``

       .. type:: string

     - The balance's `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

   * - ``status``

       .. type:: string

     - The status of the balance.

       Possible values:

       * ``active`` The balance is operational and ready to be used.
       * ``inactive`` In case the account is still being validated by our team or the balance has been blocked. Please
         `contact our support department <https://www.mollie.com/en/contact/>`_ for more information.

   * - ``transferFrequency``

       .. type:: string

     - The frequency at which the available amount on the balance will be transferred away to the configured transfer
       destination. See ``transferDestination``.

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
       * ``never`` Automatic balance transfers are paused for this balance.

       .. note:: If the transfer is for an external destination, and the transfer is created in a weekend or during a
                 bank holiday, the actual bank transfer will take place on the next business day.

   * - ``transferThreshold``

       .. type:: amount object

     - The minimum amount configured for scheduled automatic balance transfers. As soon as the amount on the balance
       exceeds this threshold, the complete balance will be paid out to the ``transferDestination`` according to the
       configured ``transferFrequency``.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. Currently only ``EUR`` is
              supported.

          * - ``value``

              .. type:: string

            - A string containing the exact EUR threshold. Make sure to send the right amount of decimals. Non-string
              values are not accepted.

   * - ``transferReference``

       .. type:: string

     - The transfer reference set to be included in all the transfer for this balance. Either a string or ``null``.

   * - ``transferDestination``

       .. type:: object

     - The destination where the available amount will be automatically transferred to according to the configured
       ``transferFrequency``.

       .. list-table::
          :widths: auto

          * - ``type``

              .. type:: string

            - The default destination of automatic scheduled transfers. Currently only ``bank-account`` is supported.

              Possible values:

              * ``bank-account`` Transfer the balance amount to an external bank account.

          * - ``bankAccount``

              .. type:: string

            - The configured bank account number of the beneficiary the
              balance amount is to be transferred to.

          * - ``bankAccountId``

              .. type:: string

            - Prefix token of the bank account.

          * - ``beneficiaryName``

              .. type:: string

            - The full name of the beneficiary the balance amount is to
              be transferred to.

   * - ``availableAmount``

       .. type:: amount object

     - The amount directly available on the balance, e.g. ``{"currency":"EUR", "value":"100.00"}``.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code of the available amount.

          * - ``value``

              .. type:: string

            - A string containing the exact available amount of the balance in the given currency.

   * - ``incomingAmount``

       .. type:: amount object

     - The total amount that is queued to be transferred to your balance. For example, a credit card payment can take a
       few days to clear.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code of the pending amount.

          * - ``value``

              .. type:: string

            - A string containing the exact pending amount of the balance in the given currency.

   * - ``outgoingAmount``

       .. type:: amount object

     - The total amount that is in the process of being transferred from your balance to your verified bank account.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code of the amount in transit.

          * - ``value``

              .. type:: string

            - A string containing the exact amount in transit in the given currency.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the balance. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the balance itself.

          * - ``documentation``

              .. type:: URL object

            - The URL to the balance retrieval endpoint documentation.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/balances/primary \
       -H 'Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW'

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
     "resource": "balance",
     "id": "bal_3t2a2h",
     "mode": "live",
     "createdAt": "2019-01-10T10:23:41+00:00",
     "currency": "EUR",
     "status": "active",
     "availableAmount": {
       "value": "905.25",
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
     "transferReference": "Mollie payout",
     "transferDestination": {
       "type": "bank-account",
       "beneficiaryName": "Jack Bauer",
       "bankAccount": "NL53INGB0654422370",
       "bankAccountId": "bnk_jrty3f"
     },
     "_links": {
       "self": {
         "href": "https://api.mollie.com/v2/balances/bal_3t2a2h",
         "type": "application/hal+json"
       },
       "documentation": {
         "href": "https://docs.mollie.com/reference/v2/balances-api/get-primary-balance",
         "type": "text/html"
       }
     }
   }
