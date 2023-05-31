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
test your integration without the need for a physical terminal, you can do so using
:doc:`test mode </point-of-sale/testing>`.

Receiving your first terminal
-----------------------------
To get started, you can request one or more terminals either via the Mollie Dashboard or via your account manager.

Your terminal will have an alias and a 4-digit passcode, which will be provided to you.
In addition to this, each terminal has a unique identifier called 'terminal ID'. This ID will be used to create payments
for the specific terminal. For more information, check the 'Accepting payments' section below.

The terminal information can be retrieved via the
:doc:`List terminals v2 API</reference/v2/terminals-api/list-terminals>`. After requesting a terminal, its status will
be ``pending``, followed by an ``active`` status once it is ready to accept payments.

Terminals are linked to a specific payment profile. Larger merchants can thus create separate payment profiles
to group terminals according to their needs. For example, merchants may want to have a payment profile for each physical
store.

Setting up the terminal
^^^^^^^^^^^^^^^^^^^^^^^
Once you receive the terminal, you can simply turn it on. The terminal guides you through an onboarding process which
involves configuring network preferences. Make sure to see that the terminal status is "Ready to use".
Then, tap the "Start" button and you can start accepting payments.

.. image:: images/pos-ready-to-use-screen@2x.png
   :class: boxed-in-dark-mode

The terminal menu is protected by the 4-digit passcode shared with you when you received your terminal.

If you want to access the terminal menu again, tap three times on the Mollie screen and input your passcode.

Accepting payments
------------------
Once your terminal is turned on and connected to the internet, you can start accepting payments.

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

This will set up a €10,00 payment on the terminal. The device should display the transaction within seconds, and it will
ask you to present a card.

If you present a card and confirm the card PIN, the payment will be executed. If the payment succeeds, you will receive
a webhook about it and the funds will be moved to your balance the same way as for online card payments.

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

Chargebacks are less encountered for point-of-sale payments, as the card holder has to physically present the card
during payment. Point-of-sale chargebacks work in a similar way as the online card payments do. For more information,
check our `chargebacks article <https://help.mollie.com/hc/en-us/articles/115001470869>`_.
