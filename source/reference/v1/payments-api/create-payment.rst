Create payment
==============
.. api-name:: Payments API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for creating payments in the new v2 API can be found
             :doc:`here </reference/v2/payments-api/create-payment>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v1/payments

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Payment creation is elemental to the Mollie API: this is where most payment implementations start off. Note optional
parameters are accepted for certain payment methods.

To wrap your head around the payment process, an explanation and flow charts can be found in the
:doc:`Accepting payments guide </payments/accepting-payments>`.

Parameters
----------
.. parameter:: amount
   :type: decimal
   :condition: required

   The amount in EUR that you want to charge, e.g. 100.00 if you would want to charge €100.00.

   You can find the `minimum and maximum amounts <https://help.mollie.com/hc/en-us/articles/115000667365>`_ per payment
   method in our help center. Additionally, they can be retrieved using the :doc:`/reference/v1/methods-api/get-method`.

   .. note:: If you want to charge other currencies, upgrade to the
      :doc:`Create Payments v2 API</reference/v2/payments-api/create-payment>`. The v2 API fully supports
      :doc:`multicurrency </payments/multicurrency>`.

.. parameter:: description
   :type: string
   :condition: required

   The description of the payment you are creating. This will be shown to the consumer on their card or bank statement
   when possible, and in any exports you generate.

   We recommend you use the order number so that you can always link the payment to the order. This is particularly
   useful for bookkeeping.

   The maximum length of the description field differs per payment method, with the absolute maximum being 255 characters.
   The API will not reject strings longer than the maximum length but it will truncate them to fit.

.. parameter:: redirectUrl
   :type: string
   :condition: required

   The URL your customer will be redirected to after the payment process.

   It could make sense for the ``redirectUrl`` to contain a unique identifier – like your order ID – so you can show the
   right page referencing the order when your customer returns.

   .. note:: You can omit this parameter for payments with the ``sequenceType`` parameter set to ``recurring``.

.. parameter:: webhookUrl
   :type: string
   :condition: required

   Set the webhook URL, where we will send payment status updates to.

   .. note:: The ``webhookUrl`` must be reachable from Mollie's point of view. If you want to use webhook during
      development on ``localhost``, you should use a tool like
      `ngrok <https://lornajane.net/posts/2015/test-incoming-webhooks-locally-with-ngrok>`_ to have the webhooks
      delivered to your local machine.

.. parameter:: locale
   :type: string
   :condition: optional

   Allows you to preset the language to be used in the hosted payment pages shown to the consumer. Setting a locale is
   highly recommended and will greatly improve your conversion rate. When this parameter is omitted, the browser
   language will be used instead if supported by the payment method. You can provide any ``xx_XX`` format ISO 15897
   locale, but our hosted payment pages currently only support the following languages:

   Possible values: ``en_US`` ``en_GB`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
   ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV`` ``lt_LT``

.. parameter:: method
   :type: string
   :condition: optional

   Normally, a payment method selection screen is shown. However, when using this parameter, your customer will skip the
   selection screen and will be sent directly to the chosen payment method. The parameter enables you to fully integrate
   the payment method selection into your website, however note Mollie's country based conversion optimization is lost.

   Possible values: ``banktransfer`` ``belfius`` ``creditcard`` ``directdebit`` ``eps`` ``giftcard`` ``giropay``
   ``ideal`` ``kbc`` ``mistercash`` ``mybank`` ``paypal`` ``paysafecard`` ``przelewy24`` ``sofort``

   .. note:: If you are looking to create payments with the Klarna Pay now, Klarna Pay later, Klarna Slice it, in3 or
             Voucher payment methods, use the :doc:`Orders API </reference/v2/orders-api/overview>` instead.

.. parameter:: metadata
   :type: mixed
   :condition: optional

   Provide any data you like, and we will save the data alongside the payment. Whenever you fetch the payment with our
   API, we will also include the metadata. You can use up to approximately 1kB.

.. parameter:: recurringType
   :type: string
   :condition: optional

   Enables recurring payments. If set to ``first``, a first payment for the customer is created, allowing the customer
   to agree to automatic recurring charges taking place on their account in the future. If set to ``recurring``, the
   customer's card is charged automatically.

   Possible values: ``first`` ``recurring``

   .. warning:: Using recurring payments with PayPal is only possible if PayPal has activated Reference Transactions on
      your merchant account. Check if you account is eligible via our
      :doc:`Methods API </reference/v1/methods-api/list-methods>`. Make sure to set the ``recurringType`` parameter to
      ``first``. Your account is eligible if you get PayPal as method returned.

.. parameter:: customerId
   :type: string
   :condition: optional

   The ID of the :doc:`customer </reference/v1/customers-api/get-customer>` for whom the payment is being created. This
   is used for recurring payments and :doc:`single-click payments </payments/hosted-checkout>`.

.. parameter:: mandateId
   :type: string
   :condition: optional

   When creating recurring payments, the ID of a specific :doc:`mandate </reference/v1/mandates-api/get-mandate>` may be
   supplied to indicate which of the consumer's accounts should be credited.

Payment method-specific parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you specify the ``method`` parameter, optional parameters may be available for the payment method. If no method is
specified, you can still send the optional parameters and we will apply them when the consumer selects the relevant
payment method.

Bank transfer
"""""""""""""
.. parameter:: billingEmail
   :type: string
   :condition: optional

   Consumer's email address, to automatically send the bank transfer details to. **Note:** the payment instructions will
   be sent immediately when creating the payment. If you do not specify the ``locale`` parameter, the email will be sent
   in English, as we haven't yet been able to detect the consumer's browser language.

.. parameter:: dueDate
   :type: string
   :condition: optional

   The date the payment should :doc:`expire </payments/status-changes>`, in ``YYYY-MM-DD`` format. **Note:** the minimum
   date is tomorrow and the maximum date is 100 days after tomorrow.

.. parameter:: locale
   :type: string
   :condition: optional

   The locale will determine the target bank account the customer has to transfer the money to. We have dedicated bank
   accounts for Belgium, Germany and The Netherlands. Having the customer use a local bank account greatly increases the
   conversion and speed of payment.

   Possible values: ``en_US`` ``en_GB`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
   ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV`` ``lt_LT``

Credit card
"""""""""""
.. parameter:: billingAddress
   :type: string
   :condition: optional

   The card holder's address. We advise to provide these details to improve the credit card fraud
   protection, and thus improve conversion.

.. parameter:: billingCity
   :type: string
   :condition: optional

   The card holder's city.

.. parameter:: billingRegion
   :type: string
   :condition: optional

   The card holder's region.

.. parameter:: billingPostal
   :type: string
   :condition: optional

   The card holder's postal code.

.. parameter:: billingCountry
   :type: string
   :condition: optional

   The card holder's country in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format.

.. parameter:: shippingAddress
   :type: string
   :condition: optional

   The shipping address. We advise to provide these details to improve the credit card fraud protection, and thus
   improve conversion.

.. parameter:: shippingCity
   :type: string
   :condition: optional

   The city of the shipping address.

.. parameter:: shippingRegion
   :type: string
   :condition: optional

   The region of the shipping address.

.. parameter:: shippingPostal
   :type: string
   :condition: optional

   The postal code of the shipping address.

.. parameter:: shippingCountry
   :type: string
   :condition: optional

   The country of the shipping address, in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_
   format.

Gift cards
""""""""""
.. parameter:: issuer
   :type: string
   :condition: optional

   The gift card brand to use for the payment. These issuers are not dynamically available through the Issuers API, but
   can be retrieved by using the ``issuers`` include in the Methods API. If you need a brand not in the list, contact
   our support department. If only one issuer is activated on your account, you can omit this parameter.

   Possible values: ``beautycadeaukaart`` ``bloemencadeaukaart`` ``bloemplantgiftcard`` ``boekenbon`` ``dagiftcard`` ``decadeaukaart``
   ``delokalecadeaukaart`` ``dinercadeau`` ``doenkadotickets`` ``fashioncheque`` ``festivalcadeau`` ``good4fun`` ``horseandgifts`` ``huistuincadeaukaart``
   ``jewelcard`` ``kluscadeau`` ``kunstencultuurcadeaukaart`` ``nationalebioscoopbon`` ``nationaleentertainmentcard``
   ``nationalegolfbon`` ``ohmygood`` ``podiumcadeaukaart`` ``reiscadeau`` ``restaurantcadeau`` ``shoesandsneakerscadeau``
   ``sodexosportculturepass`` ``sportenfitcadeau`` ``sustainablefashion`` ``travelcheq`` ``vvvgiftcard``
   ``vvvdinercheque`` ``vvvlekkerweg`` ``webshopgiftcard`` ``wijncadeaukaart`` ``yourgift``

.. parameter:: voucherNumber
   :type: string
   :condition: optional

   The card number on the gift card.

.. parameter:: voucherPin
   :type: string
   :condition: optional

   The PIN code on the gift card. Only required if there is a PIN code printed on the gift card.

iDEAL
"""""
.. parameter:: issuer
   :type: string
   :condition: optional

   An iDEAL issuer ID, for example ``ideal_INGBNL2A``. The returned payment URL will deep-link into the specific banking
   website (ING Bank, in this example). The full list of issuers can be retrieved via the
   :doc:`Issuers API </reference/v1/issuers-api/list-issuers>`.

KBC/CBC Payment Button
""""""""""""""""""""""
.. parameter:: description
   :type: string
   :condition: required

   When KBC/CBC is chosen as the payment method, the description will be truncated to 13 characters.

.. parameter:: issuer
   :type: string
   :condition: optional

   The issuer to use for the KBC/CBC payment. These issuers are not dynamically available through the Issuers API, but
   can be retrieved by using the ``issuers`` include in the Methods API.

   Possible values: ``kbc`` ``cbc``

PayPal
""""""
.. parameter:: shippingAddress
   :type: string
   :condition: optional

   The shipping address. We advise to provide these details to improve PayPal's fraud protection, and thus improve
   conversion. The maximum character length is 128.

.. parameter:: shippingCity
   :type: string
   :condition: optional

   The city of the shipping address. The maximum character length is 100.

.. parameter:: shippingRegion
   :type: string
   :condition: optional

   The region of the shipping address. The maximum character length is 100. This field is required if the
   ``shippingCountry`` is one of the following countries: ``AR`` ``BR`` ``CA`` ``CN`` ``ID`` ``IN`` ``JP`` ``MX`` ``TH``
   ``US``

.. parameter:: shippingPostal
   :type: string
   :condition: optional

   The postal code of the shipping address. The maximum character length is 20.

.. parameter:: shippingCountry
   :type: string
   :condition: optional

   The country of the shipping address, in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_
   format.

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

.. note:: Using the v1 API, only payments denominated in Euro can be created. Migrate to the v2 API to create payments
          in Polish złoty.

.. parameter:: billingEmail
   :type: string
   :condition: optional

   Consumer's email address.

SEPA Direct Debit
"""""""""""""""""

.. note:: One-off SEPA Direct Debit payments using Mollie Checkout can only be created if this is enabled on your
   account. In general, it is not very useful for webshops but may be useful for charities.

   If you want to use recurring payments, take a look at our :doc:`Recurring payments guide </payments/recurring>`.

.. parameter:: consumerName
   :type: string
   :condition: optional

   Beneficiary name of the account holder. Only available if one-off payments are enabled on your account. Will pre-fill
   the beneficiary name in the checkout screen if present.

.. parameter:: consumerAccount
   :type: string
   :condition: optional

   IBAN of the account holder. Only available if one-off payments are enabled on your account. Will pre-fill the IBAN in
   the checkout screen if present.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, the only mandatory extra parameter is the ``profileId`` parameter. With it, you
can specify which profile the payment belongs to. Organizations can have multiple profiles for each of their websites.
See :doc:`Profiles API </reference/v1/profiles-api/create-profile>` for more information.

.. parameter:: profileId
   :type: string
   :condition: required
   :collapse: true

   The payment profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to make this payment a test payment.

.. parameter:: applicationFee
   :type: object
   :condition: optional
   :collapse: true

   Adding an Application Fee allows you to charge the merchant for the payment and transfer this to your own account.
   Set the ``applicationFee`` parameter as a small object with its own amount and description. The application fee
   amount must be at least about €1.00 less than the payment's ``amount`` parameter.

   .. parameter:: amount
      :type: decimal
      :condition: required

      The amount in EUR that the app wants to charge, e.g. ``10.00`` if the app would want to charge €10.00.

      .. note:: You will need to invoice the merchant yourself. We will only collect the amount from the merchant and
         settle the amount with you.

   .. parameter:: description
      :type: string
      :condition: required

      The description of the application fee. This will appear on settlement reports to the merchant and to you.

      The maximum length is 255 characters.

QR codes
^^^^^^^^
To create a payment with a QR code embedded in the API response, call the API endpoint with an
include request for ``details.qrCode`` in the query string:

``POST https://api.mollie.com/v1/payments?include=details.qrCode``

QR codes can be generated for iDEAL, Bancontact and bank transfer payments.

Refer to the :doc:`Get payment </reference/v1/payments-api/get-payment>` reference to see what the API response looks
like when the QR code is included.

Response
--------
``201`` ``application/json``

A payment object is returned, as described in :doc:`/reference/v1/payments-api/get-payment`.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v1/payments \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d "amount=10.00" \
       -d "description=Order #12345" \
       -d "redirectUrl=https://webshop.example.org/order/12345/" \
       -d "webhookUrl=https://webshop.example.org/payments/webhook/" \
       -d "metadata[order_id]=12345"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/json

   {
       "resource": "payment",
       "id": "tr_7UhSN1zuXS",
       "mode": "test",
       "createdDatetime": "2018-03-16T14:36:44.0Z",
       "status": "open",
       "expiryPeriod": "PT15M",
       "amount": "10.00",
       "description": "Order #12345",
       "metadata": {
           "order_id": "12345"
       },
       "locale": "nl_NL",
       "profileId": "pfl_QkEhN94Ba",
       "links": {
           "paymentUrl": "https://www.mollie.com/payscreen/select-method/7UhSN1zuXS",
           "redirectUrl": "https://webshop.example.org/order/12345/",
           "webhookUrl": "https://webshop.example.org/payments/webhook/"
       }
   }
