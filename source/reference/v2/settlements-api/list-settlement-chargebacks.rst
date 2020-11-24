List settlement chargebacks
===========================
.. api-name:: Settlements API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/settlements/*settlementId*/chargebacks

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve all chargebacks included in a settlement.

Parameters
----------
Replace ``settlementId`` in the endpoint URL by the settlement's ID, for example ``stl_jDk30akdN``.

This endpoint is an alias of the :doc:`List chargebacks </reference/v2/chargebacks-api/list-chargebacks>` endpoint. All
parameters for that endpoint can be used here as well.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``payment`` Include the :doc:`payments </reference/v2/payments-api/get-payment>` these chargebacks were issued for.

Response
--------
``200`` ``application/hal+json``

This endpoint is an alias of the :doc:`List chargebacks </reference/v2/chargebacks-api/list-chargebacks>` endpoint. The
response is therefore the exact same.

Example
-------

Request
^^^^^^^
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/settlements/stl_jDk30akdN/chargebacks \
          -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      
      $settlement = $mollie->settlements->get("stl_jDk30akdN");
      $chargebacks = $settlement->chargebacks();

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
       "count": 3,
       "_embedded": {
           "chargebacks": [
               {
                   "resource": "chargeback",
                   "id": "chb_n9z0tp",
                   "amount": {
                       "value": "43.38",
                       "currency": "USD"
                   },
                   "settlementAmount": {
                       "value": "-37.14",
                       "currency": "EUR"
                   },
                   "createdAt": "2018-03-14T17:00:52.0Z",
                   "reversedAt": null
                   "paymentId": "tr_WDqYK6vllg",
                   "settlementId": "stl_jDk30akdN",
                   "_links": {
                        "self": {
                           "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg/chargebacks/chb_n9z0tp",
                           "type": "application/hal+json"
                        },
                        "payment": {
                           "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
                           "type": "application/hal+json"
                        },
                        "settlement": {
                            "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN",
                            "type": "application/hal+json"
                        }
                   }
               }
               { },
               { }
           ]
       },
       "_links": {
            "documentation": {
               "href": "https://docs.mollie.com/reference/v2/settlements-api/list-settlement-chargebacks",
               "type": "text/html"
            },
            "self": {
               "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN/chargebacks",
               "type": "application/hal+json"
            },
            "previous": null,
            "next": null
       }
   }
