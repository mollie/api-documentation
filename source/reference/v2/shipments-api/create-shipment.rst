Create shipment
===============
.. api-name:: Shipments API
   :version: 2

.. warning::
   This API is currently in private beta. If you are interested in participating, please contact your account manager at
   Mollie.

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/orders/*orderId*/shipments

.. authentication::
   :api_keys: true
   :oauth: true

In addition to the :doc:`Orders API </reference/v2/orders-api/create-order>`, the create shipment endpoint can be used
to ship order lines.

When using *Klarna Pay later* and *Klarna Slice it* this is mandatory for the order amount to be captured. An capture
will automatically be created for the shipment.

The word "shipping" is used in the figurative sense here. It can also mean that a service was provider or digital
content was delivered.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``lines``

       .. type:: array
          :required: true

     - An array of objects containing the order line details you want to create a shipment for.  If you send an empty
       array, the entire order will be shipped. If the order is already partially shipped, any remaining lines will be
       shipped.

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

              .. note:: At the moment, it is not possible to partially ship an order line if it has a discount.

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


Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, you should use the ``testmode`` parameter
if you want to create a shipment in test mode.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to make this order a test shipment.

Response
--------
``201`` ``application/hal+json; charset=utf-8``

A shipment object is returned, as described in :doc:`Get shipment </reference/v2/shipments-api/get-shipment>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/orders/ord_kEn1PlbGa/shipments \
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
            },
        }'

Request (PHP)
^^^^^^^^^^^^^
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
