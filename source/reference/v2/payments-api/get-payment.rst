Get payment
===========
.. api-name:: Payments API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve a single payment object by its payment token.

.. note:: We call your webhook when the :doc:`payment status changes </payments/status-changes>`, so there's no
          need to poll this endpoint for status changes.

Parameters
----------
Replace ``id`` in the endpoint URL by the payment's ID, for example ``tr_7UhSN1zuXS``.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, you can enable test mode through the ``testmode`` query string parameter.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to get a payment made in test mode. If you omit this parameter, you can only retrieve live mode
   payments.

Includes
^^^^^^^^
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``details.qrCode`` Include a :doc:`QR code </payments/qr-codes>` object. Only available for iDEAL, Bancontact
  and bank transfer payments.
* ``details.remainderDetails`` Include the `Payment method-specific response parameters`_ of the 'remainder payment' as
  well. This applies to gift card and voucher payments where only part of the payment was completed with gift cards or
  vouchers, and the remainder was completed with a regular payment method.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint also allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``captures`` Include all :doc:`captures </reference/v2/captures-api/get-capture>` created for the payment.
* ``refunds`` Include all :doc:`refunds </reference/v2/refunds-api/get-payment-refund>` created for the payment.
* ``chargebacks`` Include all :doc:`chargebacks </reference/v2/chargebacks-api/get-payment-chargeback>` issued for the
  payment.

Response
--------
``200`` ``application/hal+json``

.. parameter:: resource
   :type: string

   Indicates the response contains a payment object. Will always contain ``payment`` for this endpoint.

.. parameter:: id
   :type: string

   The identifier uniquely referring to this payment. Mollie assigns this identifier at payment creation time. For
   example ``tr_7UhSN1zuXS``. Its ID will always be used by Mollie to refer to a certain payment.

.. parameter:: mode
   :type: string

   The mode used to create this payment. Mode determines whether a payment is *real* (live mode) or a *test*
   payment.

   Possible values: ``live`` ``test``

.. parameter:: createdAt
   :type: datetime

   The payment's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: status
   :type: string

   The payment's status. Refer to the documentation regarding statuses for more info about which statuses occur at what
   point.

.. parameter:: isCancelable
   :type: boolean
   :condition: optional

   Whether or not the payment can be canceled. This parameter is omitted if the payment reaches a final state.

.. parameter:: authorizedAt
   :type: datetime
   :condition: optional

   The date and time the payment became authorized, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format. This
   parameter is omitted if the payment is not authorized (yet).

.. parameter:: paidAt
   :type: datetime
   :condition: optional

   The date and time the payment became paid, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format. This
   parameter is omitted if the payment is not completed (yet).

.. parameter:: canceledAt
   :type: datetime
   :condition: optional

   The date and time the payment was canceled, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format. This
   parameter is omitted if the payment is not canceled (yet).

.. parameter:: expiresAt
   :type: datetime
   :condition: optional

   The date and time the payment will expire, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format. This
   parameter is omitted if the payment can no longer expire.

.. parameter:: expiredAt
   :type: datetime
   :condition: optional

   The date and time the payment was expired, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format. This
   parameter is omitted if the payment did not expire (yet).

.. parameter:: failedAt
   :type: datetime
   :condition: optional

   The date and time the payment failed, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format. This parameter
   is omitted if the payment did not fail (yet).

.. parameter:: amount
   :type: amount object

   The amount of the payment, e.g. ``{"currency":"EUR", "value":"100.00"}`` for a €100.00 payment.

   .. parameter:: currency
      :type: string

      The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

   .. parameter:: value
      :type: string

      A string containing the exact amount of the payment in the given currency.

.. parameter:: amountRefunded
   :type: amount object
   :condition: optional

   The total amount that is already refunded. Only available when refunds are available for this payment. For some
   payment methods, this amount may be higher than the payment amount, for example to allow reimbursement of the costs
   for a return shipment to the customer.

   .. parameter:: currency
      :type: string

      The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

   .. parameter:: value
      :type: string

      A string containing the exact refunded amount of the payment in the given currency.

.. parameter:: amountRemaining
   :type: amount object
   :condition: optional

   The remaining amount that can be refunded. Only available when refunds are available for this payment.

   .. parameter:: currency
      :type: string

      The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

   .. parameter:: value
      :type: string

      A string containing the exact refundable amount of the payment in the given currency.

.. parameter:: amountCaptured
   :type: amount object
   :condition: optional

   The total amount that is already captured for this payment. Only available when this payment supports captures.

   .. parameter:: currency
      :type: string

      The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

   .. parameter:: value
      :type: string

      A string containing the exact captured amount of the payment in the given currency.

.. parameter:: amountChargedBack
   :type: amount object
   :condition: optional

   The total amount that was charged back for this payment. Only available when the total charged back amount is not
   zero.

   .. parameter:: currency
      :type: string

      The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

   .. parameter:: value
      :type: string

      A string containing the exact charged back amount of the payment in the given currency.

.. parameter:: settlementAmount
   :type: amount object
   :condition: optional

   This optional field will contain the approximate amount that will be settled to your account, converted to the
   currency your account is settled in. It follows the same syntax as the ``amount`` property.

   Any amounts not settled by Mollie will not be reflected in this amount, e.g. PayPal or gift cards. If no amount is
   settled by Mollie the ``settlementAmount`` is omitted from the response.

   Please note that this amount might be recalculated and changed when the status of the payment changes.
   We suggest using the :doc:`List balance transactions </reference/v2/balances-api/list-balance-transactions>`
   endpoint instead to get more accurate settlement amounts for your payments.

.. parameter:: description
   :type: string

   A short description of the payment. The description is visible in the Dashboard and will be shown on the customer's
   bank or card statement when possible.

.. parameter:: redirectUrl
   :type: string

   The URL your customer will be redirected to after completing or canceling the payment process.

   The URL will be ``null`` for recurring payments.

.. parameter:: cancelUrl
   :type: string
   :condition: optional

   The optional redirect URL you provided during payment creation. Consumer that explicitly cancel the payment will be
   redirected to this URL if provided, or otherwise to the ``redirectUrl`` instead — see above.

   Mollie will always give you status updates via :doc:`webhooks </overview/webhooks>`, including for the ``canceled``
   status. This parameter is therefore entirely optional, but can be useful when implementing a dedicated
   consumer-facing flow to handle payment cancellations.

   The URL will be ``null`` for recurring payments.

.. parameter:: webhookUrl
   :type: string
   :condition: optional

   The URL Mollie will call as soon an important status change takes place.

.. parameter:: locale
   :type: string
   :condition: optional

   The customer's locale, either forced on creation by specifying the ``locale`` parameter, or detected by us during
   checkout. Will be a full locale, for example ``nl_NL``.

.. parameter:: countryCode
   :type: string
   :condition: optional

   This optional field contains your customer's
   `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ country code, detected by us during
   checkout. For example: ``BE``. This field is omitted if the country code was not detected.

.. parameter:: method
   :type: string

   The payment method used for this payment, either forced on creation by specifying the ``method`` parameter, or
   chosen by the customer on our payment method selection screen.

   If the payment is only partially paid with a gift card, the method remains ``giftcard``.

   Possible values: ``null`` ``bancontact`` ``banktransfer`` ``billie`` ``belfius`` ``creditcard`` ``directdebit`` ``eps``
   ``giftcard`` ``giropay`` ``ideal`` ``in3`` ``kbc`` ``klarnapaylater`` ``klarnapaynow`` ``klarnasliceit`` ``mybank``
   ``paypal`` ``paysafecard`` ``przelewy24`` ``sofort``

.. parameter:: restrictPaymentMethodsToCountry
   :type: string
   :condition: optional
   :collapse: true

   The country code you provided upon payment creation, to restrict the payment methods available to your customer to
   methods from a single country only.

   The field expects a country code in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format,
   for example `NL`.

.. parameter:: metadata
   :type: mixed
   :collapse: true

   The optional metadata you provided upon payment creation. Metadata can for example be used to link an order to a
   payment.

.. parameter:: profileId
   :type: string

   The identifier referring to the profile this payment was created on. For example, ``pfl_QkEhN94Ba``.

.. parameter:: settlementId
   :type: string
   :condition: optional

   The identifier referring to the settlement this payment was settled with. For example, ``stl_BkEjN2eBb``.

.. parameter:: orderId
   :type: string
   :condition: optional

   If the payment was created for an order, the ID of that order will be part of the response.

.. parameter:: _links
   :type: object

   An object with several URL objects relevant to the payment. Every URL object will contain an ``href`` and a ``type``
   field.

   .. parameter:: self
      :type: URL object

      The API resource URL of the payment itself.

   .. parameter:: checkout
      :type: URL object
      :condition: optional

      The URL your customer should visit to make the payment. This is where you should redirect the consumer to.

      .. note:: You should use HTTP ``GET`` for the redirect to the checkout URL. Using HTTP ``POST`` for redirection
         will cause issues with some payment methods or iDEAL issuers. Use HTTP status code ``303 See Other`` to force
         an HTTP ``GET`` redirect.

         Recurring payments do not have a checkout URL.

   .. parameter:: mobileAppCheckout
      :type: URL object
      :condition: optional

      The deeplink URL to the app of the payment method. Currently only available for ``bancontact``.

      .. warning:: You should check if your customer has the required app on their mobile device before redirecting to
         this URL. Mobile operating systems will ignore the redirect to this URL if the correct app is not installed.

   .. parameter:: dashboard
      :type: URL object

      Direct link to the payment in the Mollie Dashboard.

   .. parameter:: refunds
      :type: URL object
      :condition: optional

      The API resource URL of the refunds that belong to this payment.

   .. parameter:: chargebacks
      :type: URL object
      :condition: optional

      The API resource URL of the chargebacks that belong to this payment.

   .. parameter:: captures
      :type: URL object
      :condition: optional

      The API resource URL of the captures that belong to this payment.

   .. parameter:: settlement
      :type: URL object
      :condition: optional

      The API resource URL of the settlement this payment has been settled with. Not present if not yet settled.

   .. parameter:: documentation
      :type: URL object

      The URL to the payment retrieval endpoint documentation.

   .. parameter:: order
      :type: URL object
      :condition: optional

      The API resource URL of the order this payment was created for. Not present if not created for an order.

   .. parameter:: terminal
      :type: URL object
      :condition: optional

      The API resource URL of the terminal this payment was created for. Only present for a point of sale payment.

Response parameters for recurring payments
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. parameter:: sequenceType
   :type: string
   :collapse: true

   Indicates which type of payment this is in a recurring sequence. Set to ``first`` for
   :ref:`first payments <payments/recurring/first-payment>` that allow the customer to agree to automatic recurring
   charges taking place on their account in the future. Set to ``recurring`` for payments where the customer's card is
   charged automatically.

   Set to ``oneoff`` by default, which indicates the payment is a regular non-recurring payment.

   Possible values: ``oneoff`` ``first`` ``recurring``

.. parameter:: customerId
   :type: string
   :condition: conditional
   :collapse: true

   If a customer was specified upon payment creation, the customer's token will be available here as well. For
   example, ``cst_XPn78q9CfT``.

.. parameter:: mandateId
   :type: string
   :condition: conditional
   :collapse: true

   If the payment is a first or recurring payment, this field will hold the ID of the mandate.

.. parameter:: subscriptionId
   :type: string
   :condition: optional
   :collapse: true

   When implementing the Subscriptions API, any recurring charges resulting from the subscription will hold the ID of
   the subscription that triggered the payment.

.. parameter:: _links
   :type: object
   :collapse: true

   The ``_links`` object will contain additional useful URL objects for recurring payments.

   .. parameter:: changePaymentState
      :type: URL object
      :condition: optional

      Recurring payments do not have a checkout URL, because these payments are executed without any user interaction.
      This link is included for test mode recurring payments, and allows you to set the final payment state for such
      payments.

      This link is also included for paid test mode payments. This allows you to create a refund or chargeback for the
      payment. This works for all payment types that can be charged back and/or refunded.

   .. parameter:: mandate
      :type: URL object
      :condition: optional

      The API resource URL of the mandate linked to this payment. Not present if a one-off payment.

   .. parameter:: subscription
      :type: URL object
      :condition: optional

      The API resource URL of the subscription this payment is part of. Not present if not a subscription payment.

   .. parameter:: customer
      :type: URL object
      :condition: optional

      The API resource URL of the customer this payment belongs to. Not present if not linked to a customer.

Response parameters for pre-authorized payments
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. parameter:: captureMode
   :type: string
   :condition: optional

   Indicates whether the capture will be scheduled automatically or not. Set to ``manual`` for payments that can be
   captured manually using the :doc:`Create capture </reference/v2/captures-api/create-capture>` endpoint.

   Set to ``automatic`` by default, which indicates the payment will be captured automatically, without having to
   separately request it.

   Possible values: ``automatic`` ``manual``

.. parameter:: captureDelay
   :type: string
   :condition: optional

   Indicates the interval to wait before the payment is captured, for example ``8 hours`` or ``2 days``. The capture
   delay will be added to the date and time the payment became authorized.

   Possible values: ``... hours`` ``... days``

.. parameter:: captureBefore
   :type: date
   :condition: optional

   Indicates the date before which the merchant has to have captured the payment in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format. 
   From this date we can no longer guarantee a successful capture. This parameter is omitted if the payment is not authorized (yet).

Payment method-specific response parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If the payment has been created with a ``method``, or if the customer selected a method in the payment method selection
screen, a ``details`` object becomes available on the payment object. This object contains detail fields specific to the
selected payment method.

Bancontact
""""""""""
.. parameter:: details
   :type: object
   :collapse-children: false

   An object with payment details.

   .. parameter:: cardNumber
      :type: string

      Only available if the payment is completed - The last four digits of the card number.

   .. parameter:: cardFingerprint
      :type: string

      Only available if the payment is completed - Unique alphanumeric representation of card, usable for identifying
      returning customers.

      .. warning:: This field is **deprecated** as of November 28th, 2019. The fingerprint is now unique per
         transaction, which makes it not useful anymore for identifying returning customers. Use the ``consumerAccount``
         field instead.

   .. parameter:: qrCode
      :type: QR code object

      Only available if requested during payment creation - The QR code that can be scanned by the mobile Bancontact
      application. This enables the desktop to mobile feature.

   .. parameter:: consumerName
      :type: string

      Only available if the payment is completed – The consumer's name.

   .. parameter:: consumerAccount
      :type: string

      Only available if the payment is completed – The consumer's bank account. This may be an IBAN, or it may be a
      domestic account number.

   .. parameter:: consumerBic
      :type: string

      Only available if the payment is completed – The consumer's bank's BIC / SWIFT code.

   .. parameter:: failureReason
      :type: string

      The reason why the payment did not succeed. Only available when there's a reason known.

Bank transfer
"""""""""""""
.. parameter:: details
   :type: object
   :collapse-children: false

   An object with payment details.

   .. parameter:: bankName
      :type: string

      The name of the bank the consumer should wire the amount to.

   .. parameter:: bankAccount
      :type: string

      The IBAN the consumer should wire the amount to.

   .. parameter:: bankBic
      :type: string

      The BIC of the bank the consumer should wire the amount to.

   .. parameter:: transferReference
      :type: string

      The reference the consumer should use when wiring the amount. Note you should not apply any formatting here; show
      it to the consumer as-is.

   .. parameter:: consumerName
      :type: string

      Only available if the payment has been completed – The consumer's name.

   .. parameter:: consumerAccount
      :type: string

      Only available if the payment has been completed – The consumer's bank account. This may be an IBAN, or it may be
      a domestic account number.

   .. parameter:: consumerBic
      :type: string

      Only available if the payment has been completed – The consumer's bank's BIC / SWIFT code.

   .. parameter:: billingEmail
      :type: string

      Only available if filled out in the API or by the consumer – The email address which the consumer asked the
      payment instructions to be sent to.

.. parameter:: _links
   :type: object

   For bank transfer payments, the ``_links`` object will contain some additional URL objects relevant to the payment.

   .. parameter:: status
      :type: URL object

      A link to a hosted payment page where your customer can check the status of their payment.

   .. parameter:: payOnline
      :type: URL object

      A link to a hosted payment page where your customer can finish the payment using an alternative payment method
      also activated on your website profile.

Belfius Pay Button
""""""""""""""""""
.. parameter:: details
   :type: object
   :collapse-children: false

   An object with payment details.

   .. parameter:: consumerName
      :type: string

      Only available one banking day after the payment has been completed – The consumer's name.

   .. parameter:: consumerAccount
      :type: string

      Only available one banking day after the payment has been completed – The consumer's IBAN.

   .. parameter:: consumerBic
      :type: string

      Only available one banking day after the payment has been completed – ``GKCCBEBB``.

.. _Credit card v2:

Credit card
"""""""""""
.. parameter:: details
   :type: object
   :collapse-children: false

   An object with payment details.

   .. parameter:: cardHolder
      :type: string

      Only available if the payment has been completed - The card holder's name.

   .. parameter:: cardNumber
      :type: string

      Only available if the payment has been completed - The last four digits of the card number.

   .. parameter:: cardFingerprint
      :type: string

      Only available if the payment has been completed - Unique alphanumeric representation of card, usable for
      identifying returning customers.

   .. parameter:: cardAudience
      :type: string

      Only available if the payment has been completed and if the data is available - The card's target audience.

      Possible values: ``consumer`` ``business`` ``null``

   .. parameter:: cardLabel
      :type: string

      Only available if the payment has been completed - The card's label. Note that not all labels can be processed
      through Mollie.

      Possible values: ``American Express`` ``Carta Si`` ``Carte Bleue`` ``Dankort`` ``Diners Club`` ``Discover``
      ``JCB`` ``Laser`` ``Maestro`` ``Mastercard`` ``Unionpay`` ``Visa`` ``null``

   .. parameter:: cardCountryCode
      :type: string

      Only available if the payment has been completed - The
      `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ country code of the country the card was
      issued in. For example: ``BE``.

   .. parameter:: cardSecurity
      :type: string

      Only available if the payment has been completed – The type of security used during payment processing.

      Possible values: ``normal`` ``3dsecure``

   .. parameter:: feeRegion
      :type: string

      Only available if the payment has been completed – The fee region for the payment. The ``intra-eu`` value is for
      consumer cards from the EEA.

      Possible values: ``american-express`` ``amex-intra-eea`` ``carte-bancaire`` ``intra-eu`` ``intra-eu-corporate``
      ``domestic`` ``maestro`` ``other``

   .. parameter:: failureReason
      :type: string

      Only available for failed payments. Contains a failure reason code.

      Possible values: ``authentication_abandoned`` ``authentication_failed`` ``authentication_required``
      ``authentication_unavailable_acs`` ``card_declined`` ``card_expired`` ``inactive_card``
      ``insufficient_funds`` ``invalid_cvv`` ``invalid_card_holder_name`` ``invalid_card_number``
      ``invalid_card_type`` ``possible_fraud`` ``refused_by_issuer`` ``unknown_reason``

   .. parameter:: failureMessage
      :type: string

      A localized message that can be shown to your customer, depending on the ``failureReason``.

      Example value: ``Der Kontostand Ihrer Kreditkarte ist unzureichend. Bitte verwenden Sie eine andere Karte.``.

   .. parameter:: wallet
      :type: string
      :condition: optional

      The wallet used when creating the payment.

      Possible values: ``applepay``

Gift cards
""""""""""
.. parameter:: details
   :type: object
   :collapse-children: false

   An object with payment details.

   .. parameter:: voucherNumber
      :type: string

      The voucher number, with the last four digits masked. When multiple gift cards are used, this is the first voucher
      number. Example: ``606436353088147****``.

   .. parameter:: giftcards
      :type: array

      A list of details of all giftcards that are used for this payment. Each object will contain the following
      properties.

      .. parameter:: issuer
         :type: string

         The ID of the gift card brand that was used during the payment.

      .. parameter:: amount
         :type: amount object

         The amount in EUR that was paid with this gift card.

         .. parameter:: currency
            :type: string

            The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

         .. parameter:: value
            :type: string

            A string containing the exact amount of the gift card payment in the given currency.


      .. parameter:: voucherNumber
         :type: string

         The voucher number, with the last four digits masked. Example: ``606436353088147****``

   .. parameter:: remainderAmount
      :type: amount object

      Only available if another payment method was used to pay the remainder amount – The amount that was paid with
      another payment method for the remainder amount.

      .. parameter:: currency
         :type: string

         The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

      .. parameter:: value
         :type: string

         A string containing the remaining payment amount.

   .. parameter:: remainderMethod
      :type: string

      Only available if another payment method was used to pay the remainder amount – The payment method that was used
      to pay the remainder amount.

iDEAL
"""""
.. parameter:: details
   :type: object
   :collapse-children: false

   An object with payment details.

   .. parameter:: consumerName
      :type: string

      Only available if the payment has been completed – The consumer's name.

   .. parameter:: consumerAccount
      :type: string

      Only available if the payment has been completed – The consumer's IBAN.

   .. parameter:: consumerBic
      :type: string

      Only available if the payment has been completed – The consumer's bank's BIC.

KBC/CBC Payment Button
""""""""""""""""""""""
.. parameter:: details
   :type: object
   :collapse-children: false

   An object with payment details.

   .. parameter:: consumerName
      :type: string

      Only available one banking day after the payment has been completed – The consumer's name.

   .. parameter:: consumerAccount
      :type: string

      Only available one banking day after the payment has been completed – The consumer's IBAN.

   .. parameter:: consumerBic
      :type: string

      Only available one banking day after the payment has been completed – The consumer's bank's BIC.

PayPal
""""""
.. parameter:: details
   :type: object
   :collapse-children: false

   An object with payment details.

   .. parameter:: consumerName
      :type: string

      Only available if the payment has been completed – The consumer's first and last name.

   .. parameter:: consumerAccount
      :type: string

      Only available if the payment has been completed – The consumer's email address.

   .. parameter:: paypalReference
      :type: string

      PayPal's reference for the transaction, for instance ``9AL35361CF606152E``.

   .. parameter:: paypalPayerId
      :type: string

      ID for the consumer's PayPal account, for instance ``WDJJHEBZ4X2LY``.

   .. parameter:: sellerProtection
      :type: string
      :condition: optional

      Indicates if the payment is eligible for PayPal's Seller Protection.

      Possible values: ``Eligible`` ``Ineligible`` ``Partially Eligible - INR Only``
      ``Partially Eligible - Unauth Only`` ``PartiallyEligible`` ``None``
      ``Active Fraud Control - Unauth Premium Eligible``

      This parameter is omitted if we did not received the information from PayPal.

   .. parameter:: shippingAddress
      :type: address object
      :condition: optional

      The shipping address details.

      .. parameter:: streetAndNumber
         :type: string

         The street and street number of the shipping address.

      .. parameter:: postalCode
         :type: string

         The postal code of the shipping address.

      .. parameter:: city
         :type: string

         The city of the shipping address.

      .. parameter:: region
         :type: string

         The region of the shipping address.

      .. parameter:: country
         :type: string

         The country of the shipping address in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_
         format.

   .. parameter:: paypalFee
      :type: amount object
      :condition: optional

      The amount of fee PayPal will charge for this transaction. This field is omitted if PayPal will not charge a fee
      for this transaction.

      .. parameter:: currency
         :type: string

         The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

      .. parameter:: value
         :type: string

         A string containing the exact amount of the fee in the given currency.

paysafecard
"""""""""""
.. parameter:: details
   :type: object
   :collapse-children: false

   An object with payment details.

   .. parameter:: customerReference
      :type: string

      The consumer identification supplied when the payment was created.

Point of sale
"""""""""""""
.. parameter:: details
   :type: object
   :collapse-children: false

   An object with payment details.

   .. parameter:: terminalId
      :type: string

      The identifier referring to the terminal this payment was created for. For example, ``term_utGtYu756h``.

   .. parameter:: cardNumber
      :type: string

      Only available if the payment has been completed - The last four digits of the card number.

   .. parameter:: cardFingerprint
      :type: string

      Only available if the payment has been completed - Unique alphanumeric representation of card, usable for
      identifying returning customers.

   .. parameter:: cardAudience
      :type: string

      Only available if the payment has been completed and if the data is available - The card's target audience.

      Possible values: ``consumer`` ``business`` ``null``

   .. parameter:: cardLabel
      :type: string

      Only available if the payment has been completed - The card's label. Note that not all labels can be processed
      through Mollie.

      Possible values: ``American Express`` ``Carta Si`` ``Carte Bleue`` ``Dankort`` ``Diners Club`` ``Discover``
      ``JCB`` ``Laser`` ``Maestro`` ``Mastercard`` ``Unionpay`` ``Visa`` ``null``

   .. parameter:: cardCountryCode
      :type: string

      Only available if the payment has been completed - The
      `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ country code of the country the card was
      issued in. For example: ``BE``.

SEPA Direct Debit
"""""""""""""""""
.. parameter:: details
   :type: object
   :collapse-children: false

   An object with payment details.

   .. parameter:: transferReference
      :type: string

      Transfer reference used by Mollie to identify this payment.

   .. parameter:: creditorIdentifier
      :type: string

      The creditor identifier indicates who is authorized to execute the payment. In this case, it is a reference to
      Mollie.

   .. parameter:: consumerName
      :type: string

      The consumer's name.

   .. parameter:: consumerAccount
      :type: string

      The consumer's IBAN.

   .. parameter:: consumerBic
      :type: string

      The consumer's bank's BIC.

   .. parameter:: dueDate
      :type: date

      Estimated date the payment is debited from the consumer's bank account, in ``YYYY-MM-DD`` format.

   .. parameter:: signatureDate
      :type: date

      Only available if the payment has been verified – Date the payment has been signed by the consumer, in
      ``YYYY-MM-DD`` format.

   .. parameter:: bankReasonCode
      :type: string

      Only available if the payment has failed – The official reason why this payment has failed. A detailed description
      of each reason is available on the website of the European Payments Council.

   .. parameter:: bankReason
      :type: string

      Only available if the payment has failed – A textual description of the failure reason.

   .. parameter:: endToEndIdentifier
      :type: string

      Only available for batch transactions – The original end-to-end identifier that you've specified in your batch.

   .. parameter:: mandateReference
      :type: string

      Only available for batch transactions – The original mandate reference that you've specified in your batch.

   .. parameter:: batchReference
      :type: string

      Only available for batch transactions – The original batch reference that you've specified in your batch.

   .. parameter:: fileReference
      :type: string

      Only available for batch transactions – The original file reference that you've specified in your batch.

SOFORT Banking
""""""""""""""
.. parameter:: details
   :type: object
   :collapse-children: false

   An object with payment details.

   .. parameter:: consumerName
      :type: string

      Only available if the payment has been completed – The consumer's name.

   .. parameter:: consumerAccount
      :type: string

      Only available if the payment has been completed – The consumer's IBAN.

   .. parameter:: consumerBic
      :type: string

      Only available if the payment has been completed – The consumer's bank's BIC.

Vouchers
""""""""
.. parameter:: details
   :type: object
   :collapse-children: false

   An object with payment details.

   .. parameter:: issuer
      :type: string

      The ID of the voucher brand that was used during the payment. When multiple vouchers are used, this is the issuer
      of the first voucher.

   .. parameter:: vouchers
      :type: array

      A list of details of all vouchers that are used for this payment. Each object will contain the following
      properties.

      .. parameter:: issuer
         :type: string

         The ID of the voucher brand that was used during the payment.

      .. parameter:: amount
         :type: amount object

         The amount that was paid with this voucher.

         .. parameter:: currency
            :type: string

            The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

         .. parameter:: value
            :type: string

            A string containing the exact amount of the voucher payment in the given currency.

   .. parameter:: remainderAmount
      :type: amount object

      Only available if another payment method was used to pay the remainder amount – The amount that was paid with
      another payment method for the remainder amount.

      .. parameter:: currency
         :type: string

         The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

      .. parameter:: value
         :type: string

         A string containing the remaining payment amount.

   .. parameter:: remainderMethod
      :type: string

      Only available if another payment method was used to pay the remainder amount – The payment method that was used
      to pay the remainder amount.

Mollie Connect response parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. parameter:: applicationFee
   :type: object
   :condition: optional
   :collapse: true

   The :doc:`application fee </connect/application-fees>`, if the payment was created with one.

   .. parameter:: amount
      :type: amount object

      The application fee amount as specified during payment creation.

      .. parameter:: currency
         :type: string

         The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

      .. parameter:: value
         :type: string

         A string containing the exact application fee amount in the given currency.

   .. parameter:: description
      :type: string

      The description of the application fee as specified during payment creation.

QR codes (optional)
^^^^^^^^^^^^^^^^^^^
A QR code object with payment method-specific values is available for certain payment methods if you pass the include
``details.qrCode`` to the resource endpoint.

The ``qrCode`` key in the ``details`` object will then become available. The key will contain this object:

.. parameter:: height
   :type: integer
   :collapse: true

   Height of the image in pixels.

.. parameter:: width
   :type: integer
   :collapse: true

   Width of the image in pixels.

.. parameter:: src
   :type: string
   :collapse: true

   The URI you can use to display the QR code. Note that we can send both data URIs as well as links to HTTPS images.
   You should support both.

For an implementation guide, see our :doc:`QR codes guide </payments/qr-codes>`.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/payments/tr_WDqYK6vllg \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $payment = $mollie->payments->get("tr_WDqYK6vllg");

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM")

      payment = mollie_client.payments.get("tr_WDqYK6vllg", embed="refunds,chargebacks", include="details.qrCode")

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      payment = Mollie::Payment.get('tr_WDqYK6vllg')

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      const payment = await mollieClient.payments.get('tr_Eq8xzWUPA4');

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "payment",
       "id": "tr_WDqYK6vllg",
       "mode": "test",
       "createdAt": "2018-03-20T13:13:37+00:00",
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
       "locale": "nl_NL",
       "restrictPaymentMethodsToCountry": "NL",
       "expiresAt": "2018-03-20T13:28:37+00:00",
       "details": null,
       "profileId": "pfl_QkEhN94Ba",
       "sequenceType": "oneoff",
       "redirectUrl": "https://webshop.example.org/order/12345/",
       "webhookUrl": "https://webshop.example.org/payments/webhook/",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
               "type": "application/hal+json"
           },
           "checkout": {
               "href": "https://www.mollie.com/payscreen/select-method/WDqYK6vllg",
               "type": "text/html"
           },
           "dashboard": {
               "href": "https://www.mollie.com/dashboard/org_12345678/payments/tr_WDqYK6vllg",
               "type": "text/html"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/payments-api/get-payment",
               "type": "text/html"
           }
       }
   }
