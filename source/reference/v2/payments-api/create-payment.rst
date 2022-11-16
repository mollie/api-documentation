Create payment
==============
.. api-name:: Payments API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/payments

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Payment creation is elemental to the Mollie API: this is where most payment implementations start off.

Once you have created a payment, you should redirect your customer to the URL in the ``_links.checkout`` property from
the response.

To wrap your head around the payment process, an explanation and flow charts can be found in the
:doc:`Accepting payments guide </payments/accepting-payments>`.

.. note::
   :ref:`Optional parameters<payment-method-specific-parameters>` are accepted for certain payment methods.

Parameters
----------
.. parameter:: amount
   :type: amount object
   :condition: required

   The amount that you want to charge, e.g. ``{"currency":"EUR", "value":"1000.00"}`` if you would want to charge
   €1000.00.

   You can find the `minimum and maximum amounts <https://help.mollie.com/hc/en-us/articles/115000667365>`_ per payment
   method in our help center. Additionally, they can be retrieved using :doc:`/reference/v2/methods-api/get-method`.

   .. parameter:: currency
      :type: string
      :condition: required

      An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. The
      :doc:`currencies supported </payments/multicurrency>` depend on the payment methods that are enabled on your
      account.

   .. parameter:: value
      :type: string
      :condition: required

      A string containing the exact amount you want to charge in the given currency. Make sure to send the right amount
      of decimals and omit the thousands separator. Non-string values are not accepted.

.. parameter:: description
   :type: string
   :condition: required
   :collapse-children: true

   The description of the payment you are creating. This will be shown to your customer on their card or bank statement
   when possible. We truncate the description automatically according to the limits of the used payment method. The
   description is also visible in any exports you generate.

   We recommend you use a unique identifier so that you can always link the payment to the order in your back office.
   This is particularly useful for bookkeeping.

   The maximum length of the description field differs per payment method, with the absolute maximum being 255 characters.
   The API will not reject strings longer than the maximum length but it will truncate them to fit.

.. parameter:: redirectUrl
   :type: string
   :condition: required

   The URL your customer will be redirected to after the payment process.

   It could make sense for the ``redirectUrl`` to contain a unique identifier – like your order ID – so you can show the
   right page referencing the order when your customer returns.

   The parameter can be omitted for recurring payments (``sequenceType: recurring``) and for Apple Pay payments with an
   ``applePayPaymentToken``.

.. parameter:: webhookUrl
   :type: string
   :condition: optional

   Set the webhook URL, where we will send payment status updates to.

   The ``webhookUrl`` is optional, but without a webhook you will miss out on important
   :doc:`status changes </overview/webhooks>` to your payment.

   The ``webhookUrl`` must be reachable from Mollie's point of view, so you cannot use ``localhost``. If you want to use
   webhook during development on ``localhost``, you must use a tool like
   `ngrok <https://lornajane.net/posts/2015/test-incoming-webhooks-locally-with-ngrok>`_ to have the webhooks delivered
   to your local machine.

.. parameter:: locale
   :type: string
   :condition: optional

   .. _parameters_locale:

   Allows you to preset the language to be used in the hosted payment pages shown to the consumer. Setting a locale is
   highly recommended and will greatly improve your conversion rate. When this parameter is omitted, the browser
   language will be used instead if supported by the payment method. You can provide any ``xx_XX`` format ISO 15897
   locale, but our hosted payment pages currently only support the following languages:

   Possible values: ``en_US`` ``en_GB`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
   ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV`` ``lt_LT``

.. parameter:: method
   :type: string|array
   :condition: optional

   Normally, a payment method screen is shown. However, when using this parameter, you can choose a specific payment
   method and your customer will skip the selection screen and is sent directly to the chosen payment method. The
   parameter enables you to fully integrate the payment method selection into your website.

   You can also specify the methods in an array. By doing so we will still show the payment method selection screen but
   will only show the methods specified in the array. For example, you can use this functionality to only show payment
   methods from a specific country to your customer ``['bancontact', 'belfius']``.

   Possible values: ``applepay`` ``bancontact`` ``banktransfer`` ``belfius`` ``creditcard`` ``directdebit`` ``eps``
   ``giftcard`` ``giropay`` ``ideal`` ``kbc`` ``mybank``  ``paypal`` ``paysafecard`` ``przelewy24`` ``sofort``

   .. note:: If you are looking to create payments with the Klarna Pay now, Klarna Pay later, Klarna Slice it, in3 or
      voucher payment methods, please use :doc:`/reference/v2/orders-api/create-order` instead.

.. parameter:: restrictPaymentMethodsToCountry
   :type: string
   :condition: optional
   :collapse: true

   For digital goods in most jurisdictions, you must apply the VAT rate from your customer's country. Choose the VAT
   rates you have used for the order to ensure your customer's country matches the VAT country.

   Use this parameter to restrict the payment methods available to your customer to those from a single country.

   If available, the credit card method will still be offered, but only cards from the allowed country are accepted.

.. parameter:: metadata
   :type: mixed
   :condition: optional
   :collapse: true

   Provide any data you like, for example a string or a JSON object. We will save the data alongside the payment.
   Whenever you fetch the payment with our API, we will also include the metadata. You can use up to approximately 1kB.

Parameters for recurring payments
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Recurring payments are created through the Payments API by providing a ``sequenceType``. For the ``recurring`` sequence
type, you have to provide either a ``customerId`` or ``mandateId`` to indicate which account or card you want to charge.
See our guide on :doc:`Recurring </payments/recurring>` for more information.

.. parameter:: sequenceType
   :type: string
   :condition: required for recurring
   :collapse: true

   Indicate which type of payment this is in a recurring sequence. If set to ``first``, a
   :ref:`first payment <payments/recurring/first-payment>` is created for the customer, allowing the customer to agree
   to automatic recurring charges taking place on their account in the future. If set to ``recurring``, the customer's
   card is charged automatically.

   Defaults to ``oneoff``, which is a regular non-recurring payment.

   Possible values: ``oneoff`` ``first`` ``recurring``

   For PayPal payments, recurring is only possible if PayPal has activated Reference Transactions on your merchant
   account. Check if you account is eligible via our :doc:`Methods API </reference/v2/methods-api/list-methods>` with
   parameter ``sequenceType`` set to ``first``. Your account is eligible if PayPal is returned in the method list.

.. parameter:: customerId
   :type: string
   :condition: conditional
   :collapse: true

   The ID of the :doc:`customer </reference/v2/customers-api/get-customer>` for whom the payment is being created. This
   is used primarily for :doc:`recurring payments </payments/recurring>`, but can also be used on regular payments to
   enable :doc:`single-click payments </payments/hosted-checkout>`.

   Either this field or the ``mandateId`` field needs to be provided for payments with the ``recurring`` sequence type.

.. parameter:: mandateId
   :type: string
   :condition: conditional
   :collapse: true

   When creating recurring payments, the ID of a specific :doc:`mandate </reference/v2/mandates-api/get-mandate>` can be
   supplied to indicate which of the consumer's accounts should be credited.

   Either this field or the ``customerId`` field needs to be provided for payments with the ``recurring`` sequence type.

.. _payment-method-specific-parameters:

Payment method-specific parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you specify the ``method`` parameter, optional parameters may be available for the payment method. If no method is
specified, you can still send the optional parameters and we will apply them when the consumer selects the relevant
payment method.

Apple Pay
"""""""""
.. parameter:: applePayPaymentToken
   :type: string
   :condition: optional

   The `Apple Pay Payment Token
   <https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypayment/1916095-token>`_  object (encoded as
   JSON) that is part of the result of authorizing a payment request. The token contains the payment information needed
   to authorize the payment.

   The object should be passed encoded in a JSON string. Example:

   ``{"paymentData": {"version": "EC_v1", "data": "vK3BbrCbI/...."}}``

   For documentation on how to get this token, see :doc:`/wallets/applepay-direct-integration`.

Bank transfer
"""""""""""""
.. parameter:: billingEmail
   :type: string
   :condition: optional

   Consumer's email address, to automatically send the bank transfer details to. **Please note:** the payment
   instructions will be sent immediately when creating the payment. If you do not specify the ``locale`` parameter, the
   email will be sent in English, as we haven't yet been able to detect the consumer's browser language.

.. parameter:: dueDate
   :type: string
   :condition: optional

   The date the payment should :doc:`expire </payments/status-changes>`, in ``YYYY-MM-DD`` format. **Please note:** the
   minimum date is tomorrow and the maximum date is 100 days after tomorrow.

   After you created the payment, you can still update the ``dueDate`` via
   :doc:`/reference/v2/payments-api/update-payment`.

.. parameter:: locale
   :type: string
   :condition: optional

   For bank transfer payments specifically, the locale will determine the target bank account the customer has to
   transfer the money to. We have dedicated bank accounts for Belgium, Germany, and The Netherlands. Having the customer
   use a local bank account greatly increases the conversion and speed of payment.

   Possible values: ``en_US`` ``en_GB`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
   ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV`` ``lt_LT``

Credit card
"""""""""""
.. parameter:: billingAddress
   :type: address object
   :condition: optional

   The card holder's address details. We advise to provide these details to improve the credit card fraud protection,
   and thus improve conversion.

   If an address is provided, then the address has to be in a valid format. Please refer to the documentation of the
   :ref:`address object <address-object>` for more information on which formats are accepted.

   .. parameter:: streetAndNumber
      :type: string
      :condition: required

      The card holder's street and street number.

   .. parameter:: postalCode
      :type: string
      :condition: conditional

      The card holder's postal code. This field is required if the provided ``country`` has a postal code system.

   .. parameter:: city
      :type: string
      :condition: required

      The card holder's city.

   .. parameter:: region
      :type: string
      :condition: optional

      The card holder's region.

   .. parameter:: country
      :type: string
      :condition: required

      The card holder's country in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format.

.. parameter:: cardToken
   :type: string
   :condition: optional

   The card token you got from :doc:`Mollie Components </components/overview>`.  The token contains the card information
   (such as card holder, card number, and expiry date) needed to complete the payment.

.. parameter:: shippingAddress
   :type: address object
   :condition: optional

   The shipping address details. We advise to provide these details to improve the credit card fraud protection, and
   thus improve conversion.

   If an address is provided, then the address has to be in a valid format. Please refer to the documentation of the
   :ref:`address object <address-object>` for more information on which formats are accepted.

   .. parameter:: streetAndNumber
      :type: string
      :condition: required

      The street and street number of the shipping address.

   .. parameter:: postalCode
      :type: string
      :condition: conditional

      The postal code of the shipping address. This field is required if the provided ``country`` has a postal code
      system.

   .. parameter:: city
      :type: string
      :condition: required

      The city of the shipping address.

   .. parameter:: region
      :type: string
      :condition: optional

      The region of the shipping address.

   .. parameter:: country
      :type: string
      :condition: required

      The country of the shipping address in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_
      format.

Gift cards
""""""""""
.. parameter:: issuer
   :type: string
   :condition: optional

   The gift card brand to use for the payment. This is useful when you want to embed the gift card type selection on
   your own checkout screen. The issuers can be retrieved by using the ``issuers`` :ref:`include <method-includes>` in
   the Methods API.

   If you need a brand that is not in the list, contact our support department. We can also support closed-loop cards.

   Possible values: ``beautycadeaukaart`` ``bloemencadeaukaart`` ``bloemplantgiftcard`` ``boekenbon`` ``decadeaukaart``
   ``delokalecadeaukaart`` ``dinercadeau`` ``doenkadotickets`` ``fashioncheque`` ``festivalcadeau`` ``good4fun`` ``horseandgifts`` ``huistuincadeaukaart``
   ``jewelcard`` ``kluscadeau`` ``kunstencultuurcadeaukaart`` ``nationalebioscoopbon`` ``nationaleentertainmentcard``
   ``nationalegolfbon`` ``ohmygood`` ``podiumcadeaukaart`` ``reiscadeau`` ``restaurantcadeau`` ``shoesandsneakerscadeau``
   ``sodexosportculturepass`` ``sportenfitcadeau`` ``sustainablefashion`` ``travelcheq`` ``vvvgiftcard``
   ``vvvdinercheque`` ``vvvlekkerweg`` ``webshopgiftcard`` ``wijncadeaukaart`` ``yourgift``

.. parameter:: voucherNumber
   :type: string
   :condition: optional

   The card number on the gift card. You can supply this to prefill the card number.

.. parameter:: voucherPin
   :type: string
   :condition: optional

   The PIN code on the gift card. You can supply this to prefill the PIN, if the card has any.

iDEAL
"""""
.. parameter:: issuer
   :type: string
   :condition: optional

   An iDEAL issuer ID, for example ``ideal_INGBNL2A``. This is useful when you want to embed the issuer selection on
   your own checkout screen. When supplying an issuer ID, the returned payment URL will deep-link to the specific
   banking website (ING Bank, in this example). The full list of issuers can be retrieved via the
   :ref:`Methods API <method-includes>` by using the optional ``issuers`` include.

KBC/CBC Payment Button
""""""""""""""""""""""
.. parameter:: description
   :type: string
   :condition: optional

   For the KBC/CBC payment method the description will be truncated to 13 characters.

.. parameter:: issuer
   :type: string
   :condition: optional

   The issuer to use for the KBC/CBC payment. This is useful when you want to embed the selection between KBC and CBC on
   your own checkout screen. The full list of issuer IDs can be retrieved via the :ref:`Methods API <method-includes>`
   by using the optional ``issuers`` include.

   Possible values: ``kbc`` ``cbc``

Klarna Pay now. / Pay later. / Slice it.
""""""""""""""""""""""""""""""""""""""""
.. note::
    Klarna payments can only be created via the :doc:`Orders API </reference/v2/orders-api/create-order>`.

.. parameter:: extraMerchantData
   :type: object
   :condition: optional

   For some industries, additional purchase information can be sent to Klarna to increase the authorization rate. You
   can submit your extra data in this field if you have agreed upon this with Klarna. This field should be an object
   containing any of the allowed keys and sub objects described at the `Klarna Developer Documentation
   <https://docs.klarna.com/klarna-payments/api/#tag/Attachment-Schema>`_ under ``attachment.body``.

   Please reach out to your account manager at Mollie to enable this feature with Klarna, and to agree on which fields
   you can send.

.. _paypal-method-details:

PayPal
""""""
.. parameter:: description
   :type: string
   :condition: optional

   For PayPal, we will automatically try to determine the order number from the description string and pass it on to
   PayPal as the *invoice reference*. This field is searchable in the PayPal merchant dashboard.

   For example, in the string ``Best Service Order ABS123`` our system will assume "Order ABS123" to be the invoice
   reference.

   This functionality is a 'best effort' feature based on a list of common keywords like 'order', 'payment', 'invoice',
   and common translations like 'Zahlung' and 'Pedido'.

.. parameter:: shippingAddress
   :type: address object
   :condition: optional

   The shipping address details. We advise to provide these details to improve PayPal's fraud protection, and thus
   improve conversion.

   If an address is provided, then the address has to be in a valid format. Please refer to the documentation of the
   :ref:`address object <address-object>` for more information on which formats are accepted.

   .. parameter:: givenName
      :type: string
      :condition: required

      The given name (first name) of the person. The maximum character length of ``givenName`` and ``familyName``
      combined is 128.

   .. parameter:: familyName
      :type: string
      :condition: required

      The family name (surname) of the person. The maximum character length of ``givenName`` and ``familyName`` combined
      is 128.

   .. parameter:: streetAndNumber
      :type: string
      :condition: required

      The street and street number of the shipping address. The maximum character length is 128.

   .. parameter:: postalCode
      :type: string
      :condition: conditional

      The postal code of the shipping address. This field is required if the provided ``country`` has a postal code
      system. The maximum character length is 20.

   .. parameter:: city
      :type: string
      :condition: required

      The city of the shipping address. The maximum character length is 100.

   .. parameter:: region
      :type: string
      :condition: optional

      The region of the shipping address. The maximum character length is 100. **Please note**: this field is required
      if ``country`` is one of the following countries: ``AR`` ``BR`` ``CA`` ``CN`` ``ID`` ``IN`` ``JP`` ``MX`` ``TH``
      ``US``

   .. parameter:: country
      :type: string
      :condition: required

      The country of the shipping address in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_
      format.

.. parameter:: sessionId
   :type: string
   :condition: optional

   The unique ID you have used for the PayPal fraud library. You should include this if you use PayPal for an on-demand
   payment. The maximum character length is 32.

   Please refer to the :doc:`Recurring payments guide </payments/recurring>` for more information on how to implement
   the fraud library.

.. parameter:: digitalGoods
   :type: boolean
   :condition: optional

   Indicate if you are about to deliver digital goods, like for example a license. Setting this parameter can have
   consequences for your Seller Protection by PayPal. Please see
   `PayPal's help article <https://www.paypal.com/us/brc/article/seller-protection>`_ about Seller Protection for more
   information.

   Default: ``false``

paysafecard
"""""""""""
.. parameter:: customerReference
   :type: string
   :condition: optional

   Used for consumer identification. Use the following guidelines to create your ``customerReference``:

   * Has to be unique per shopper
   * Has to remain the same for one shopper
   * Should be as disconnected from personal data as possible
   * Must not contain customer sensitive data
   * Must not contain the timestamp
   * Must not contain the IP address

   Due to data privacy regulations, make sure not to use any personal identifiable information in this parameter.

   If not provided, Mollie will send a hashed version of the shopper IP address.

Przelewy24
""""""""""
.. parameter:: billingEmail
   :type: string
   :condition: optional

   Consumer's email address.

SEPA Direct Debit
"""""""""""""""""
.. note::
    One-off SEPA Direct Debit payments using Mollie Checkout can only be created if this is enabled on your account. In
    general, it is not very useful for webshops but may be useful for charities.

    Please contact our support department to enable this.

    If you want to use recurring payments, take a look at our :doc:`Recurring payments guide </payments/recurring>`.

.. parameter:: consumerName
   :type: string
   :condition: optional

   Beneficiary name of the account holder. Only available if one-off payments are enabled on your account. Supplying
   this field will pre-fill the beneficiary name in the checkout screen.

.. parameter:: consumerAccount
   :type: string
   :condition: optional

   IBAN of the account holder. Only available if one-off payments are enabled on your account. Supplying this field will
   pre-fill the IBAN in the checkout screen.

.. _voucher_method_details:

Vouchers
""""""""
.. parameter:: issuer
   :type: string
   :condition: optional

   A voucher issuer ID, for example ``sodexo-lunchpass``. If you supply this parameter, the returned payment URL will
   deep-link to the specific card website. The full list of issuers can be retrieved via the
   :ref:`Methods API <method-includes>` by using the optional ``issuers`` include.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, you have to specify which profile you are creating the payment for using the
``profileId`` parameter. Organizations can have multiple profiles for each of their websites. See
:doc:`Profiles API </reference/v2/profiles-api/overview>` for more information.

For these authentication methods the optional ``testmode`` parameter is available as well to enable test mode.

.. parameter:: profileId
   :type: string
   :condition: required for access tokens
   :collapse: true

   The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to make this payment a test payment.

Mollie Connect parameters
^^^^^^^^^^^^^^^^^^^^^^^^^
With Mollie Connect you can charge fees on payments that are processed through your app, either by defining an
*application fee* or by *splitting the payment*. To learn more about the difference, please refer to the
:doc:`Mollie Connect overview </connect/overview>`.

.. parameter:: applicationFee
   :type: object
   :condition: optional
   :collapse: true

   Adding an :doc:`application fee </connect/application-fees>` allows you to charge the merchant a small sum for the
   payment and transfer this to your own account.

   .. parameter:: amount
      :type: amount object
      :condition: required

      The fee that the app wants to charge, e.g. ``{"currency":"EUR", "value":"10.00"}`` if the app would want to charge
      €10.00.

      There need to be enough funds left from the payment to deduct the Mollie payment fees as well. For example, you
      cannot charge a €0.99 fee on a €1.00 payment. The API will return an error if the requested application fee is too
      high for the specific payment amount and method.

      .. parameter:: currency
         :type: string
         :condition: required

         An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

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

.. parameter:: routing
   :type: array
   :condition: optional
   :collapse: true

   .. note:: This functionality is currently in closed beta. Please contact our partner management team if you are
      interested in testing this functionality with us.

   An optional routing configuration which enables you to route a successful payment, or part of the payment, to one or
   more connected accounts. Additionally, you can schedule (parts of) the payment to become available on the connected
   account on a future date.

   See the :doc:`Split payments </connect/splitting-payments>` guide for more information on payment routing.

   If a routing array is supplied, it must contain one or more routing objects with the following parameters.

   .. parameter:: amount
      :type: amount object
      :condition: conditional

      If more than one routing object is given, the routing objects must indicate what portion of the total payment
      amount is being routed.

      .. parameter:: currency
         :type: string
         :condition: required

         An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code. Currently only ``EUR`` payments can be
         routed.

      .. parameter:: value
         :type: string
         :condition: required

         A string containing the exact amount of this portion of the payment in the given currency. Make sure to send
         the right amount of decimals. Non-string values are not accepted.

   .. parameter:: destination
      :type: object
      :condition: required

      The destination of this portion of the payment.

      .. parameter:: type
         :type: string
         :condition: required

         The type of destination. Currently only the destination type ``organization`` is supported.

         Possible values: ``organization``

      .. parameter:: organizationId
         :type: string
         :condition: conditional

         Required for destination type ``organization``. The ID of the connected organization the funds should be routed
         to, for example ``org_12345``.

         **Please note:** ``me`` or the ID of the current organization are not accepted as an ``organizationId``. After
         all portions of the total payment amount have been routed, the amount left will be routed to the current
         organization automatically.

   .. parameter:: releaseDate
      :type: date
      :condition: optional

      Optionally, schedule this portion of the payment to be transferred to its destination on a later date. The date
      must be given in ``YYYY-MM-DD`` format.

      If no date is given, the funds become available to the balance as soon as the payment succeeds.

QR codes
^^^^^^^^
To create a payment with a QR code embedded in the API response, explicitly set the payment method and call the API
endpoint with an include request for ``details.qrCode`` in the query string:

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/payments?include=details.qrCode

QR codes can be generated for iDEAL, Bancontact and bank transfer payments.

Refer to the :doc:`Get payment </reference/v2/payments-api/get-payment>` reference to see what the API response looks
like when the QR code is included.

Response
--------
``201`` ``application/hal+json``

A payment object is returned, as described in :doc:`/reference/v2/payments-api/get-payment`.

Example
-------
.. code-block-selector::
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
            "description" => "Order #12345",
            "redirectUrl" => "https://webshop.example.org/order/12345/",
            "webhookUrl" => "https://webshop.example.org/payments/webhook/",
            "metadata" => [
                  "order_id" => "12345",
            ],
      ]);

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      payment = mollie_client.payments.create({
         'amount': {
               'currency': 'EUR',
               'value': '10.00'
         },
         'description': 'Order #12345',
         'redirectUrl': 'https://webshop.example.org/order/12345/',
         'webhookUrl': 'https://webshop.example.org/payments/webhook/',
         'metadata': {
               'order_id': '12345'
         }
      })

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      payment = Mollie::Payment.create(
        amount: {
          currency: 'EUR',
          value: '10.00'
        },
        description: 'Order #12345',
        redirect_url: 'https://webshop.example.org/order/12345/',
        webhook_url: 'https://webshop.example.org/payments/webhook/',
        metadata: {
          order_id: '12345'
        }
      )

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const payment = await mollieClient.payments.create({
          amount: {
            currency: 'EUR',
            value: '10.00', // We enforce the correct number of decimals through strings
          },
          description: 'Order #12345',
          redirectUrl: 'https://webshop.example.org/order/12345/',
          webhookUrl: 'https://webshop.example.org/payments/webhook/',
          metadata: {
            order_id: '12345',
          },
        });
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json

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
           "dashboard": {
               "href": "https://www.mollie.com/dashboard/org_12345678/payments/tr_7UhSN1zuXS",
               "type": "application/json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/payments-api/create-payment",
               "type": "text/html"
           }
       }
   }
