List settlement refunds
=======================
.. api-name:: Settlements API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/settlements/*settlementId*/refunds

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve all refunds included in a settlement.

Parameters
----------
Replace ``settlementId`` in the endpoint URL by the settlement's ID, for example ``stl_jDk30akdN``.

This API is an comparable to the :doc:`/reference/v2/refunds-api/list-refunds`. All parameters
for that API can be used here as well.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``payment`` Include the :doc:`payments </reference/v2/payments-api/get-payment>` the refunds were created for.

Response
--------
``200`` ``application/hal+json``

The response of this endpoint is the same as :doc:`/reference/v2/refunds-api/list-refunds` endpoint.

Example
-------

Request
^^^^^^^
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/settlements/stl_jDk30akdN/refunds \
          -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");

      $settlement = $mollie->settlements->get("stl_jDk30akdN");
      $refunds = $settlement->refunds();

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ'
      end

      refunds = Mollie::Settlement::Refund.all(settlement_id: 'stl_jDk30akdN')

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "_embedded": {
           "refunds": [
               {
                   "resource": "refund",
                   "id": "re_3aKhkUNigy",
                   "amount": {
                       "value": "10.00",
                       "currency": "EUR"
                   },
                   "status": "refunded",
                   "createdAt": "2018-08-30T07:59:02+00:00",
                   "description": "Order #33",
                   "paymentId": "tr_maJaG2j8OM",
                   "settlementAmount": {
                       "value": "-10.00",
                       "currency": "EUR"
                   },
                   "settlementId": "stl_jDk30akdN",
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/payments/tr_maJaG2j8OM/refunds/re_3aKhkUNigy",
                           "type": "application/hal+json"
                       },
                       "payment": {
                           "href": "https://api.mollie.com/v2/payments/tr_maJaG2j8OM",
                           "type": "application/hal+json"
                       },
                       "settlement": {
                           "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN",
                           "type": "application/hal+json"
                       }
                   }
               },
               { }
           ]
       },
       "count": 1,
       "_links": {
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/settlements-api/list-settlement-refunds",
               "type": "text/html"
           },
           "self": {
               "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN/refunds?limit=50",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": null
       }
   }
