Update shipment
===================
.. api-name:: Shipments API
   :version: 2

.. endpoint::
   :method: PATCH
   :url: https://api.mollie.com/v2/orders/*orderId*/shipments/*shipmentId*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

This endpoint can be used to update the tracking information of a shipment.

Parameters
----------
Replace ``orderId`` in the endpoint URL by the order's ID, for example ``ord_8wmqcHMN4U`` and replace ``shipmentId`` by
the shipment's ID, for example ``shp_3wmsgCJN4U``.

.. list-table::
   :widths: auto

   * - ``tracking``

       .. type:: object
          :required: true

     - An object containing tracking details for the shipment.

       .. list-table::
          :widths: auto

          * - ``carrier``

              .. type:: string
                 :required: true

            - Name of the postal carrier (as specific as possible). For example ``PostNL``.

          * - ``code``

              .. type:: string
                 :required: true

            - The track and trace code of the shipment. For example ``3SKABA000000000``.

          * - ``url``

              .. type:: string
                 :required: false

            - The URL where your customer can track the shipment, for example:
              ``http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C``.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the ``testmode`` parameter is also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to update a test mode shipment.

Response
--------
``200`` ``application/hal+json``

A shipment object is returned, as described in
:doc:`Get shipment </reference/v2/shipments-api/get-shipment>`.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/orders/ord_kEn1PlbGa/shipments/shp_3wmsgCJN4U \
         -H "Content-Type: application/json" \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d '{
                 "tracking": {
                     "carrier": "PostNL",
                     "code": "3SKABA000000000",
                     "url": "http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C"
                 }
             }'

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $order = $mollie->orders->get('ord_kEn1PlbGa');
      $shipment = $order->getShipment("shp_3wmsgCJN4U");

      $shipment->tracking = [
            'carrier' => 'PostNL',
            'code' => '3SKABA000000000',
            'url' => 'http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C',
      ];
      $shipment = $shipment->update();

   .. code-block:: python
      :linenos:

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      order = mollie_client.orders.get('ord_kEn1PlbGa')
      order.update_shipment('shp_3wmsgCJN4U', {
         'tracking': {
            'carrier': 'PostNL',
            'code': '3SKABA000000000',
            'url': 'http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C,
         },
      })

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      shipment = Mollie::Order::Shipment.update(
        'shp_3wmsgCJN4U',
        order_id: 'ord_kEn1PlbGa',
        tracking: {
          carrier: 'PostNL',
          code: '3SKABA000000000',
          url: 'http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C'
        }
      )

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const shipment = await mollieClient.orders_shipments.update('shp_3wmsgCJN4U', {
          tracking: {
            carrier: 'PostNL',
            code: '3SKABA000000000',
            url: 'http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C',
          },
        });
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

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
            {
                "resource": "orderline",
                "id": "odl_jp31jz",
                "orderId": "ord_pbjz8x",
                "name": "LEGO 42056 Porsche 911 GT3 RS",
                "sku": "5702015594028",
                "type": "physical",
                "status": "completed",
                "metadata": null,
                "isCancelable": false,
                "quantity": 1,
                "unitPrice": {
                    "value": "329.99",
                    "currency": "EUR"
                },
                "vatRate": "21.00",
                "vatAmount": {
                    "value": "57.27",
                    "currency": "EUR"
                },
                "totalAmount": {
                    "value": "329.99",
                    "currency": "EUR"
                },
                "createdAt": "2018-08-02T09:29:56+00:00",
                "_links": {
                    "productUrl": {
                        "href": "https://shop.lego.com/nl-NL/Porsche-911-GT3-RS-42056",
                        "type": "text/html"
                    },
                    "imageUrl": {
                        "href": "https://sh-s7-live-s.legocdn.com/is/image/LEGO/42056?$PDPDefault$",
                        "type": "text/html"
                    }
                }
            }
        ],
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
    }
