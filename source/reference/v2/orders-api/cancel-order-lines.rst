Cancel order lines
==================
.. api-name:: Orders API
   :version: 2

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/orders/*orderId*/lines

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

This endpoint can be used to cancel one or more order lines that were previously authorized using a *pay after delivery*
payment method. Use the :doc:`Cancel Order API </reference/v2/orders-api/cancel-order>` if you want to cancel the entire
order or the remainder of the order.

Canceling or partially canceling an order line will immediately release the authorization held for that amount. Your
customer will be able to see the updated order in his portal / app. Any canceled lines will be removed from the
customer's point of view, but will remain visible in the Mollie Dashboard.

You should cancel an order line if you don't intend to (fully) ship it.

An order line can only be canceled while its ``status`` field is either ``authorized`` or ``shipping``. If you cancel
an ``authorized`` order line, the new order line status will be ``canceled``. Canceling a ``shipping`` order line will
result in a ``completed`` order line status.

If the order line is ``paid`` or already ``completed``, you should create a refund using the
:doc:`Create Order Refund API </reference/v2/orders-api/create-order-refund>` instead.

For more information about the status transitions please check our
:doc:`order status changes guide </orders/status-changes>`.

Parameters
----------
Replace ``orderId`` in the endpoint URL by the order's ID, for example ``ord_8wmqcHMN4U``.

.. list-table::
   :widths: auto

   * - ``lines``

       .. type:: array
          :required: true

     - An array of objects containing the order line details you want to cancel.

       .. list-table::
          :widths: auto

          * - ``id``

              .. type:: string
                 :required: true

            - The API resource token of the order line, for example: ``odl_jp31jz``.

          * - ``quantity``

              .. type:: int
                 :required: false

            - The number of items that should be canceled for this order line. When this parameter is omitted, the
              whole order line will be canceled. When part of the line has been shipped, it will cancel the remainder
              and the order line will be completed.

              Must be less than the number of items already shipped or canceled for this order line.

          * - ``amount``

              .. type:: amount object
                 :required: false

            - The amount that you want to cancel. In almost all cases, Mollie can determine the amount automatically.

              The amount is required only if you are *partially* canceling an order line which has a non-zero
              ``discountAmount``.

              The amount you can cancel depends on various properties of the order line and the cancel order lines request.
              The maximum that can be canceled is ``unit price x quantity to cancel``.

              The minimum amount depends on the discount applied to the line, the quantity already shipped or canceled,
              the amounts already shipped or canceled and the quantity you want to cancel.

              If you do not send an amount, Mollie will determine the amount automatically or respond with an error
              if the amount cannot be determined automatically. The error will contain the ``extra.minimumAmount`` and
              ``extra.maximumAmount`` properties that allow you pick the right amount.


Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` parameter is also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to cancel test mode order lines.

Response
--------
``204 No Content``

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X DELETE https://api.mollie.com/v2/orders/ord_8wmqcHMN4U/lines \
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
               ]
         }'

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $order = $mollie->orders->get("ord_8wmqcHMN4U");
      $order->cancelLines([
         'lines' => [
               [
                  'id' => 'odl_dgtxyl',
                  'quantity' => 1, // you can partially cancel the line.
               ],
               [
                  'id' => 'odl_jp31jz', // or cancel the line completely
               ],
         ],
      ]);

      // if you want to cancel all eligible lines, you can use this shorthand:
      // $order->cancelAllLines();

      $updatedOrder = $mollie->orders->get($order->id);

   .. code-block:: python
      :linenos:

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      order = mollie_client.orders.get('ord_8wmqcHMN4U')
      order.cancel_lines({
        'lines': [
          {
            'id': 'odl_dgtxyl',
            'quantity': 1,  # you can partially cancel the line.
          }
        ]
      })

      # if you want to cancel all eligible lines, you can use this shorthand:
      # order.cancel_lines()

      updated_order = mollie_client.orders.get('ord_8wmqcHMN4U')

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      order = Mollie::Order.get('ord_8wmqcHMN4U')

      # you can partially cancel the line.
      order.lines.first.cancel(qty: 1)

      # or cancel the line completely
      order.lines.first.cancel

      updated_order = Mollie::Order.get('ord_8wmqcHMN4U')

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 204 No Content

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
                "href": "https://docs.mollie.com/reference/v2/orders-api/cancel-order-lines",
                "type": "text/html"
            }
        }
    }

Response (cancellation rejected)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: none
   :linenos:


   HTTP/1.1 422 Unprocessable Entity
   Content-Type: application/hal+json

   {
       "status": 422,
       "title": "Unprocessable Entity",
       "detail": "Update authorization not allowed. Decision is based on order state and outcome of risk assessment.",
       "_links": {
           "documentation": {
               "href": "https://docs.mollie.com/guides/handling-errors",
               "type": "text/html"
           }
       }
   }
