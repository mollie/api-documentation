Orders API
==========
The Orders API allows you to create *payment intents* with order management functionalities. The API is specifically
designed for order-based payment processing. It can be seen as an extension of the
:doc:`Payments API </reference/v2/payments-api/overview>` for more specific use cases.

Some payment methods require order details (and therefore the Orders API) to function, such as Klarna Pay now,
Klarna Pay later and Klarna Slice it.

In its simplest form, processing an order requires three steps: setting up the order with the
:doc:`Create order endpoint </reference/v2/orders-api/create-order>`, sending the customer to our
:doc:`hosted checkout </payments/hosted-checkout>` for authorization, and capturing the order lines using the
:doc:`Shipments API </reference/v2/shipments-api/overview>` as you ship the items to the customer. The captured
amount or amounts will then be settled to your account.

Refer to the :doc:`Orders API guide </orders/overview>` for a step-by-step guide on implementing the Orders API.

Endpoints
---------
.. endpoint-card::
   :name: Create order
   :method: POST
   :url: /v2/orders
   :ref: /reference/v2/orders-api/create-order

   Create a payment intent with order details.

.. endpoint-card::
   :name: Get order
   :method: GET
   :url: /v2/orders/*id*
   :ref: /reference/v2/orders-api/get-order

   Retrieve a specific order.

.. endpoint-card::
   :name: Update order
   :method: PATCH
   :url: /v2/orders/*id*
   :ref: /reference/v2/orders-api/update-order

   Update the details of a specific order.

.. endpoint-card::
   :name: Cancel order
   :method: DELETE
   :url: /v2/orders/*id*
   :ref: /reference/v2/orders-api/cancel-order

   Cancel a specific order.

.. endpoint-card::
   :name: List orders
   :method: GET
   :url: /v2/orders
   :ref: /reference/v2/orders-api/list-orders

   Retrieve a list of all your orders.

.. endpoint-card::
   :name: Update order line
   :method: PATCH
   :url: /v2/orders/*id*/lines/*orderLineId*
   :ref: /reference/v2/orders-api/update-order-line

   Update the details of a specific order line.

.. endpoint-card::
   :name: Cancel order lines
   :method: DELETE
   :url: /v2/orders/*id*/lines
   :ref: /reference/v2/orders-api/cancel-order-lines

   Cancel one or more specific order lines.

.. endpoint-card::
   :name: Create order payment
   :method: POST
   :url: /v2/orders/*id*/payments
   :ref: /reference/v2/orders-api/create-order-payment

   Create a payment for a specific pending order.
