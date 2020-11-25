Get open settlement
===================
.. api-name:: Settlements API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/settlements/open

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve the details of the open balance of the organization. This will return a settlement object representing your
organization's balance.

Response
--------
``200`` ``application/hal+json``

The open balance settlement is returned in the same fashion as the :doc:`Get settlement <get-settlement>` endpoint.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/settlements/open \
         -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      $openSettlement = $mollie->settlements->open();

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ'
      end

      settlement = Mollie::Settlement.open

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "settlement",
       "id": "open",
       "status": "open",
       "amount": {
           "currency": "EUR",
           "value": "39.75"
       },
       "periods": {
           "2018": {
               "04": {
                   "revenue": [
                       {
                           "description": "iDEAL",
                           "method": "ideal",
                           "count": 6,
                           "amountNet": {
                               "value": "86.1000",
                               "currency": "EUR"
                           },
                           "amountVat": null,
                           "amountGross": {
                               "value": "86.1000",
                               "currency": "EUR"
                           }
                       },
                       {
                           "description": "Refunds iDEAL",
                           "method": "refund",
                           "count": 2,
                           "amountNet": {
                               "value": "-43.2000",
                               "currency": "EUR"
                           },
                           "amountVat": null,
                           "amountGross": {
                               "value": "43.2000",
                               "currency": "EUR"
                           }
                       }
                   ],
                   "costs": [
                       {
                           "description": "iDEAL",
                           "method": "ideal",
                           "count": 6,
                           "rate": {
                               "fixed": {
                                   "value": "0.3500",
                                   "currency": "EUR"
                               },
                               "percentage": null
                           },
                           "amountNet": {
                               "value": "2.1000",
                               "currency": "EUR"
                           },
                           "amountVat": {
                               "value": "0.4410",
                               "currency": "EUR"
                           },
                           "amountGross": {
                               "value": "2.5410",
                               "currency": "EUR"
                           }
                       },
                       {
                           "description": "Refunds iDEAL",
                           "method": "refund",
                           "count": 2,
                           "rate": {
                               "fixed": {
                                   "value": "0.2500",
                                   "currency": "EUR"
                               },
                               "percentage": null
                           },
                           "amountNet": {
                               "value": "0.5000",
                               "currency": "EUR"
                           },
                           "amountVat": {
                               "value": "0.1050",
                               "currency": "EUR"
                           },
                           "amountGross": {
                               "value": "0.6050",
                               "currency": "EUR"
                           }
                       }
                   ]
               }
           }
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/settlements/open",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/settlements-api/get-open-settlement",
               "type": "text/html"
           }
       }
   }
