Captures API
============
More advanced integrations may wish to implement an *authorize-then-capture* flow. In such a scenario, the customer
already authorizes a payment up front, and at a later point you may either capture (i.e. charge) the authorized amount
or cancel it.

In some scenarios, you may also capture a different amount than initially authorized.

Mollie currently only supports captures for **Klarna Pay now**, **Klarna Pay later** and **Klarna Slice it**, which are
only available via order-based payment processing. Essentially, you collect the authorization using the
:doc:`Orders API </reference/v2/orders-api/overview>`, and you can capture specific order lines using the
:doc:`Shipments API </reference/v2/shipments-api/overview>`. Each shipment implies a capture, which then also become
available via the Captures API.

For a step-by-step guide on integrating orders and shipments, see the :doc:`Orders guide </orders/overview>`.

Endpoints
---------
.. endpoint-card::
   :name: Get capture
   :method: GET
   :url: /v2/payments/*paymentId*/captures/*id*
   :ref: /reference/v2/captures-api/get-capture

   Retrieve a specific capture.

.. endpoint-card::
   :name: List captures
   :method: GET
   :url: /v2/payments/*paymentId*/captures
   :ref: /reference/v2/captures-api/list-captures

   Retrieve a list of all captures created for a specific payment.
