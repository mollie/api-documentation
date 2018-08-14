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
