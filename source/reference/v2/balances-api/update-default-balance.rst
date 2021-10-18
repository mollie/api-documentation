Update default balance
======================
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: PATCH
   :url: https://api.mollie.com/v2/balances/*apiBalanceToken*

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/balances/*apiBalanceToken*

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

With this endpoint you can change the settlement frequency and threshold of your default balance.

Parameters
----------
Replace ``apiBalanceToken`` in the endpoint URL by the balance token, which can be retrieved by the
:doc:`List balances </reference/v2/balances-api/list-balances>` endpoint.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to update a balance made in test mode. If you omit this parameter, you can only update live
       mode balances.

   * - ``transferFrequency``

       .. type:: string
          :required: false

     - The frequency at which the available amount on the balance will be transfered away to the configured transfer
       destination. See ``transferDestination``.

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

            - A string containing the exact threshold. The amount can be roughly between €5,00 and €1.000,00. Make sure
              to send the right amount of decimals. Non-string values are not accepted.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

The updated balance object is returned, as described in
:doc:`Get default balance </reference/v2/balances-api/get-default-balance>`.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X PATCH https://api.mollie.com/v2/balances/default \
       -H "Authorization: Bearer access_vR6naacwfSpfaT5CUwNTdV5KsVPJTNjURkgBPdvW"
       -d "transferFrequency=monthly"

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

      {
     "resource": "balance",
     "id": "bal_hinmkh",
     "mode": "live",
     "createdAt": "2019-01-10T12:06:28+00:00",
     "currency": "EUR",
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
     "transferFrequency": "monthly",
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
         "href": "https://docs.mollie.com/reference/v2/balances-api/get-default-balance",
         "type": "text/html"
       }
     }
   }
