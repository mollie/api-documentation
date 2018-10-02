List shipments
==============
.. api-name:: Shipments API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/orders/*orderId*/shipments

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve all shipments for an order.

Parameters
----------
Replace ``orderId`` in the endpoint URL by the order's ID, for example ``ord_8wmqcHMN4U``.


Mollie Connect/OAuth parameters
-------------------------------
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` query string parameter is
also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to list all shipments available in test mode.


Response
--------
``200`` ``application/hal+json; charset=utf-8``

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

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/order/ord_kEn1PlbGa/shipments \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

     <?php
     $mollie = new \Mollie\Api\MollieApiClient();
     $mollie->setApiKey('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM');

     $order = $mollie->orders->get('ord_kEn1PlbGa');
     $shipments = $order->shipments();

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

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
