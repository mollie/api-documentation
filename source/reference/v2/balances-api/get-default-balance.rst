Get default balance
===================
.. api-name:: Balances API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/balances/default

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve the default balance, where all payments and payouts are made from by default.

Mollie Connect/OAuth parameters
-------------------------------
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` parameter is also
available.

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
       -H "Authorization: Bearer live_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "balance",
       "id": "bal_i6ow3k81",
       "mode": "live",
       "createdAt": "2018-05-21T10:26:49+00:00",
       "type": "default",
       "currency": "EUR",
       "availableAmount": {
           "value": "215.03",
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
               "href": "https://api.mollie.com/v2/balances/bal_i6ow3k81",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/balances-api/get-balance",
               "type": "text/html"
           }
       }
   }
