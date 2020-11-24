Create shipment
===============
.. api-name:: Shipments API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/orders/*orderId*/shipments

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

The **Create Shipment API** is used to ship order lines created by the
:doc:`/reference/v2/orders-api/create-order`.

When using *Klarna Pay later* and *Klarna Slice it* this is mandatory for the order amount to be captured. A capture
will automatically be created for the shipment.

The word "shipping" is used in the figurative sense here. It can also mean that a service was provided or digital
content was delivered.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``lines``

       .. type:: array
          :required: false

     - An array of objects containing the order line details you want to create a shipment for.  If you leave out
       this parameter, the entire order will be shipped. If the order is already partially shipped, any remaining
       lines will be shipped.

       .. list-table::
          :widths: auto

          * - ``id``

              .. type:: string

            - The API resource token of the order line, for example: ``odl_jp31jz``.

          * - ``quantity``

              .. type:: int
                 :required: false

            - The number of items that should be shipped for this order line. When this parameter is omitted, the
              whole order line will be shipped.

              Must be less than the number of items already shipped for this order line.

          * - ``amount``

              .. type:: amount object
                 :required: false

            - The amount that you want to ship. In almost all cases, Mollie can determine the amount automatically.

              The amount is required only if you are *partially* shipping an order line which has a non-zero
              ``discountAmount``.

              The amount you can ship depends on various properties of the order line and the create shipment request.
              The maximum that can be shipped is ``unit price x quantity to ship``.

              The minimum amount depends on the discount applied to the line, the quantity already shipped or canceled,
              the amounts already shipped or canceled and the quantity you want to ship.

              If you do not send an amount, Mollie will determine the amount automatically or respond with an error
              if the amount cannot be determined automatically. The error will contain the ``extra.minimumAmount`` and
              ``extra.maximumAmount`` properties that allow you pick the right amount.

   * - ``tracking``

       .. type:: object
          :required: false

     - An object containing tracking details for the shipment. When sent, the ``carrier`` and ``code`` parameters become
       required for this endpoint.

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
:doc:`OAuth app </oauth/overview>`, you should use the ``testmode`` parameter if you want to create a shipment in test mode.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to make this order a test shipment.

Response
--------
``201`` ``application/hal+json``

A shipment object is returned, as described in :doc:`Get shipment </reference/v2/shipments-api/get-shipment>`.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/orders/ord_kEn1PlbGa/shipments \
         -H "Content-Type: application/json" \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d '{
                 "lines": [
                     {
                         "id": "odl_dgtxyl",
                         "quantity": 1
                     },
                     {
                         "id": "odl_jp31jz"
                     }
                 ],
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
      $mollie->setApiKey('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM');

      $order = $mollie->orders->get('ord_kEn1PlbGa');
      $shipment = $order->createShipment(
         [
         'lines' => [
               [
               'id' => 'odl_dgtxyl',
               'quantity' => 1, // you can set the quantity if not all is shipped at once
               ],
               [
               'id' => 'odl_jp31jz',
               // assume all is shipped if no quantity is specified
               ],
         ],
         [
               'tracking' => [
               'carrier' => 'PostNL',
               'code' => '3SKABA000000000',
               'url' => 'http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C'
               ],
         ],
         ]
      );

      // Alternative shorthand for shipping all remaining order lines
      $shipment = $order->shipAll([
            'tracking' => [
                  'carrier' => 'PostNL',
                  'code' => '3SKABA000000000',
                  'url' => 'http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C'
            ],
      ]);

   .. code-block:: python
      :linenos:

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      order = mollie_client.orders.get('ord_kEn1PlbGa')
      shipment = order.create_shipment({
         'lines': [
            {
               'id': 'odl_dgtxyl',
               'quantity': 1,  # you can set the quantity if not all is shipped at once
            },
            {
               'id': 'odl_jp31jz',  # all is shipped if no quantity is set
            }
         ],
         'tracking': {
            'carrier': 'PostNL',
            'code': '3SKABA000000000',
            'url': 'http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C',
         }
      })

      # if all lines are shipped, there is no need to specify them
      shipment = order.create_shipment({
         'tracking': {
            'carrier': 'PostNL',
            'code': '3SKABA000000000',
            'url': 'http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C',
         }
      })

      # or when no tracking is specified:
      shipment = order.create_shipment()

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      shipment = Mollie::Order::Shipment.create(
        order_id: 'ord_kEn1PlbGa',
        lines: [
          {
            id: 'odl_dgtxyl',
            quantity: 1 # Ship one item from this order line
          },
          {
            id: 'odl_jp31jz' # Ship every item in this order line, as quantity is not specified
          }
        ],
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
        let shipment = await mollieClient.orders_shipments.create({
          orderId: 'ord_kEn1PlbGa',
          lines: [
            {
              id: 'odl_dgtxyl',
              quantity: 1,  // you can set the quantity if not all is shipped at once
            },
            {
              id: 'odl_jp31jz',  // all is shipped if no quantity is set
            },
          ],
          tracking: {
            carrier: 'PostNL',
            code: '3SKABA000000000',
            url: 'http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C',
          },
        });

        // If all lines are shipped, there is no need to specify them:
        shipment = await mollieClient.orders_shipments.create({
          orderId: 'ord_kEn1PlbGa',
          lines: [],
          tracking: {
            carrier: 'PostNL',
            code: '3SKABA000000000',
            url: 'http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C',
          },
        });

        // Or when no tracking is specified:
        shipment = await mollieClient.orders_shipments.create({ orderId: 'ord_kEn1PlbGa', lines: [] });
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
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

Response (amount required)
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: none
   :linenos:

   HTTP/1.1 422 Unprocessable Entity
   Content-Type: application/hal+json

   {
        "status": 422,
        "title": "Unprocessable Entity",
        "detail": "Line 0 contains invalid data. An amount is required for this API call. The amount must be between €0.00 and €50.00.",
        "field": "lines.0.amount",
        "extra": {
            "minimumAmount": {
                "value": "0.00",
                "currency": "EUR"
            },
            "maximumAmount": {
                "value": "50.00",
                "currency": "EUR"
            }
        },
        "_links": {
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/shipments-api/create-shipment",
                "type": "text/html"
            }
        }
    }
