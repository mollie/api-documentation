Update shipment
===================
.. api-name:: Shipments API
   :version: 2

.. endpoint::
   :method: PATCH
   :url: https://api.mollie.com/v2/orders/*orderId*/shipments/*shipmentId*

.. authentication::
   :api_keys: true
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

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` parameter is also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to update a test mode shipment.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

A shipment object is returned, as described in
:doc:`Get shipment </reference/v2/shipments-api/get-shipment>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/orders/ord_kEn1PlbGa/shipments/shp_3wmsgCJN4U \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d '{
            "tracking": {
                "carrier": "PostNL",
                "code": "3SKABA000000000",
                "url": "http://postnl.nl/tracktrace/?B=3SKABA000000000&P=1016EE&D=NL&T=C"
            },
        }'

Request (PHP)
^^^^^^^^^^^^^
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

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

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
                "productUrl": "https://shop.lego.com/nl-NL/Bugatti-Chiron-42083",
                "imageUrl": "https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$",
                "sku": "5702016116977",
                "type": "physical",
                "status": "shipping",
                "quantity": 2,
                "unitPrice": {
                    "value": "399.00",
                    "currency": "EUR"
                },
                "vatRate": "21.00",
                "vatAmount": {
                    "value": "121.14",
                    "currency": "EUR"
                },
                "discountAmount": {
                    "value": "100.00",
                    "currency": "EUR"
                },
                "totalAmount": {
                    "value": "698.00",
                    "currency": "EUR"
                },
                "createdAt": "2018-08-02T09:29:56+00:00"
            },
            {
                "resource": "orderline",
                "id": "odl_jp31jz",
                "orderId": "ord_pbjz8x",
                "name": "LEGO 42056 Porsche 911 GT3 RS",
                "productUrl": "https://shop.lego.com/nl-NL/Porsche-911-GT3-RS-42056",
                "imageUrl": "https://sh-s7-live-s.legocdn.com/is/image/LEGO/42056?$PDPDefault$",
                "sku": "5702015594028",
                "type": "physical",
                "status": "shipping",
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
                "createdAt": "2018-08-02T09:29:56+00:00"
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
