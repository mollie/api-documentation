Shipments API
=============
The Shipments API allows you to indicate that you have (partially) fulfilled an order that was created with the
:doc:`Orders API </reference/v2/orders-api/overview>`. This implicitly (partially) captures the authorized amount, which
will then be settled to your balance.

The word "shipping" is used in the figurative sense here. It can also mean that a service was provided or digital
content was delivered.

Refer to the :doc:`Orders API guide </orders/overview>` for a step-by-step guide on implementing the Orders API and the
Shipments API.

Endpoints
---------
.. endpoint-card::
   :name: Create shipment
   :method: POST
   :url: /v2/orders/*orderId*/shipments
   :ref: /reference/v2/shipments-api/create-shipment

   Create a shipment for a specific order.

.. endpoint-card::
   :name: Get shipment
   :method: GET
   :url: /v2/orders/*orderId*/shipments/*id*
   :ref: /reference/v2/shipments-api/get-shipment

   Retrieve a specific shipment.

.. endpoint-card::
   :name: Update shipment
   :method: PATCH
   :url: /v2/orders/*orderId*/shipments/*id*
   :ref: /reference/v2/shipments-api/update-shipment

   Update a specific shipment.

.. endpoint-card::
   :name: List shipments
   :method: GET
   :url: /v2/orders/*orderId*/shipments
   :ref: /reference/v2/shipments-api/list-shipments

   Retrieve the list of shipments created for a specific order.
