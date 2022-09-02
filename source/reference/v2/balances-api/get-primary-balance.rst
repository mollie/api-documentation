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

Retrieve the primary balance. This is the balance of your account's primary currency, where all payments are settled to
by default.

This endpoint is an alias of the :doc:`Get balance </reference/v2/balances-api/get-balance>`. Please refer to the
documentation of that endpoint for more information.

Response
--------
``200`` ``application/hal+json``

For the full list of fields, see :doc:`Get balance </reference/v2/balances-api/get-balance>`. Only
``_links`` is listed here.

.. list-table::
   :widths: auto

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
     "id": "bal_gVMhHKqSSRYJyPsuoPNFH",
     "mode": "live",
     "createdAt": "2019-01-10T10:23:41+00:00",
     "currency": "EUR",
     "status": "active",
     "availableAmount": {
       "value": "905.25",
       "currency": "EUR"
     },
     "pendingAmount": {
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
         "href": "https://api.mollie.com/v2/balances/bal_gVMhHKqSSRYJyPsuoPNFH",
         "type": "application/hal+json"
       },
       "documentation": {
         "href": "https://docs.mollie.com/reference/v2/balances-api/get-primary-balance",
         "type": "text/html"
       }
     }
   }
