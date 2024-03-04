Receiving application fees
==========================
An easy way to earn on a transaction is by charging an **Application fee** on any  incoming payments of a connected account.

In this set-up the connected account pays their own Mollie payment fees, receives a Mollie invoice, and remains liable for potential 
refunds and chargebacks. If you want to split a payment with another party, for instance if you are a marketplace, 
we offer :doc:`Split payments </connect/splitting-payments>`.

.. admonition::
      **Example**

      A ticketing platform wants to charge a fee per successful payment to each connected theatre. In this case, each theater has an account
      with Mollie, and they have the ticketing platform’s OAuth app authorized to create payments on their behalf.

      The ticketing platform can add an application fee to each payment. When the payment is successful, the fee specified in the application
      fee is automatically transferred from the theater’s account to the platform's account. 
      
      Note that the ticketing platform itself is responsible for invoicing the theatres for the incurred Application fees, and for handling VAT.

Enabling application fees
-------------------------
In order to be able to charge application fees with your app, you must first register to become an app developer. This can be
done from the `Dashboard <https://www.mollie.com/dashboard/developers/applications>`_. When you sign the developer agreement,
application fees will automatically be available.

How to create an application fee
--------------------------------
One-off application fees can be created on payments or orders. Application fees can also be set on Subscriptions, in
which case the application fee will be added to *each Payment* created for the subscription.

They are created by passing additional parameters to the
:doc:`Create payment </reference/v2/payments-api/create-payment>`,
:doc:`Create order </reference/v2/orders-api/create-order>`, or the
:doc:`Create subscription </reference/v2/subscriptions-api/create-subscription>` endpoint:

.. parameter:: applicationFee
   :type: object

   Adding an application fee allows you to charge the merchant for the payment and transfer this to your own account.
   The application fee is deducted from the payment.

   .. parameter:: amount
      :type: amount object
      :condition: required

      The amount the app wants to charge, e.g. ``{"currency":"EUR", "value":"10.00"}`` if the app would want to charge
      €10.00. Read more about :ref:`maximum application fees <max-application-fees>`.

      .. parameter:: currency
         :type: string
         :condition: required

         An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. For application fees, this must always
         be ``EUR`` regardless of the currency of the payment, order or subscription.

      .. parameter:: value
         :type: string
         :condition: required

         A string containing the exact amount you want to charge in the given currency. Make sure to send the right
         amount of decimals. Non-string values are not accepted.

   .. parameter:: description
      :type: string
      :condition: required

      The description of the application fee. This will appear on settlement reports to the merchant and to you.

      The maximum length is 255 characters.

Testing application fees
------------------------
You can submit the ``applicationFee`` parameter in test mode. 

The application fee will be visible in the payment details in the dashboard of the transaction owner. 
However, the application fee is not added to the balance if the payment was created in test mode. 
It is advisable to do test payments with application fees in a live environment to verify
the correct implementation of application fees.

You cannot use application fees with the same organization on which you created the oAuth application. In order to test 
or use application fees, you need to create another organization.


.. _max-application-fees:

Maximum application fees
------------------------

*Payments API*

Since Mollie usually also charges a fee on every payment, there is a limit to the maximum application fee amount.

The Mollie fee charged will depend on which method the consumer selects. To keep things simple however, we reserve 
€0,35 + 6% of the payment amount for us to be able to charge the Mollie fee.

This means the maximum can be calculated as follows:

Max application fee = amount of the payment - 0.35 + (0.06 × the amount of the payment)

.. admonition::
   **Example Calculation**

   The connected account of the ticket platforms has a payment of €10.-:

   Max application fee = €10 - (€0.35 + 0.06×€10) = €10 - €0.95 = €9.05

The minimum amount is €0.01.

*Orders API*

The maximum application fee per payment is 10% of the total amount, up to a maximum of €2.00. If a higher maximum is
required for your business, you can request this via Mollie's `customer service <https://www.mollie.com/contact>`_ or
your account manager at Mollie.

Multicurrency
-------------
Application fees are supported on all payments regardless of :doc:`currency </payments/multicurrency>`. However, 
the application fee itself must always be created in your primary currency (i.e. the currency balance that you 
have with Mollie.
For example, assuming you’d charge roughly 10%, you must charge a €1.00 application fee on a US$10.00 payment if
your primary balance is in euros. 
