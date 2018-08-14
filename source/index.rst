Mollie API: simple & powerful
=============================

Use the Mollie API to integrate online payments by Mollie directly into your website or app. Mollie and your website
will communicate by sending HTTP requests back and forth.

This page provides an overview of the Mollie API. The topics in the chapter deal with a number of specific aspects of
the API. We recommend to read these topics entirely.

If possible it would be wise to leave communication at this level to our ready-made :ref:`Clients <clients>`. This
allows you to still be in control without reinventing the wheel.

If you have any questions about integrating our API, please `contact us <https://www.mollie.com/en/contact/>`_. We're
happy to help!

The Mollie REST API
-------------------
The API implements a **Representational state transfer** (REST) architecture. Sounds technical, but it's really quite
easy. It mainly breaks down to HTTP-methods ``GET``, ``PATCH``, ``POST`` and ``DELETE`` matching the operations to
**read**, **update**, **create** and **delete**.

REST also implies a nice and clean structure for URLs or endpoints. This means you can reach any part of the Mollie API
on ``https://api.mollie.com/v2/`` adding the name of the resource you want to interact with.

.. _clients:

Clients, modules and plugins
----------------------------
Well begun is half done. Save time and build on solid foundations. Mollie API clients are available for
`PHP <https://github.com/mollie/mollie-api-php>`_, `Ruby <https://github.com/mollie/mollie-api-ruby>`_,
`Node.js <https://github.com/mollie/mollie-api-node>`_ and `Python <https://github.com/mollie/mollie-api-python>`_.

Of course we also provide modules and plugins for about every webshop software out there.

Payment methods
---------------
Mollie is always adding new payment methods. The Mollie API currently supports these payments methods:

* `Bancontact <https://www.mollie.com/en/payments/bancontact>`_
* `Bank transfer <https://www.mollie.com/en/payments/bank-transfer>`_
* `Belfius Pay Button <https://www.mollie.com/en/payments/belfius>`_
* `Bitcoin <https://www.mollie.com/en/payments/bitcoin>`_
* `Credit card <https://www.mollie.com/en/payments/credit-card>`_ (VISA, MasterCard, Maestro and American Express)
* `SEPA Direct Debit <https://www.mollie.com/en/payments/direct-debit>`_
* `EPS <https://www.mollie.com/en/payments/eps>`_
* `Gift cards <https://www.mollie.com/en/payments/gift-cards>`_ (Webshop Giftcard, Podium Cadeaukaart, VVV Cadeaukaart,
  YourGift etc.)
* `Giropay <https://www.mollie.com/en/payments/giropay>`_
* `iDEAL <https://www.mollie.com/en/payments/ideal>`_
* `ING Home'Pay <https://www.mollie.com/en/payments/ing-homepay>`_
* `KBC/CBC Payment Button <https://www.mollie.com/en/payments/kbc-cbc>`_
* `PayPal <https://www.mollie.com/en/payments/paypal>`_
* `paysafecard <https://www.mollie.com/en/payments/paysafecard>`_
* `SOFORT Banking <https://www.mollie.com/en/payments/sofort>`_

All of the payment methods you have enabled are – where relevant – shown to the consumer. You can enable payment methods
using the `Dashboard <https://www.mollie.com/dashboard/settings/profiles>`_.

How does the Mollie API work?
-----------------------------
.. image:: https://assets.docs.mollie.com/_images/api-overview-flow@2x.png

#. A customer on your website decides to checkout.

#. Your website :doc:`creates a payment </reference/v2/payments-api/create-payment>` on the Mollie platform by calling
   the Mollie API with the amount, a payment description, a webhook URL, and a URL we should redirect the customer to
   after the payment is made.

   The API responds with the unique id and the ``_links.checkout`` URL for the newly created payment. Your website
   stores the ``id``, links it to the customer's order and redirects the customer to the URL in the ``_links.checkout``
   property from the Mollie API response. This is the URL to the hosted payment page for this specific payment.

   .. note :: You should use HTTP ``GET`` for the redirect to the ``_links.checkout`` URL. Using HTTP ``POST`` for
              redirection will cause issues with some payment methods or iDEAL issuers. Use HTTP status code ``303 See
              Other`` to force an HTTP ``GET`` redirect.

#. The customer reaches the :doc:`checkout </guides/checkout>`, chooses a payment method and makes the payment. This
   process is entirely taken care of by Mollie. You don't need to do anything here.

#. When the payment is made Mollie will call your :doc:`webhook </guides/webhooks>` informing your website about the
   :doc:`payment's status change </guides/payment-status-changes>`. You should define a webhook when creating the
   payment.

   In response to your webhook being called your application just needs to issue a ``200 OK`` status. From that response
   Mollie can tell that your processing of the new status was successful – for any other response we keep trying.

#. Processing the webhook request your website
   :doc:`fetches the payment status </reference/v2/payments-api/get-payment>` using the Mollie API. This fetched status
   serves to mark the order as paid, trigger fulfilment and send out an email confirmation to the customer.

#. At this point Mollie returns the visitor to your website using the ``redirectUrl`` specified when the payment was
   created. Your website already knows the payment was successful and thanks the customer.

Connecting orders and payments
------------------------------
In the example above we suppose you will store the ``id`` that's unique to the payment in your order table. This way
your website is able to look-up the order for this payment when the webhook is triggered by Mollie. Your website is
keeping track of the payment, effectively bringing about the connection between order and payment. This approach is
easiest to grasp, which is why we use it in our example.

Alternatively you could ask Mollie to remember the unique identifier of your order by instructing the Mollie API to
store it in the payment's ``metadata``. You would provide it while creating the payment. In our example ``order_id``
would be a good candidate. Mollie stores the metadata for you, when you fetch the payment during processing the webhook
the metadata is included in the response. This is another way to connect orders and payments. We advise to use the
``metadata`` approach. This is the most popular approach and it's easiest to implement.
