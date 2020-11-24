Get shipment
============
.. api-name:: Shipments API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/orders/*orderId*/shipments/*shipmentId*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve a single shipment and the order lines shipped by a shipment's ID.

Parameters
----------
Replace ``orderId`` in the endpoint URL by the order's ID, for example ``ord_8wmqcHMN4U`` and replace ``shipmentId`` by
the shipment's ID, for example ``shp_3wmsgCJN4U``

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the ``testmode`` query string parameter is also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to retrieve a test mode shipment.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a shipment object. Will always contain ``shipment`` for this endpoint.

   * - ``id``

       .. type:: string

     - The shipment's unique identifier, for example ``shp_3wmsgCJN4U``.

   * - ``orderId``

       .. type:: string

     - The order this shipment was created on, for example ``ord_8wmqcHMN4U``.

   * - ``createdAt``

       .. type:: datetime

     - The shipment's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``tracking``

       .. type:: object

     - An object containing shipment tracking details. Will be omitted when no tracking details are available.

       .. list-table::
          :widths: auto

          * - ``carrier``

              .. type:: string

            - The name of the postal carrier.

          * - ``code``

              .. type:: string

            - The track and trace code for the shipment.

          * - ``url``

              .. type:: string

            - The URL where your customer can track the shipment.

   * - ``lines``

       .. type:: array

     - An array of :ref:`order line objects<order-lines-details>` as described in
       :doc:`Get order </reference/v2/orders-api/get-order>`.

       The lines will show the ``quantity``, ``discountAmount``, ``vatAmount`` and ``totalAmount`` shipped in this
       shipment. If the line was partially shipped, these values will be different from the values in response from the
       Get order API.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the shipment. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the shipment itself.

          * - ``order``

              .. type:: URL object

            - The resource URL of the order this shipment was created for.

          * - ``documentation``

              .. type:: URL object

            - The URL to the shipment retrieval endpoint documentation.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/orders/ord_kEn1PlbGa/shipments/shp_3wmsgCJN4U \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM');

      $order = $mollie->orders->get('ord_kEn1PlbGa');
      $shipment = $order->getShipment("shp_3wmsgCJN4U");

   .. code-block:: python
      :linenos:

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      order = mollie_client.orders.get('ord_kEn1PlbGa')
      shipment = order.get_shipment('shp_3wmsgCJN4U')

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      shipment = Mollie::Order::Shipment.get(
        'shp_3wmsgCJN4U',
        order_id: 'ord_kEn1PlbGa'
      )

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const shipment = await mollieClient.orders_shipments.get('shp_3wmsgCJN4U', {
          orderId: 'ord_kEn1PlbGa',
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
