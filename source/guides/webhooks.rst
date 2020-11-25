Webhooks
========
Webhooks are used to process real-time status updates, for example when a payment is paid. It is a URL Mollie will call
with the ID of the updated object. When Mollie calls your webhook, you should fetch the latest status and process it if
the status was changed.

.. note:: Check against your records that the resource actually has been changed when your webhook is called.

Example
-------
The most important example of a webhook is when a payment is paid. If you created the payment with a webhook URL, we
will call that webhook URL with a single POST-parameter called ``id`` and a value of for example ``tr_d0b0E3EA3v``. The
script behind your webhook URL should use that ID to :doc:`fetch the payment status </reference/v2/payments-api/get-payment>`
and act accordingly. If the new payment status is ``paid`` you can start shipping the order.

.. code-block:: bash
      :linenos:

      POST /payments/webhook HTTP/1.0
      Host: webshop.example.org
      Via: 1.1 tinyproxy (tinyproxy/1.8.3)
      Content-Type: application/x-www-form-urlencoded
      Accept: */*
      Accept-Encoding: deflate, gzip
      Content-Length: 16

      id=tr_d0b0E3EA3v

It might seem a little cumbersome that we don't post the new status immediately, but :doc:`proper security </guides/security>`
dictates this flow. Since the status is not transmitted in the webhook, fake calls to your webhook will never result in
orders being processed without being actually paid.

More examples are available in the documentation of the `Mollie API client <https://www.mollie.com/en/modules>`_ you are
using.

Endpoints supporting webhooks
-----------------------------
If an endpoint supports webhooks, you can specify the webhook URL you want to receive status changes on by providing the
parameter ``webhookUrl``. Below is a list of all endpoints that support webhooks.

Payments API
^^^^^^^^^^^^
The :doc:`Payments API </reference/v2/payments-api/create-payment>` calls a webhook when a payment reaches one of the
following statuses:

* ``paid``
* ``expired``
* ``failed``
* ``canceled``

Furthermore, the webhook will be called when:

* A refund is performed on the payment
* A refund has been canceled
* A chargeback is received on the payment.

Read more about :doc:`payment status changes </payments/status-changes>`.

Orders API
^^^^^^^^^^
The :doc:`Orders API </reference/v2/orders-api/create-order>` calls a webhook when an order reaches the status ``paid``
or ``authorized``. These statuses indicate that the order is ready to be shipped.

Furthermore, the webhook will be called when:

* A shipment is created for the order
* The order or part of the order is canceled
* The order or part of the order is refunded.

Read more about :doc:`order status changes </orders/status-changes>`.

Subscriptions API
^^^^^^^^^^^^^^^^^
The webhook URL specified when :doc:`creating a subscription </reference/v2/subscriptions-api/create-subscription>` is
used for each payment that is created by this subscription. Please refer to the explanation above for more information
about webhooks for payments.

The :ref:`Recurring Payments guide <payments/recurring/subscription-webhooks>` has some additional information about
webhooks for subscriptions.

Retry schema
------------
In response to Mollie calling your webhook, you only have to return the HTTP status ``200 OK``. Mollie then knows your
system correctly processed the request. In case you return a different status – let's say because there's a temporary
problem with your hosting service – we'll keep trying for a few hours, allowing you to process the request later on
after your hosting service has been restored.

Our webhook calls time out after 15 seconds. Even if you return a ``200 OK`` HTTP status after 16 seconds, we will mark
the webhook call as failed and try again later.

In total we will call your webhook 10 times with an increasing interval. If after the 10\ :sup:`th` call we still do not
get a ``200 OK`` response (which is after 26 hours), we will stop trying.

We use the following intervals between attempts while trying to call your webhook:

+--------------+-----------------------------------+---------------------------------------------------------------------------+
|**Attempt**   |**Interval**                       |**Time after status change (HH:mm)**                                       |
+--------------+-----------------------------------+---------------------------------------------------------------------------+
|1\ :sup:`st`  |Immediately after status change    |00:00                                                                      |
+--------------+-----------------------------------+---------------------------------------------------------------------------+
|2\ :sup:`nd`  |1 minute                           |00:01                                                                      |
+--------------+-----------------------------------+---------------------------------------------------------------------------+
|3\ :sup:`rd`  |2 minutes                          |00:03                                                                      |
+--------------+-----------------------------------+---------------------------------------------------------------------------+
|4\ :sup:`th`  |4 minutes                          |00:07                                                                      |
+--------------+-----------------------------------+---------------------------------------------------------------------------+
|5\ :sup:`th`  |8 minutes                          |00:15                                                                      |
+--------------+-----------------------------------+---------------------------------------------------------------------------+
|6\ :sup:`th`  |16 minutes                         |00:31                                                                      |
+--------------+-----------------------------------+---------------------------------------------------------------------------+
|7\ :sup:`th`  |29 minutes                         |01:00                                                                      |
+--------------+-----------------------------------+---------------------------------------------------------------------------+
|8\ :sup:`th`  |1 hour                             |02:00                                                                      |
+--------------+-----------------------------------+---------------------------------------------------------------------------+
|9\ :sup:`th`  |2 hours                            |04:00                                                                      |
+--------------+-----------------------------------+---------------------------------------------------------------------------+
|10\ :sup:`th` |22 hours                           |26:00                                                                      |
+--------------+-----------------------------------+---------------------------------------------------------------------------+

How to handle unknown IDs?
--------------------------
To not leak any information to malicious third parties, it is recommended to return a ``200 OK`` response even if the ID is not known to your system.

What IPs will the webhook requests be originating from?
-------------------------------------------------------
Read `our support article <https://help.mollie.com/hc/en-us/articles/213470829>`_ for more information on the IP
addresses that Mollie uses.

The webhook location is invalid
-------------------------------
`In this support article <https://help.mollie.com/hc/en-us/articles/213470409>`_ we explain when we return the error
``The webhook location is invalid`` and how you can solve this.

Redirecting webhook calls
-------------------------
When our call to the webhook URL gets redirected with a ``301 Moved Permanently`` or ``302 Found`` response the request changes from POST to get. This causes the POST payload to drop of the webhook call.
The solution is to redirect using a ``307 Temporary Redirect`` or ``308 Permanent Redirect`` response.
