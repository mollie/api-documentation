Migrating from Payments API to the Orders API
=============================================
If you want to start using the Orders API, you can use this guide to migrate from the v2 Payments API to the Orders API.
Note that the Payments API is not going to be replaced by the Orders API.

Prerequisites
-------------
This guide assumes you are migrating from the v2 Payments API. If you are migrating from the v1 API please first review
the :doc:`v2 migration guide </payments/migrating-v1-to-v2>` to learn about the differences between the v1 and the v2
API.

Differences and similarities
----------------------------
To create a payment in the orders API the :doc:`Create order </reference/v2/orders-api/create-order>` API needs to be
used.

The `Create payment` and `Create order` APIs are very similar. Both support the following parameters: ``amount``,
``redirectUrl``, ``webhookUrl``, ``locale``, ``method`` and ``metadata``.  For orders, ``locale`` is a *required*
parameter.

For orders, there is no ``description`` field. The Payment description will be automatically created by Mollie and will
contain the order number, your profile’s name and your profile’s website.

If you specify a payment method using the ``method`` API parameter the ``payment`` parameter can be used to supply
additional :ref:`payment parameters <payment-parameters>`. For example the iDEAL issuer can be specified using the
following JSON body payload:

.. code-block:: json
   :linenos:

   {
       "orderNumber": "1337",
       "method": "ideal",
       "payment": {
           "issuer": "ideal_INGBNL2A"
       }
   }

Additional parameters are required to be able to create an order: ``orderNumber``, ``lines`` and ``billingAddress``. The
``lines`` parameter should be an array of :ref:`order lines <order-lines-details>` describing the actual order contents.
The ``billingAddress`` should contain the address of the person who will be billed for the order amount.

+------------------------+--------------------------------------------+------------------------------------------------+
|                        | Payments API                               | Orders API                                     |
+========================+============================================+================================================+
| ``amount``             | *Identical between Payments API and Orders API.*                                            |
+------------------------+--------------------------------------------+------------------------------------------------+
| ``redirectUrl``        | *Identical between Payments API and Orders API.*                                            |
+------------------------+--------------------------------------------+------------------------------------------------+
| ``webhookUrl``         | See :doc:`/payments/status-changes`.       | Orders have two flows: *authorized* and *paid*.|
|                        |                                            | See :doc:`/orders/status-changes`.             |
+------------------------+--------------------------------------------+------------------------------------------------+
| ``locale``             | Recommended in Payments API.               | Required for Orders API.                       |
+------------------------+--------------------------------------------+------------------------------------------------+
| ``method``             | Does not support *pay after delivery*      | Supports *Klarna Pay later* and *Klarna Slice  |
|                        | payment methods.                           | it*.                                           |
+------------------------+--------------------------------------------+------------------------------------------------+
| ``metadata``           | *Identical between Payments API and Orders API.*                                            |
+------------------------+--------------------------------------------+------------------------------------------------+
| ``description``        | Required for Payments API.                 | Not available.                                 |
+------------------------+--------------------------------------------+------------------------------------------------+
| ``orderNumber``        | Not available.                             | Required for Orders API.                       |
+------------------------+--------------------------------------------+------------------------------------------------+
| ``lines``              | Not available.                             | :ref:`Specify <order-lines-details>` the       |
|                        |                                            | products sold in the order.                    |
+------------------------+--------------------------------------------+------------------------------------------------+
| ``billingAddress``     | Optional for Payments API.                 | Required for Orders API. Has several new       |
|                        |                                            | fields.                                        |
+------------------------+--------------------------------------------+------------------------------------------------+

When the order is created the response will contain a ``checkout`` URL just like in the payments API:

.. code-block:: json
   :linenos:

    {
        "_links": {
            "checkout": {
                "href": "https://www.mollie.com/payscreen/order/checkout/pbjz8x",
                "type": "text/html"
            }
        }
    }

Your customer should be redirected to this URL to complete the order payment. This is the same as in the Payments API.

The only difference occurs when the customer chooses a payment method that requires authorization. This is the case with
*pay after delivery* payment methods. The customer will have to authorize the payment, and the payment is not executed
immediately. When a shipment is created for an authorized order a *capture* is made to process the payment. For more
info on the authorize payment flow please see :doc:`Order status changes </orders/status-changes>` for details on the
orders' statuses.

Note that the ``checkout`` link has a longer expiry period than a payment checkout URL. The exact expiry time can be
retrieved from the ``expiresAt`` property in the API response.

Receiving status updates
------------------------
Just like in the payments API you can specify a ``webhookUrl`` that will be used by Mollie to inform your back office
when the status of an order has changed. You can then use the Mollie API to
:doc:`retrieve the order status </reference/v2/orders-api/get-order>`.

Note that orders cannot be canceled by shoppers. The order will remain ``created`` so that you can add
further payments to the order to give your customer a second chance to pay for the order.

If you want to know if your customer canceled the first payment, you will need to retrieve the payment together with
the order instead of just the order by adding ``?embed=payments`` to the Get Order API request. You can then find the
status of the first payment under ``_embedded.payments.0.status``.

Canceling an order should be done from your backend. You can use the :doc:`Cancel Order API
</reference/v2/orders-api/cancel-order>`.

Retrieving available payment methods
------------------------------------
The retrieval of a :doc:`list of payment methods </reference/v2/methods-api/list-methods>` for orders is slightly
different from the Payments API. You will need to supply a ``resource`` parameter with value ``orders``, and a
``billingCountry`` parameter. This last parameter is used to check whether your customer is eligible for certain payment
methods, such as `Klarna Slice it`.

Example: ``https://api.mollie.com/v2/methods?resource=orders&billingCountry=DE``

Shipping
--------
When an order payment is successfully completed by the customer the payment status can be either `paid` or `authorized`.

*Pay later* payment methods will have an `authorized` status. Shipping is required and it ensures you will be settled.
Note that the customer will receive an invoice per shipment.

Shipping can be done using the :doc:`Create Shipment </reference/v2/shipments-api/create-shipment>` API or directly from
the `Mollie Dashboard <https://www.mollie.com/dashboard/>`_.

If needed, you can create multiple shipments per order. In the shipment you specify the order lines that are to be
shipped.

When all order lines are either shipped or canceled the order is completed.

Refunding
---------
Refunding works almost the same as in the payments API. You will have to use the
:doc:`Create order refund </reference/v2/orders-api/create-order-refund>` API and specify which order lines are to be
refunded. If no lines are specified the whole order will be refunded.

Payments
--------
An order always has a payment that is used by your customer to pay for the order. If the payment is
canceled, expired, or failed, it is possible to create a new payment using the
:doc:`Create order payment </reference/v2/orders-api/create-order-payment>` API. This has the
advantage that you do not need to create a new order, and can keep the order relation with your
internal e-commerce system. Note that this is only possible for orders that have a ``created`` status.
