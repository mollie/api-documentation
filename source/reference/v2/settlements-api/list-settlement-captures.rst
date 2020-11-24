List Settlement Captures API
============================

.. api-name:: Settlements API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/settlements/*settlementId*/captures

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all captures in a certain settlement.

Captures are used for *pay after delivery* payment methods. The only payment methods at the moment that have this flow
are *Klarna Pay later* and *Klarna Slice it*. Captures are created when (part of) an Order is shipped. The capture is
then settled to the merchant.

Parameters
----------
Replace ``settlementId`` in the endpoint URL by the settlement's ID. For example:
``/v2/settlements/stl_jDk30akdN/captures``.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``payment`` Include the :doc:`payments </reference/v2/payments-api/get-payment>` the captures were created for.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of captures found in ``_embedded``, which is either the requested number (with a maximum of 250) or
       the default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``captures``

              .. type:: array

            - An array of capture objects as described in :doc:`Get capture </reference/v2/captures-api/get-capture>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of captures. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: object

            - The URL to the current set of captures.

          * - ``previous``

              .. type:: object

            - The previous set of captures, if available.

          * - ``next``

              .. type:: object

            - The next set of captures, if available.

          * - ``documentation``

              .. type:: object

            - The URL to the List settlement captures endpoint documentation.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/settlements/stl_jDk30akdN/captures \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");

      $settlement = $mollie->settlements->get("stl_jDk30akdN");
      $captures = $settlement->captures();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "_embedded": {
           "captures": [
               {
                   "resource": "capture",
                   "id": "cpt_4qqhO89gsT",
                   "mode": "live",
                   "amount": {
                       "value": "1027.99",
                       "currency": "EUR"
                   },
                   "settlementAmount": {
                       "value": "399.00",
                       "currency": "EUR"
                   },
                   "paymentId": "tr_WDqYK6vllg",
                   "shipmentId": "shp_3wmsgCJN4U",
                   "settlementId": "stl_jDk30akdN",
                   "createdAt": "2018-08-02T09:29:56+00:00",
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg/captures/cpt_4qqhO89gsT",
                           "type": "application/hal+json"
                       },
                       "payment": {
                           "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
                           "type": "application/hal+json"
                       },
                       "shipment": {
                           "href": "https://api.mollie.com/v2/orders/ord_8wmqcHMN4U/shipments/shp_3wmsgCJN4U",
                           "type": "application/hal+json"
                       },
                       "settlement": {
                           "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN",
                           "type": "application/hal+json"
                       },
                       "documentation": {
                           "href": "https://docs.mollie.com/reference/v2/captures-api/get-capture",
                           "type": "text/html"
                       }
                   }
               }
           ]
       },
       "count": 1,
       "_links": {
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/settlements-api/list-settlement-captures",
               "type": "text/html"
           },
           "self": {
               "href": "https://api.mollie.com/v2/settlements/stl_jDk30akdN/captures?limit=50",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": null
       }
   }

