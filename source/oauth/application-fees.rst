Application fees
================
With **Application fees**, you can split a payment between a platform and connected merchant accounts.

An example use case is a ticketing platform that charges a fee per successful payment to each connected theatre. In this
case, each theatre has an account with Mollie with the ticketing platform's OAuth app authorized to create payments on
their behalf.

The ticketing platform can add an application fee to each payment. When the payment is successful, the fee specified in
the application fee is transferred from the theatre's account to the platforms account.

Mollie will then collect and settle the application fees to the ticketing platform.

.. note:: As Mollie only handles the money and does not provide any services to the theaters, the ticketing platform is
   responsible for invoicing the theatres and handling VAT.

Enabling application fees
-------------------------
In order to enable charging application fees with your app, you must first register to become an app developer. This can
be done from the `Dashboard <https://www.mollie.com/dashboard/developers/applications>`_. Then,
`contact <https://www.mollie.com/en/contact/>`_ our support department to have charging application fees on your account
enabled.

How to create an application fee
--------------------------------
One-off application fees can be created on Payments or Orders. Application fees can also be set on Subscriptions, in
which case the application fee will be added to *each Payment* created for the Subscription.

They are created by passing additional parameters to the
:doc:`/reference/v2/payments-api/create-payment`,
:doc:`/reference/v2/orders-api/create-order` or the
:doc:`/reference/v2/subscriptions-api/create-subscription`:

.. list-table::
   :widths: auto

   * - ``applicationFee``

       .. type:: object
          :required: false

     - Adding an application fee allows you to charge the merchant for the payment and transfer this to your
       own account. The application fee is deducted from the payment.

       .. list-table::
          :widths: auto

          * - ``amount``

              .. type:: amount object
                 :required: true

            - The amount the app wants to charge, e.g. ``{"currency":"EUR", "value":"10.00"}`` if the app would want to
              charge €10.00. Read more about :ref:`maximum application fees <max-application-fees>`.

              .. list-table::
                 :widths: auto

                 * - ``currency``

                     .. type:: string
                        :required: true

                   - An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. For application fees, this
                     must always be ``EUR`` regardless of the currency of the payment, order or subscription.

                 * - ``value``

                     .. type:: string
                        :required: true

                   - A string containing the exact amount you want to charge in the given currency. Make sure to send
                     the right amount of decimals. Non-string values are not accepted.

          * - ``description``

              .. type:: string
                 :required: true

            - The description of the application fee. This will appear on settlement reports to the merchant and to you.

              The maximum length is 255 characters.

Testing application fees
------------------------
Application fees work in test mode as well.

You cannot use application fees with the same organization on which you created the oAuth application.
In order to test or use application fees, you need another organization.

.. _max-application-fees:

Maximum application fees
------------------------
|
| *Payments API*
|
| The maximum application fee per payment is the amount of the payment - (1.21 × (0.29 + (0.05 × the amount of the
| payment))). The minimum is €0.01.
|
| *Orders API*
|
| The maximum application fee per payment is 10% of the total amount, up to a maximum of €2.00. If a higher maximum is
| required for your business, you can request this via Mollie's `customer service <https://www.mollie.com/contact/>`_ or
| your account manager at Mollie.

Recurring
-------------
Application fees are both supported on recurring payment and on subscriptions.

Multicurrency
-------------
Application fees are supported on all payments regardless of :doc:`currency </payments/multicurrency>`. However, the
application fee itself must always be created in ``EUR``. For example, you can charge a €1.00 application fee on a
US$10.00 payment.
