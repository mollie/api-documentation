.. _v2/payments-create:

Payments API v2: Create payment
===============================

.. container:: endpoint

  ``POST`` ``https://api.mollie.com/v2/payments``

.. container:: authentication

  Authentication: :ref:`API keys <guides/authentication>` :ref:`OAuth access tokens <oauth/overview>`

Payment creation is elemental to the Mollie API: this is where most payment implementations start off. Note optional
parameters are accepted for certain payment methods.

To wrap your head around the payment process, an explanation and flow charts can be found in the
:ref:`Overview <overview>`.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``amount``

       .. container:: type

        object

       .. container:: required

        required

     - The amount that you want to charge, e.g. ``{"currency":"EUR", "value":"100.00"}`` if you would want to charge
       €100.00.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. container:: type

               string

            - An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. The currencies supported depend on
              the payment methods that are enabled on your account.

          * - ``value``

              .. container:: type

               string

            - A string containing the exact amount you want to charge in the given currency. Make sure to send the right
              amount of decimals. Non-string values are not accepted.

   * - ``description``

       .. container:: type

        string

       .. container:: optional

        optional

     - The description of the payment you're creating. This will be shown to the consumer on their card or bank
       statement when possible, and in any exports you generate.

       We recommend you use the order number so that you can always link the payment to the order. This is particularly
       useful for bookkeeping.

   * - | ``redirectUrl``
       | string
     - `The URL the customer will be redirected to after the payment process. It could make sense for the
       ``redirectUrl`` to contain a unique identifier – like your order ID – so you can show the right page referencing
       the order when your customer returns.

   * - | ``webhookUrl``
       | string
     - Set the webhook URL, where we will send payment status updates to.

       .. note:: The ``webhookUrl`` must be reachable from Mollie's point of view. If you want to use webhook during
          development on ``localhost``, you must use a tool like
          `ngrok <https://lornajane.net/posts/2015/test-incoming-webhooks-locally-with-ngrok>`_ to have the webhooks
          delivered to your local machine.

   * - | ``locale``
       | string
     - Optional – Allow you to preset the language to be used in the payment screens shown to the consumer. Setting a
       locale is highly recommended and will greatly improve your conversion rate. When this parameter is omitted, the
       browser language will be used instead if supported by the payment method. You can provide any ISO 15897 locale,
       but our payment screen currently only support the following languages:

       Possible values: ``en_US`` ``de_AT`` ``de_CH`` ``de_DE`` ``es_ES`` ``fr_BE`` ``fr_FR`` ``nl_BE`` ``nl_NL``

   * - | ``method``
       | string
     - Optional – Normally, a payment method selection screen is shown. However, when using this parameter, your
       customer will skip the selection screen and will be sent directly to the chosen payment method. The parameter
       enables you to fully integrate the payment method selection into your website, however note Mollie's country
       based conversion optimization is lost.

       Possible values: ``banktransfer`` ``belfius`` ``bitcoin`` ``creditcard`` ``directdebit`` ``giftcard`` ``ideal``
       ``inghomepay`` ``kbc`` ``mistercash`` ``paypal`` ``paysafecard`` ``sofort``

   * - | ``metadata``
       | mixed
     - Optional – Provide any data you like, for example a string or a JSON object. We will save the data alongside the
       payment. Whenever you fetch the payment with our API, we'll also include the metadata. You can use up to
       approximately 1kB.

   * - | ``sequenceType``
       | string
     - Optional – Indicate which type of payment this is in a recurring sequence. If set to ``first``, a
       :ref:`first payment <guides/recurring/first-payment>` is created for the customer, allowing the customer to agree
       to automatic recurring charges taking place on their account in the future. If set to ``recurring``, the
       customer's card is charged automatically.

       Defaults to ``oneoff``, which is a regular non-:ref:`recurring payment <guides/recurring>`.

       Possible values: ``oneoff`` ``first`` ``recurring``

   * - | ``customerId``
       | string
     - Optional – The ID of the :ref:`Customer <v1/customers-create>` for whom the payment is being created. This is
       used for :ref:`recurring payments <guides/recurring>` and :ref:`single click payments <guides/checkout>`.

   * - | ``mandateId``
       | string
     - Optional – When creating recurring payments, the ID of a specific :ref:`Mandate <v1/mandates-create>` may be
       supplied to indicate which of the consumer's accounts should be credited.

Payment method specific parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you specify the ``method`` parameter, optional parameters may be available for the payment method. If no method is
specified, you can still send the optional parameters and we will apply them when the consumer selects the relevant
payment method.

Bank transfer
"""""""""""""
.. list-table::
   :widths: auto

   * - | ``billingEmail``
       | string
     - Optional – Consumer's email address, to automatically send the bank transfer details to. **Please note:** the
       payment instructions will be sent immediately when creating the payment. If you don't specify the ``locale``
       parameter, the email will be sent in English, as we haven't yet been able to detect the consumer's browser
       language.

   * - | ``dueDate``
       | string
     - Optional - The date the payment should :ref:`expire <guides/payment-status-changes>`, in ``YYYY-MM-DD`` format.
       **Please note:** the minimum date is tomorrow and the maximum date is 100 days after tomorrow.

   * - | ``locale``
       | string
     - Optional – The locale will determine the target bank account the customer has to transfer the money to. We have
       dedicated bank accounts for Belgium, France, Germany and The Netherlands. Having the customer use a local bank
       account greatly increases the conversion and speed of payment.

       Possible values: ``en_US`` ``de_AT`` ``de_CH`` ``de_DE`` ``es_ES`` ``fr_BE`` ``fr_FR`` ``nl_BE`` ``nl_NL``

Bitcoin
"""""""
.. list-table::
   :widths: auto

   * - | ``billingEmail``
       | string
     - Optional – The email address of the customer. This is used when handling invalid transactions (wrong amount
       transferred, transfer of expired or canceled payments, et cetera).

Credit card
"""""""""""
.. list-table::
   :widths: auto

   * - | ``billingAddress``
       | address object
     - Optional – The card holder's address details. We advise to provide these details to improve the credit card fraud
       protection, and thus improve conversion.

       The following fields can be added to the object:

       .. list-table::
          :widths: auto

          * - | ``streetAndNumber``
              | string
            - Optional – The card holder's street and street number.

          * - | ``postalCode``
              | string
            - Optional – The card holder's postal code.

          * - | ``city``
              | string
            - Optional – The card holder's city.

          * - | ``region``
              | string
            - Optional – The card holder's region.

          * - | ``country``
              | string
            - Optional – The card holder's country in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format.

       Please refer to the documentation of the :ref:`address object <address-object>`
       for more information on which inputs are accepted inputs.

   * - | ``shippingAddress``
       | address object
     - Optional – The shipping address details. We advise to provide these details to improve the credit card fraud
       protection, and thus improve conversion.

       The following fields can be added to the object:

       .. list-table::
          :widths: auto

          * - | ``streetAndNumber``
              | string
            - Optional – The street and street number of the shipping address.

          * - | ``postalCode``
              | string
            - Optional – The postal code of the shipping address.

          * - | ``city``
              | string
            - Optional – The city of the shipping address.

          * - | ``region``
              | string
            - Optional – The region of the shipping address.

          * - | ``country``
              | string
            - Optional – The country of the shipping address in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format.

       Please refer to the documentation of the :ref:`address object <address-object>`
       for more information on which inputs are accepted inputs.

Gift cards
""""""""""
.. list-table::
   :widths: auto

   * - | ``issuer``
       | string
     - Optional – The gift card brand to use for the payment. These issuers are not dynamically available through the
       Issuers API, but can be retrieved by using the ``issuers`` include in the Methods API. If you need a brand not in
       the list, contact our support department. If only one issuer is activated on your account, you can omit this
       parameter.

       Possible values: ``nationalebioscoopbon`` ``nationaleentertainmentcard`` ``kunstencultuurcadeaukaart``
       ``podiumcadeaukaart`` ``vvvgiftcard`` ``webshopgiftcard`` ``yourgift``

   * - | ``voucherNumber``
       | string
     - Optional – The card number on the gift card.

   * - | ``voucherPin``
       | string
     - Optional – The PIN code on the gift card. Only required if there is a PIN code printed on the gift card.

iDEAL
"""""
.. list-table::
   :widths: auto

   * - | ``issuer``
       | string
     - Optional – An iDEAL issuer ID, for example ``ideal_INGBNL2A``. The returned payment URL will deep-link into the
       specific banking website (ING Bank, in this example). The full list of issuers can be retrieved via the
       :ref:`Issuers API <v1/issuers-list>`.

KBC/CBC Payment Button
""""""""""""""""""""""
.. list-table::
   :widths: auto

   * - | ``description``
       | string
     - When KBC/CBC is chosen as the payment method, the description will be truncated to 13 characters.

   * - | ``issuer``
       | string
     - Optional – The issuer to use for the KBC/CBC payment. These issuers are not dynamically available through the
       Issuers API, but can be retrieved by using the ``issuers`` include in the Methods API.

       Possible values: ``kbc`` ``cbc``

PayPal
""""""
.. list-table::
   :widths: auto

   * - | ``shippingAddress``
       | address object
     - Optional – The shipping address details. We advise to provide these details to improve PayPal's fraud
       protection, and thus improve conversion.

       The following fields can be added to the object:

       .. list-table::
          :widths: auto

          * - | ``streetAndNumber``
              | string
            - Optional – The street and street number of the shipping address. The maximum character length is 128.

          * - | ``postalCode``
              | string
            - Optional – The postal code of the shipping address. The maximum character length is 20.

          * - | ``city``
              | string
            - Optional – The city of the shipping address. The maximum character length is 100.

          * - | ``region``
              | string
            - Optional – The region of the shipping address. The maximum character length is 100.
              **Please note**: this field is required if ``country`` is one of the following countries:
              ``AR`` ``BR`` ``CA`` ``CN`` ``ID`` ``IN`` ``JP`` ``MX`` ``TH`` ``US``

          * - | ``country``
              | string
            - Optional – The country of the shipping address in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format.

       Please refer to the documentation of the :ref:`address object <address-object>`
       for more information on which inputs are accepted inputs.

paysafecard
"""""""""""
.. list-table::
   :widths: auto

   * - | ``customerReference``
       | string
     - Optional – Used for consumer identification. For example, you could use the consumer's IP address.

SEPA Direct Debit
"""""""""""""""""
.. note::
    One-off SEPA Direct Debit payments using Mollie Checkout can only be created if this is enabled on your account. In
    general, it is not very useful for web shops but may be useful for charities.

    If you want to use recurring payments, take a look at our :ref:`Recurring payments guide <guides/recurring>`.

.. list-table::
   :widths: auto

   * - | ``consumerName``
       | string
     - Optional - Beneficiary name of the account holder. Only available if one-off payments are enabled on your
       account. Will pre-fill the beneficiary name in the checkout screen if present.

   * - | ``consumerAccount``
       | string
     - Optional - IBAN of the account holder. Only available if one-off payments are enabled on your account. Will
       pre-fill the IBAN in the checkout screen if present.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with Mollie Connect/OAuth, the only mandatory extra parameter is the ``profileId`` parameter.
With it, you can specify which profile the payment belongs to. Organizations can have multiple profiles for each of
their websites. See :ref:`Profiles API <v1/profiles-get>` for more information.

.. list-table::
   :widths: auto

   * - | ``profileId``
       | string
     - The payment profile's unique identifier, for example ``pfl_3RkSN1zuPE``. This field is mandatory.

   * - | ``testmode``
       | boolean
     - Optional – Set this to ``true`` to make this payment a test payment.

   * - | ``applicationFee``
       | object
     - Optional – Adding an :ref:`application fee <oauth/applicationfees>` allows you to charge the merchant a small sum
       for the payment and transfer this to your own account.

       .. list-table::
          :widths: auto

          * - | ``amount``
              | amount object
            - The amount in that the app wants to charge, e.g. ``{"currency":"EUR", "value":"10.00"}}`` if the app would
              want to charge €10.00.

              .. list-table::
                 :widths: auto

                 * - | ``currency``
                     | string
                   - An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

                 * - | ``value``
                     | string
                   - A string containing the exact amount you want to charge in the given currency. Make sure to send
                     the right amount of decimals. Non-string values are not accepted.

          * - | ``description``
              | string
            - The description of the application fee. This will appear on settlement reports to the merchant and to you.

QR codes
^^^^^^^^
To create a payment with a QR code embedded in the API response, call the API endpoint with an
include request for ``details.qrCode`` in the query string:

``POST https://api.mollie.com/v2/payments?include=details.qrCode``

QR codes can be generated for iDEAL, Bitcoin, Bancontact and bank transfer payments.

Refer to the :ref:`Get payment <v2/payments-get>` reference to see what the API response looks like when the QR code is
included.

Response
--------
``201`` ``application/hal+json; charset=utf-8``

A payment object is returned, as described in :ref:`Get payment <v2/payments-get>`.

Example
-------

Request
^^^^^^^
.. code-block:: bash

   curl -X POST https://api.mollie.com/v2/payments \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -H "Content-Type: application/json" \
       -d \
       "{
           \"amount\": {\"currency\":\"EUR\", \"value\":\"10.00\"},
           \"description\": \"My first payment\",
           \"redirectUrl\": \"https://webshop.example.org/order/12345/\",
           \"webhookUrl\": \"https://webshop.example.org/payments/webhook/\",
           \"metadata\": {\"order_id\": \"12345\"}
       }"

Response
^^^^^^^^
.. code-block:: http

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

   {
       "resource": "payment",
       "id": "tr_7UhSN1zuXS",
       "mode": "test",
       "createdAt": "2018-03-20T09:13:37+00:00",
       "amount": {
           "value": "10.00",
           "currency": "EUR"
       },
       "description": "My first payment",
       "method": null,
       "metadata": {
           "order_id": "12345"
       },
       "status": "open",
       "isCancelable": false,
       "expiresAt": "2018-03-20T09:28:37+00:00",
       "details": null,
       "profileId": "pfl_QkEhN94Ba",
       "sequenceType": "oneoff",
       "redirectUrl": "https://webshop.example.org/order/12345/",
       "webhookUrl": "https://webshop.example.org/payments/webhook/",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS",
               "type": "application/json"
           },
           "checkout": {
               "href": "https://www.mollie.com/payscreen/select-method/7UhSN1zuXS",
               "type": "text/html"
           },
           "documentation": {
               "href": "https://www.mollie.com/en/docs/reference/payments/create",
               "type": "text/html"
           }
       }
   }
