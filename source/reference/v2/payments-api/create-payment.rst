Create payment
==============
.. api-name:: Payments API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/payments

.. authentication::
   :api_keys: true
   :oauth: true

Payment creation is elemental to the Mollie API: this is where most payment implementations start off.

Once you have created a payment, you should redirect your customer to the URL in the ``_links.checkout`` property from
the response.

To wrap your head around the payment process, an explanation and flow charts can be found in the
:doc:`Payments API Overview </payments/overview>`.

.. note::
   :ref:`Optional parameters<payment-method-specific-parameters>` are accepted for certain payment methods.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``amount``

       .. type:: amount object
          :required: true

     - The amount that you want to charge, e.g. ``{"currency":"EUR", "value":"100.00"}`` if you would want to charge
       €100.00.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string
                 :required: true

            - An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. The currencies supported depend on
              the payment methods that are enabled on your account.

          * - ``value``

              .. type:: string
                 :required: true

            - A string containing the exact amount you want to charge in the given currency. Make sure to send the right
              amount of decimals. Non-string values are not accepted.

   * - ``description``

       .. type:: string
          :required: true

     - The description of the payment you're creating. This will be shown to your customer on their card or bank
       statement when possible. We truncate the description automatically according to the limits of the used payment
       method. The description is also visible in any exports you generate.

       We recommend you use a unique identifier so that you can always link the payment to the order in your back
       office. This is particularly useful for bookkeeping.

   * - ``redirectUrl``

       .. type:: string
          :required: true

     - The URL your customer will be redirected to after the payment process. It could make sense for the
       ``redirectUrl`` to contain a unique identifier – like your order ID – so you can show the right page referencing
       the order when your customer returns.

       .. note::
          For payments with ``sequenceType`` ``recurring``, you can skip this parameter. For all other payments, this
          parameter is required.

   * - ``webhookUrl``

       .. type:: string
          :required: false

     - Set the webhook URL, where we will send payment status updates to.

       .. note:: The ``webhookUrl`` is optional, but without a webhook you will miss out on important
          :doc:`status changes </guides/webhooks>` to your payment.

          The ``webhookUrl`` must be reachable from Mollie's point of view, so you cannot use ``localhost``. If
          you want to use webhook during development on ``localhost``, you must use a tool like
          `ngrok <https://lornajane.net/posts/2015/test-incoming-webhooks-locally-with-ngrok>`_ to have the webhooks
          delivered to your local machine.

   * - ``locale``

       .. type:: string
          :required: false

     - Allows you to preset the language to be used in the hosted payment pages shown to the consumer. Setting a
       locale is highly recommended and will greatly improve your conversion rate. When this parameter is omitted, the
       browser language will be used instead if supported by the payment method. You can provide any ISO 15897 locale,
       but our hosted payment pages currently only support the following languages:

       Possible values: ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
       ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV``
       ``lt_LT``

   * - ``method``

       .. type:: string
          :required: false

     - Normally, a payment method selection screen is shown. However, when using this parameter, your
       customer will skip the selection screen and will be sent directly to the chosen payment method. The parameter
       enables you to fully integrate the payment method selection into your website, however note Mollie's country
       based conversion optimization is lost.

       Possible values: ``bancontact`` ``banktransfer`` ``belfius`` ``bitcoin`` ``creditcard`` ``directdebit`` ``eps``
       ``giftcard`` ``giropay`` ``ideal`` ``inghomepay`` ``kbc``  ``paypal`` ``paysafecard`` ``sofort``

       .. note:: If you are looking to create payments with the Klarna Pay later or Klarna Slice it payment methods,
                 please use the :doc:`Create Order API </reference/v2/orders-api/create-order>` instead.

   * - ``metadata``

       .. type:: mixed
          :required: false

     - Provide any data you like, for example a string or a JSON object. We will save the data alongside the
       payment. Whenever you fetch the payment with our API, we'll also include the metadata. You can use up to
       approximately 1kB.

   * - ``sequenceType``

       .. type:: string
          :required: false

     - Indicate which type of payment this is in a recurring sequence. If set to ``first``, a
       :ref:`first payment <payments/recurring/first-payment>` is created for the customer, allowing the customer to
       agree to automatic recurring charges taking place on their account in the future. If set to ``recurring``, the
       customer's card is charged automatically.

       Defaults to ``oneoff``, which is a regular non-recurring payment (see also:
       :doc:`Recurring </payments/recurring>`).

       Possible values: ``oneoff`` ``first`` ``recurring``

   * - ``customerId``

       .. type:: string
          :required: false

     - The ID of the :doc:`Customer </reference/v2/customers-api/get-customer>` for whom the payment is being created.
       This is used for :doc:`recurring payments </payments/recurring>` and
       :doc:`single click payments </guides/checkout>`.

   * - ``mandateId``

       .. type:: string
          :required: false

     - When creating recurring payments, the ID of a specific :doc:`Mandate </reference/v2/mandates-api/get-mandate>`
       may be supplied to indicate which of the consumer's accounts should be credited.

.. _payment-method-specific-parameters:

Payment method specific parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you specify the ``method`` parameter, optional parameters may be available for the payment method. If no method is
specified, you can still send the optional parameters and we will apply them when the consumer selects the relevant
payment method.

Bank transfer
"""""""""""""
.. list-table::
   :widths: auto

   * - ``billingEmail``

       .. type:: string
          :required: false

     - Consumer's email address, to automatically send the bank transfer details to. **Please note:** the
       payment instructions will be sent immediately when creating the payment. If you don't specify the ``locale``
       parameter, the email will be sent in English, as we haven't yet been able to detect the consumer's browser
       language.

   * - ``dueDate``

       .. type:: string
          :required: false

     - The date the payment should :doc:`expire </payments/status-changes>`, in ``YYYY-MM-DD`` format.
       **Please note:** the minimum date is tomorrow and the maximum date is 100 days after tomorrow.

   * - ``locale``

       .. type:: string
          :required: false

     - The locale will determine the target bank account the customer has to transfer the money to. We have dedicated
       bank accounts for Belgium, France, Germany and The Netherlands. Having the customer use a local bank account
       greatly increases the conversion and speed of payment.

       Possible values: ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
       ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV``
       ``lt_LT``

Bitcoin
"""""""
.. list-table::
   :widths: auto

   * - ``billingEmail``

       .. type:: string
          :required: false

     - The email address of the customer. This is used when handling invalid transactions (wrong amount
       transferred, transfer of expired or canceled payments, et cetera).

Credit card
"""""""""""
.. list-table::
   :widths: auto

   * - ``billingAddress``

       .. type:: address object
          :required: false

     - The card holder's address details. We advise to provide these details to improve the credit card fraud
       protection, and thus improve conversion.

       The following fields can be added to the object:

       .. list-table::
          :widths: auto

          * - ``streetAndNumber``

              .. type:: string
                 :required: false

            - The card holder's street and street number.

          * - ``postalCode``

              .. type:: string
                 :required: false

            - The card holder's postal code.

          * - ``city``

              .. type:: string
                 :required: false

            - The card holder's city.

          * - ``region``

              .. type:: string
                 :required: false

            - The card holder's region.

          * - ``country``

              .. type:: string
                 :required: false

            - The card holder's country in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_
              format.

       Please refer to the documentation of the :ref:`address object <address-object>`
       for more information on which inputs are accepted inputs.

   * - ``shippingAddress``

       .. type:: address object
          :required: false

     - The shipping address details. We advise to provide these details to improve the credit card fraud
       protection, and thus improve conversion.

       The following fields can be added to the object:

       .. list-table::
          :widths: auto

          * - ``streetAndNumber``

              .. type:: string
                 :required: false

            - The street and street number of the shipping address.

          * - ``postalCode``

              .. type:: string
                 :required: false

            - The postal code of the shipping address.

          * - ``city``

              .. type:: string
                 :required: false

            - The city of the shipping address.

          * - ``region``

              .. type:: string
                 :required: false

            - The region of the shipping address.

          * - ``country``

              .. type:: string
                 :required: false

            - The country of the shipping address in
              `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format.

       Please refer to the documentation of the :ref:`address object <address-object>`
       for more information on which inputs are accepted inputs.

Gift cards
""""""""""
.. list-table::
   :widths: auto

   * - ``issuer``

       .. type:: string
          :required: false

     - The gift card brand to use for the payment. These issuers can be retrieved by using
       the ``issuers`` :ref:`include in the Methods API <method-includes>`. If you need a brand not in the list, contact
       our support department. We can also support closed-loop cards.

       If only one issuer is activated on your account, you can omit this parameter.

       Possible values: ``nationalebioscoopbon`` ``nationaleentertainmentcard`` ``kunstencultuurcadeaukaart``
       ``podiumcadeaukaart`` ``vvvgiftcard`` ``webshopgiftcard`` ``yourgift``

   * - ``voucherNumber``

       .. type:: string
          :required: false

     - The card number on the gift card.

   * - ``voucherPin``

       .. type:: string
          :required: false

     - The PIN code on the gift card. Only required if there is a PIN code printed on the gift card.

iDEAL
"""""
.. list-table::
   :widths: auto

   * - ``issuer``

       .. type:: string
          :required: false

     - An iDEAL issuer ID, for example ``ideal_INGBNL2A``. The returned payment URL will deep-link into the
       specific banking website (ING Bank, in this example). The full list of issuers can be retrieved via the
       :ref:`Methods API <method-includes>` by using the optional ``issuers`` include.

KBC/CBC Payment Button
""""""""""""""""""""""
.. list-table::
   :widths: auto

   * - ``description``

       .. type:: string
          :required: true

     - When KBC/CBC is chosen as the payment method, the description will be truncated to 13 characters.

   * - ``issuer``

       .. type:: string
          :required: false

     - The issuer to use for the KBC/CBC payment.The full list of issuers can be retrieved via the
       :ref:`Methods API <method-includes>` by using the optional ``issuers`` include.

       Possible values: ``kbc`` ``cbc``

.. _paypal-method-details:

PayPal
""""""
.. list-table::
   :widths: auto

   * - ``description``

       .. type:: string
          :required: true

     - If a description in the form ``Order <order number>`` is used, the order number is passed to PayPal as the
       *invoice reference*. This field is searchable in the PayPal merchant dashboard. Alternatively, we will recognize
       the following keywords:

       - Cart
       - Order
       - Invoice
       - Payment

   * - ``shippingAddress``

       .. type:: address object
          :required: false

     - The shipping address details. We advise to provide these details to improve PayPal's fraud
       protection, and thus improve conversion.

       The following fields can be added to the object:

       .. list-table::
          :widths: auto

          * - ``streetAndNumber``

              .. type:: string
                 :required: false

            - The street and street number of the shipping address. The maximum character length is 128.

          * - ``postalCode``

              .. type:: string
                 :required: false

            - The postal code of the shipping address. The maximum character length is 20.

          * - ``city``

              .. type:: string
                 :required: false

            - The city of the shipping address. The maximum character length is 100.

          * - ``region``

              .. type:: string
                 :required: false

            - The region of the shipping address. The maximum character length is 100.
              **Please note**: this field is required if ``country`` is one of the following countries:
              ``AR`` ``BR`` ``CA`` ``CN`` ``ID`` ``IN`` ``JP`` ``MX`` ``TH`` ``US``

          * - ``country``

              .. type:: string
                 :required: false

            - The country of the shipping address in
              `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format.

       Please refer to the documentation of the :ref:`address object <address-object>`
       for more information on which inputs are accepted inputs.

paysafecard
"""""""""""
.. list-table::
   :widths: auto

   * - ``customerReference``

       .. type:: string
          :required: false

     - Used for consumer identification. For example, you could use the consumer's IP address.

SEPA Direct Debit
"""""""""""""""""
.. note::
    One-off SEPA Direct Debit payments using Mollie Checkout can only be created if this is enabled on your account. In
    general, it is not very useful for webshops but may be useful for charities.
    
    Please contact our support department at info@mollie.com to enable this.

    If you want to use recurring payments, take a look at our :doc:`Recurring payments guide </payments/recurring>`.

.. list-table::
   :widths: auto

   * - ``consumerName``

       .. type:: string
          :required: false

     - Beneficiary name of the account holder. Only available if one-off payments are enabled on your
       account. Will pre-fill the beneficiary name in the checkout screen if present.

   * - ``consumerAccount``

       .. type:: string
          :required: false

     - IBAN of the account holder. Only available if one-off payments are enabled on your account. Will
       pre-fill the IBAN in the checkout screen if present.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the only mandatory extra parameter is the
``profileId`` parameter. With it, you can specify which profile the payment belongs to. Organizations can have multiple
profiles for each of their websites. See :doc:`Profiles API </reference/v2/profiles-api/get-profile>` for more
information.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: true

     - The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``. This field is mandatory.

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to make this payment a test payment.

   * - ``applicationFee``

       .. type:: object
          :required: false

     - Adding an :doc:`application fee </oauth/application-fees>` allows you to charge the merchant a small sum for the
       payment and transfer this to your own account.

       .. list-table::
          :widths: auto

          * - ``amount``

              .. type:: amount object
                 :required: true

            - The amount in that the app wants to charge, e.g. ``{"currency":"EUR", "value":"10.00"}`` if the app would
              want to charge €10.00.

              .. list-table::
                 :widths: auto

                 * - ``currency``

                     .. type:: string
                        :required: true

                   - An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

                 * - ``value``

                     .. type:: string
                        :required: true

                   - A string containing the exact amount you want to charge in the given currency. Make sure to send
                     the right amount of decimals. Non-string values are not accepted.

          * - ``description``

              .. type:: string
                 :required: true

            - The description of the application fee. This will appear on settlement reports to the merchant and to you.

QR codes
^^^^^^^^
To create a payment with a QR code embedded in the API response, call the API endpoint with an
include request for ``details.qrCode`` in the query string:

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/payments?include=details.qrCode

QR codes can be generated for iDEAL, Bitcoin, Bancontact and bank transfer payments.

Refer to the :doc:`Get payment </reference/v2/payments-api/get-payment>` reference to see what the API response looks
like when the QR code is included.

Response
--------
``201`` ``application/hal+json; charset=utf-8``

A payment object is returned, as described in :doc:`Get payment </reference/v2/payments-api/get-payment>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v2/payments \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d "amount[currency]=EUR" \
       -d "amount[value]=10.00" \
       -d "description=Order #12345" \
       -d "redirectUrl=https://webshop.example.org/order/12345/" \
       -d "webhookUrl=https://webshop.example.org/payments/webhook/" \
       -d "metadata={\"order_id\": \"12345\"}"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
    $payment = $mollie->payments->create([
      "amount" => [
          "currency" => "EUR",
          "value" => "10.00" // You must send the correct number of decimals, thus we enforce the use of strings
      ],
      "description" => "My first payment",
      "redirectUrl" => "https://webshop.example.org/order/12345/",
      "webhookUrl" => "https://webshop.example.org/payments/webhook/",
      "metadata" => [
          "order_id" => "12345",
      ],
    ]);

Response
^^^^^^^^
.. code-block:: http
   :linenos:

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
       "description": "Order #12345",
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
               "href": "https://docs.mollie.com/reference/v2/payments-api/create-payment",
               "type": "text/html"
           }
       }
   }
