Get default balance
===================
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/balances/default

.. authentication::
   :api_keys: false
   :oauth: true

Retrieve the default balance, where all payments and payouts are made from by default.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to get the default test mode balance. If you omit this parameter, the default live mode
       balance will be returned.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

The default balance is returned in the same fashion as the
:doc:`Get balance </reference/v2/balances-api/get-balance>` endpoint.

For the default balance, the ``type`` parameter will be set to ``default``.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/balances/default \
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
     "type": "default",
     "currency": "EUR",
     "description": "",
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
     "transferFrequency": "twice-a-month",
     "transferThreshold": {
       "value": "5.00",
       "currency": "EUR"
     },
     "transferDestination": {
       "type": "bank-account",
       "beneficiaryName": "JABBA REN",
       "bankAccount": "NL97MOLL6351480700"
     },
     "_links": {
       "self": {
         "href": "https://api.mollie.com/v2/balances/bal_3t2a2h",
         "type": "application/hal+json"
       },
       "documentation": {
         "href": "https://docs.mollie.com/reference/v2/balances-api/get-default-balance",
         "type": "text/html"
       }
     }
   }
