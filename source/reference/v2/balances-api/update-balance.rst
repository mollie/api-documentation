Update balance
==============
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: PATCH
   :url: https://api.mollie.com/v2/balances/*id*

.. authentication::
   :api_keys: true
   :oauth: true

Update the configuration of a balance.

Parameters
----------
Replace ``id`` in the endpoint URL by the balance's ID, for example: ``bal_8irzh1y2``.

.. list-table::
   :widths: auto

   * - ``description``

       .. type:: string
          :required: false

     - The balance's unique description.

   * - ``transferFrequency``

       .. type:: string
          :required: false

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

            - A string containing the exact EUR threshold. Make sure to send the right amount of decimals. Non-string
              values are not accepted.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you are creating an app with Mollie Connect (OAuth), the ``testmode`` parameter is available. You must pass this as a
parameter in the query string if you want to update a balance that was created in test mode.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to update a balance made in test mode. If you omit this parameter, you can only update live
       mode balances.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

The updated balance object is returned, as described in :doc:`Get balance </reference/v2/balances-api/get-balance>`.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X PATCH https://api.mollie.com/v2/balances/bal_8irzh1y2 \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"
       -d "description=My updated balance" \
       -d "transferFrequency=monthly"

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
       "description": "My updated balance",
       "availableAmount": {
           "value": "49.12",
           "currency": "EUR"
       },
       "transferFrequency": "monthly",
       "transferDestination": {
           "type": "bank-account",
           "bankAccount": "NL53INGB0654422370"
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/balances/bal_8irzh1y2",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/balances-api/update-balance",
               "type": "text/html"
           }
       }
   }
