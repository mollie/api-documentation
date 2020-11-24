List Settlement Payments API
============================
.. api-name:: Settlements API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/settlements/*settlementId*/payments

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve all Payments included in a Settlement.

Note that payments for *pay after delivery* methods (such as Klarna Pay Later) are not listed in here. These payment
methods are settled using captures. To retrieve the captures, use the :doc:`list-settlement-captures`.

Parameters
----------
Replace ``settlementId`` in the endpoint URL by the settlement's ID, for example ``stl_jDk30akdN``.

This API is an alias of the :doc:`/reference/v2/payments-api/list-payments`. All
parameters for that API can be used here as well.

Response
--------
``200`` ``application/hal+json``

This API is an alias of the :doc:`/reference/v2/payments-api/list-payments`. The response
is therefore the exact same.

Example
-------

Request
^^^^^^^
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/settlements/stl_jDk30akdN/payments?limit=5 \
          -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");

      $settlement = $mollie->settlements->get("stl_jDk30akdN");
      $payments = $settlement->payments();

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ'
      end

      payments = Mollie::Settlement::Payment.all(settlement_id: 'stl_jDk30akdN')

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 5,
       "_embedded": {
           "payments": [
               {
                   "resource": "payment",
                   "id": "tr_7UhSN1zuXS",
                   "mode": "test",
                   "createdAt": "2018-02-12T11:58:35.0Z",
                   "expiresAt": "2018-02-12T12:13:35.0Z",
                   "status": "open",
                   "isCancelable": false,
                   "amount": {
                       "value": "75.00",
                       "currency": "GBP"
                   },
                   "description": "Order #12345",
                   "method": "ideal",
                   "metadata": null,
                   "details": null,
                   "profileId": "pfl_QkEhN94Ba",
                   "settlementId": "stl_jDk30akdN",
                   "redirectUrl": "https://webshop.example.org/order/12345/",
                   "_links": {
                        "self": {
                            "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS",
                            "type": "application/hal+json"
                        },
                        "settlement": {
                            "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN",
                            "type": "application/hal+json"
                        }
                    }
                },
               { },
               { },
               { },
               { }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN/payments?limit=5",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN/payments?from=tr_SDkzMggpvx&limit=5",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/settlements-api/list-settlement-payments",
               "type": "text/html"
           }
       }
   }
