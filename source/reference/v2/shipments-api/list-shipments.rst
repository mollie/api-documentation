List shipments
==============
.. api-name:: Shipments API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/orders/*orderId*/shipments

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all shipments for an order.

Parameters
----------
Replace ``orderId`` in the endpoint URL by the order's ID, for example ``ord_8wmqcHMN4U``.


Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the ``testmode`` query string parameter is also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to list all shipments available in test mode.


Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of shipments found in ``_embedded``.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``shipments``

              .. type:: array

            - An array of shipment objects as described in
              :doc:`Get shipment </reference/v2/shipments-api/get-shipment>`.

   * - ``_links``

       .. type:: object

     - Links related to the lists of shipments. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: object

            - The URL to the current set of shipments.

          * - ``documentation``

              .. type:: object

            - The URL to the shipment list endpoint documentation.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/order/ord_kEn1PlbGa/shipments \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM');

      $order = $mollie->orders->get('ord_kEn1PlbGa');
      $shipments = $order->shipments();

   .. code-block:: python
      :linenos:

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      order = mollie_client.orders.get('ord_kEn1PlbGa')
      shipments = order.shipments

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      shipments = Mollie::Order::Shipment.all(order_id: 'ord_kEn1PlbGa')

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const shipments = await mollieClient.orders_shipments.all({ orderId: 'ord_kEn1PlbGa' });
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 2,
       "_embedded": {
           "shipments": [
               {
                   "resource": "shipment",
                   "id": "shp_3wmsgCJN4U",
                   "orderId": "ord_kEn1PlbGa",
                   "createdAt": "2018-08-09T14:33:54+00:00",
                   "tracking": {
                       "carrier": "PostNL",
                       "code": "3SKABA000000000",
                       "url": "http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C"
                   },
                   "lines": [
                       {
                           "resource": "orderline",
                           "id": "odl_dgtxyl",
                           "orderId": "ord_pbjz8x",
                           "name": "LEGO 42083 Bugatti Chiron",
                           "sku": "5702016116977",
                           "type": "physical",
                           "status": "shipping",
                           "metadata": null,
                           "isCancelable": true,
                           "quantity": 1,
                           "unitPrice": {
                               "value": "399.00",
                               "currency": "EUR"
                           },
                           "vatRate": "21.00",
                           "vatAmount": {
                               "value": "51.89",
                               "currency": "EUR"
                           },
                           "discountAmount": {
                               "value": "100.00",
                               "currency": "EUR"
                           },
                           "totalAmount": {
                               "value": "299.00",
                               "currency": "EUR"
                           },
                           "createdAt": "2018-08-02T09:29:56+00:00",
                           "_links": {
                               "productUrl": {
                                   "href": "https://shop.lego.com/nl-NL/Bugatti-Chiron-42083",
                                   "type": "text/html"
                               },
                               "imageUrl": {
                                   "href": "https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$",
                                   "type": "text/html"
                               }
                           }
                       },
                       { }
                   ]
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/order/ord_kEn1PlbGa/shipments/shp_3wmsgCJN4U",
                           "type": "application/hal+json"
                       },
                       "order": {
                           "href": "https://api.mollie.com/v2/orders/ord_kEn1PlbGa",
                           "type": "application/hal+json"
                       },
                       "documentation": {
                           "href": "https://docs.mollie.com/reference/v2/shipments-api/get-shipment",
                           "type": "text/html"
                       }
                   }
               },
               { }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/order/ord_kEn1PlbGa/shipments",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/shipments-api/list-shipments",
               "type": "text/html"
           }
       }
   }
