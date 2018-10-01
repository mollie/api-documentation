Integrating gift cards
======================

Supported brands
----------------
Mollie supports processing gift cards handled by the Dutch giftcard broker Intersolve. At the moment, the following
brands are supported:

* `Nationale Bioscoopbon <https://www.bioscoopbon.nl/>`_
* `Nationale EntertainmentCard <https://www.nationale-entertainmentcard.nl/>`_
* `Nationale Kunst & Cultuur Cadeaukaart <https://www.kunstcultuurcadeaukaart.nl/>`_
* `Podium Cadeaukaart <https://www.podiumcadeaukaart.nl/>`_
* `VVV Cadeaukaart <https://www.vvvcadeaubonnen.nl/>`_
* `Webshop Giftcard <https://www.webshopgiftcard.nl/>`_
* `YourGift <https://www.yourgift.nl/>`_

If you need a different brand, please reach out to your account manager or our support department.

Using the :doc:`checkout </guides/checkout>`, your customer can pay part of the payment using gift cards and pay any
remaining amount due using the other payment methods enabled on your website profile.

Contracting and settlement
--------------------------
In contrast to other payment methods such as iDEAL or credit card, Mollie does not handle contracting and settlement on
your behalf. You will have to set up the contracting yourself via
`the brand owner <https://help.mollie.com/hc/en-us/articles/115004458349>`_. For example, for Podium Cadeaukaart contact
Stichting Promotie Theater- en Concertbezoek. The brand owner will ask for your PSPID, a unique identifier. You should
provide the brand owner with your `Mollie ID <https://help.mollie.com/hc/en-us/articles/210710049>`_ to use as the
PSPID.

If you already have a PSPID that you would like to reuse, contact your account manager at Mollie.

Once your account has been set up with the brand owner and you have enabled the gift card brand in the
`Mollie Dashboard <https://www.mollie.com/dashboard>`_, Mollie will automatically verify the set up with Intersolve and
enable the brand on your selected web site profiles once everything has been set up by the various parties involved.

Settlement is handled by the brand owner and not by Mollie.

Technical integration
---------------------
Integration is handled via the :doc:`Payments API </reference/v2/payments-api/create-payment>`. Several levels of
integration are possible.

Mollie supports stacking transactions, e.g. starting with a partial gift card payment and then finalizing the payment
using more gift cards or one of the other payment methods.

Integrate using Mollie Checkout
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The easiest way to integrate gift cards is to use the :doc:`Mollie Checkout </guides/checkout>`. This is arranged by
creating the payment via our API without passing the ``method`` parameter. Mollie will then display a list of payment
methods available for the payment and offer the gift card options enabled on your account.

Your customer can start the payment by redeeming their gift card. If the gift card only partially covers the amount due,
more gift cards can be entered in the checkout or a different payment method can be used to pay for the remaining
amount.

After the full amount has been paid by the customer, the customer is redirected back to your application as usual and we
will call your webhook.

Integrate method selection in your application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The selection for the gift card brand can be integrated in your own application as well. Using the
:doc:`Methods API </reference/v2/methods-api/list-methods>`, you can retrieve the methods and gift cards available on
your account. Use the include ``issuers`` to include the gift card brands available.

If only a single brand is available, the issuer is optional and we will use the available issuer.

.. note:: Each method has a minimum and a maximum amount that can be processed. For gift cards, you should ignore the
          maximum amount. The maximum amount visible for gift cards is per gift card transaction.

The ID for the gift cards method is ``giftcard``.

Integrate initial gift card payment in your application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Finally, Mollie offers the option to integrate the initial gift card payment in your application. You can provide the
customer with a form where they can enter their voucher number and the voucher PIN. These two fields can be passed
together with the ``method`` and ``issuer`` fields as ``voucherNumber`` and ``voucherPin``.

If the gift card covers the entire amount, the payment moves to the ``paid`` state immediately.

If there is any amount due remaining, the payment will be created in the open state and the ``redirectUrl`` will point
to the Mollie Checkout, where the customer can pick the next payment method (or another gift card) they would like to
use to finish the payment.

.. note:: Some cards don’t have a PIN printed on them. If the card does have a PIN, the PIN is always required.

Canceled and abandoned payments
-------------------------------
If the customer cancels or abandons the payment after partially paying with one or more gift cards, the amount paid with
the gift card will be returned to the gift card. This will show up as a refund in your
`Mollie Dashboard <https://www.mollie.com/dashboard>`_.

Refunds
-------
You cannot perform any gift card refunds. However, if another payment method was used during the checkout, you can
refund the payment paid with the other payment method (and optionally an additional part).

Tips
----
In most common integrations the Mollie Checkout is used when processing gift cards, so be sure to configure an
attractive wallpaper and logo for the checkout.
