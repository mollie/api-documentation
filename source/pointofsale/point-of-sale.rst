Point-of-sale payments
======================
.. note:: Point-of-sale is currently in beta. If you are interested in offering point-of-sale payments, please see
   `this page <https://www.mollie.com/products/payments-terminal>`_ for more information on our product offering. Once
   there, you can register your interest to be kept up-to-date.

With Mollie you can accept in-person card payments next to your online payments, neatly unifying both your online and
in-person presence. Mollie provides pre-certified card readers ('terminals') as well as fleet management tools via the
Mollie API and Mollie Dashboard.

A Mollie point-of-sale setup will typically simply consist of cashier software provided to you by one of our partners,
and terminals provided to you by Mollie. Please contact your account manager to discover the options that work best for
you.

For advanced users who want to integrate point-of-sale payments themselves, here is how it works. If you are looking to
test your integration without the need for a physical terminal, you can do so using :doc:`test mode </pointofsale/testing>`.

Receiving your first terminal
-----------------------------
To get started, you can request one or more terminal devices either via the Mollie Dashboard or via your account
manager.

You will be asked to give each terminal an alias. In return you will receive a 4-digit terminal passcode and a terminal ID for each device, for
example ``term_7MgL4wea46qkRcoTZjWEH``.

These terminals will show up in the :doc:`List terminals endpoint </reference/v2/terminals-api/list-terminals>` already with status ``requested``.

Setting up the terminal
^^^^^^^^^^^^^^^^^^^^^^^
Once you receive the device, you can simply turn it on. The terminal guides you through an onboarding process which
involves configuring network preferences. Make sure to see that the terminal status is "Ready to use".
Then, tap the "Start" button and you can start accepting payments.

.. image:: images/pos-ready-to-use-screen@2x.png
   :class: boxed-in-dark-mode

The terminal menu is protected by the 4-digit passcode shared with you when you received your terminal.

If you want to access the terminal menu again, tap three times on the Mollie screen and input your passcode.

Accepting payments
------------------
Once your device is set up, you can start accepting payments.

Simply call the :doc:`Create payment endpoint </reference/v2/payments-api/create-payment>` like you are used to, but in
this case provide ``pointofsale`` as the payment method, along with your terminal ID in the ``terminalId`` parameter.
For example:

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments \
       -H "Authorization: Bearer live_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d "amount[currency]=EUR" \
       -d "amount[value]=10.00" \
       -d "description=My first in-person payment" \
       -d "redirectUrl=https://cash-register.example.org/order/12345/" \
       -d "webhookUrl=https://cash-register.example.org/payments/webhook/" \
       -d "method=pointofsale" \
       -d "terminalId=term_7MgL4wea46qkRcoTZjWEH"

This will set up a €10,00 payment on the device. The device should display the transaction within seconds, and it will
ask you to present a card.

If you present a card and confirm the card PIN, the payment will be executed. If the payment succeeds, you will receive
a webhook of the ``paid`` status and the funds will be moved to your balance the same way as for online card payments.

To cancel the payment, simply press the cancel button on the device.

Webhooks
^^^^^^^^
Whether the payment succeeds, fails, or gets canceled, we will always send you a :doc:`webhook </overview/webhooks>`
once the payment reaches a final state. The webhook URL can be provided per payment, and works exactly the same way as
it does for online payments.

Refunds and chargebacks
-----------------------
Mollie provides refunds on point-of-sale payments exactly the same way as for any other payment method. Just look the
payment up in the Mollie Dashboard or mobile app and press the 'refund' button to start the process.

To perform a refund via our API, please refer to the
:doc:`Create refund endpoint </reference/v2/refunds-api/create-payment-refund>`.

In-person card payments carry a similar chargeback risk as online card payments do. If chargebacks come in, you will
receive a notification from us. They will also show up in the Mollie Dashboard, and can be accessed via the API using
the :doc:`List chargebacks endpoint </reference/v2/chargebacks-api/list-chargebacks>`.

Grouping terminals
------------------
The Mollie API is for a large part built on the concept of a payment profile. Larger merchants typically manage multiple
payment profiles: one for each domain name, for example. This allows them to have separate financial streams flow into a
single Mollie account. Each payment profile has its own set of :doc:`credentials </overview/authentication>` to accept
payments with.

For in-person payments, terminal devices are linked to payment profiles as well. Larger merchants can thus create
separate payment profiles to group terminals according to their needs. For example, merchants may want to have a payment
profile for each physical store.
