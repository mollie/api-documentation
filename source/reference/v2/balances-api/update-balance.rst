Update balance
==============
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/balances/*id*

.. authentication::
   :api_keys: true
   :oauth: true

Update the configuration of a balance.

Parameters
----------
Replace ``paymentId`` in the endpoint URL by the balance's ID, for example: ``bal_8irzh1y2``.

.. list-table::
   :widths: auto

   * - ``description``

       .. type:: string
          :required: false

     - The balance's unique description.

   * - ``payoutFrequency``

       .. type:: string
          :required: false

     - The frequency with which this balance should be paid out using the configured payout method. See
       ``payoutMethod``.

       Possible values:

       * ``daily`` Every business day.
       * ``semiweekly`` Twice a week.
       * ``weekly`` Once a week.
       * ``semimonthly`` Every two weeks.
       * ``monthly`` First business day of the month.

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

   curl -X POST https://api.mollie.com/v2/balances/bal_8irzh1y2 \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"
       -d "description=My updated balance" \
       -d "payoutFrequency=monthly"

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
       "payoutFrequency": "monthly",
       "payoutMethod": {
           "type": "bankaccount",
           "bankAccount": "NL53INGB0654422370"
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
