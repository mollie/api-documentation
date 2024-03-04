Test your point-of-sale integration
===================================
.. note:: Point-of-sale is currently in beta. If you are interested in offering point-of-sale payments, please see
   `this page <https://www.mollie.com/products/payments-terminal>`_ for more information on our product offering. Once
   there, you can register your interest to be kept up-to-date.

As explained in our guide on :doc:`Testing the Mollie API </overview/testing>`, you can use test mode to ensure your
integration works as expected, before rolling it out to your customers.

We offer the same functionality for our point-of-sale offering, by supporting `test mode` for the
:doc:`Terminals API </reference/v2/terminals-api/overview>` as well. You can use a `test mode` terminal in combination
with a `test mode` payment to walk through the payment process. Therefore, it is not required to purchase a terminal in
order to integrate our point-of-sale solution.

Setting up a test mode terminal
-------------------------------
In order to set up a test mode terminal, you will only have to enable the point-of-sale payment method. A test mode
terminal will then be created for you automatically.

As described in the :doc:`point-of-sale payments guide </point-of-sale/overview>`, you will need to provide the terminal
ID of a terminal in order to create a point-of-sale payment. You can retrieve the terminal ID of the test mode terminal
by calling the :doc:`List Terminals endpoint </reference/v2/terminals-api/list-terminals>` with your test mode
credentials. This would either be your test API key or an organization or app access token while passing the
``testmode`` parameter with value ``true``.

Creating a test mode payment
----------------------------
Now that you have the terminal ID of the test mode terminal, you can create a test mode point-of-sale payment by
calling the :doc:`Create Payment endpoint </reference/v2/payments-api/create-payment>` with your test credentials and
by passing ``pointofsale`` as the payment method and the terminal ID as the ``terminalId`` parameter. For example:

.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d "amount[currency]=EUR" \
       -d "amount[value]=10.00" \
       -d "description=My first in-person payment" \
       -d "redirectUrl=https://cash-register.example.org/order/12345/" \
       -d "webhookUrl=https://cash-register.example.org/payments/webhook/" \
       -d "method=pointofsale" \
       -d "terminalId=term_7MgL4wea46qkRcoTZjWEH"

Since the payment will not actually be shown on a terminal device, the response contains a ``changePaymentState`` URL,
which allows you to set the final payment state. You can try out different payment statuses and see whether your
integration handles it correctly.
