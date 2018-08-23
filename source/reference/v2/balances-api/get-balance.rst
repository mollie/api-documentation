Get balance
===========
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/balances/*id*

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve a balance by its unique token. See the guide on :doc:`Mollie Payouts </guides/payouts>` for more details on
balances.

Parameters
----------
Replace ``id`` in the endpoint URL by the balance's ID, for example ``bal_8irzh1y2``.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` parameter is also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to get a balance made in test mode. If you omit this parameter, you can only retrieve live
       mode balances.

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

   * - ``type``

       .. type:: string

     - The balance type. Either ``default`` for the default balance of the account, or ``custom`` for any custom
       balances created via the API.

       Possible values: ``default`` ``custom``

   * - ``currency``

       .. type:: string

     - The balance's `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

   * - ``description``

       .. type:: string

     - The description specified during balance creation.

   * - ``transferFrequency``

       .. type:: string

     - The frequency at which the available amount on the balance will be transfered away to the configured transfer
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

   * - ``transferDestination``

       .. type:: object

     - The destination where the available amount will be automatically transfered to if a ``transferFrequency`` is
       configured.

       .. list-table::
          :widths: auto

          * - ``type``

              .. type:: string

            - The default destination of automatic scheduled transfers. Currently only ``bank-account`` is supported.

              Possible values:

              * ``bank-account`` Transfer the balance amount to an external bank account.

          * - ``bankAccount``

              .. type:: string

            - Required for transfer method ``bank-account``. The configured bank account number of the beneficiary the
              balance amount is to be transferred to.

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

     - The total amount that is queued to be transferred to your balance, for example payments that have not yet been
       confirmed or that have been scheduled to be transferred at a specific date. (See the ``routing`` parameter in
       the :doc:`Create payment </reference/v2/payments-api/create-payment>` documentation.)

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

     - The total amount that is in the process of being transferred from your balance to its destination, either because
       of an automatically scheduled transfer or because of a manually triggered transfer.

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

   curl -X GET https://api.mollie.com/v2/balances/bal_8irzh1y2 \
       -H "Authorization: Bearer live_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "balance",
       "id": "bal_8irzh1y2",
       "mode": "live",
       "createdAt": "2018-06-14T14:32:16+00:00",
       "type": "custom",
       "currency": "EUR",
       "description": "My custom balance",
       "availableAmount": {
           "value": "49.12",
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
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/balances/bal_8irzh1y2",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/balances-api/get-balance",
               "type": "text/html"
           }
       }
   }
