Get payment
===========
.. api-name:: Payments API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/payments/*id*

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve a single payment object by its payment token.

.. note:: We call your webhook when the :doc:`payment status changes </payments/status-changes>`, so there's no
          need to poll this endpoint for status changes.

Parameters
----------
Replace ``id`` in the endpoint URL by the payment's ID, for example ``tr_7UhSN1zuXS``.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you are creating an app with Mollie Connect (OAuth), the ``testmode`` parameter is available. You must pass this as a
parameter in the query string if you want to retrieve a payment that was created in test mode.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to get a payment made in test mode. If you omit this parameter, you can only retrieve live
       mode payments.

Includes
^^^^^^^^
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``details.qrCode`` Include a :doc:`QR code </guides/qr-codes>` object. Only available for iDEAL, Bitcoin, Bancontact
  and bank transfer payments.

Embedding of related resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This endpoint also allows for embedding additional information by appending the following values via the ``embed``
query string parameter.

* ``refunds`` Include any :doc:`refunds </reference/v2/refunds-api/get-refund>` created for the payment.
* ``chargebacks`` Include any :doc:`chargebacks </reference/v2/chargebacks-api/get-chargeback>` issued for the payment.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a payment object. Will always contain ``payment`` for this endpoint.

   * - ``id``

       .. type:: string

     - The identifier uniquely referring to this payment. Mollie assigns this identifier at payment creation time. For
       example ``tr_7UhSN1zuXS``. Its ID will always be used by Mollie to refer to a certain payment.

   * - ``mode``

       .. type:: string

     - The mode used to create this payment. Mode determines whether a payment is *real* (live mode) or a *test*
       payment.

       Possible values: ``live`` ``test``

   * - ``createdAt``

       .. type:: datetime

     - The payment's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``status``

       .. type:: string

     - The payment's status. Please refer to the documentation regarding statuses for more info about which statuses
       occur at what point.

   * - ``isCancelable``

       .. type:: boolean

     - Whether or not the payment can be canceled.

   * - ``paidAt``

       .. type:: datetime

     - The date and time the payment became paid, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_
       format. This parameter is omitted if the payment is not completed (yet).

   * - ``canceledAt``

       .. type:: datetime

     - The date and time the payment was canceled, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_
       format. This parameter is omitted if the payment is not canceled (yet).

   * - ``expiresAt``

       .. type:: datetime

     - The date and time the payment will expire, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

   * - ``expiredAt``

       .. type:: datetime

     - The date and time the payment was expired, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_
       format. This parameter is omitted if the payment did not expire (yet).

   * - ``failedAt``

       .. type:: datetime

     - The date and time the payment failed, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.
       This parameter is omitted if the payment did not fail (yet).

   * - ``amount``

       .. type:: amount object

     - The amount of the payment, e.g. ``{"currency":"EUR", "value":"100.00"}`` for a €100.00 payment.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

          * - ``value``

              .. type:: string

            - A string containing the exact amount of the payment in the given currency.

   * - ``amountRefunded``

       .. type:: amount object

     - The total amount that is already refunded. Only available when refunds are available for this payment.
       For some payment methods, this amount may be higher than the payment amount, for example to allow reimbursement
       of the costs for a return shipment to the customer.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

          * - ``value``

              .. type:: string

            - A string containing the exact refunded amount of the payment in the given currency.

   * - ``amountRemaining``

       .. type:: amount object

     - The remaining amount that can be refunded. Only available when refunds are available for this payment.

       .. list-table::
          :widths: auto

          * - ``currency``

              .. type:: string

            - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

          * - ``value``

              .. type:: string

            - A string containing the exact refundable amount of the payment in the given currency.

   * - ``description``

       .. type:: string

     - A short description of the payment. The description is visible in the Dashboard and will be shown on the
       customer's bank or card statement when possible.

   * - ``redirectUrl``

       .. type:: string

     - The URL the customer will be redirected to after completing or cancelling the payment process.

       Note the URL will not be present for recurring payments.

   * - ``webhookUrl``

       .. type:: string

     - The URL Mollie will call as soon an important status change takes place.

   * - ``method``

       .. type:: string

     - The payment method used for this payment, either forced on creation by specifying the ``method`` parameter, or
       chosen by the customer on our payment method selection screen.

       If the payment is only partially paid with a gift card, the method remains ``giftcard``.

       Possible values: ``bancontact`` ``banktransfer`` ``belfius`` ``bitcoin`` ``creditcard`` ``directdebit`` ``eps``
       ``giftcard`` ``giropay`` ``ideal`` ``inghomepay`` ``kbc`` ``paypal`` ``paysafecard`` ``sofort``

   * - ``metadata``

       .. type:: mixed

     - The optional metadata you provided upon payment creation. Metadata can for example be used to link an order to a
       payment.

   * - ``locale``

       .. type:: string

     - The customer's locale, either forced on creation by specifying the ``locale`` parameter, or detected
       by us during checkout. Will be a full locale, for example ``nl_NL``.

   * - ``countryCode``

       .. type:: string

     - The customer's `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ country code,
       detected by us during checkout. For example: ``BE``.

   * - ``profileId``

       .. type:: string

     - The identifier referring to the profile this payment was created on. For example, ``pfl_QkEhN94Ba``.

   * - ``settlementAmount``

       .. type:: amount object|null

     -   This optional field will contain the amount that will be settled to your account, converted to the currency
         your account is settled in. It follows the same syntax as the ``amount`` property.

         Any amounts not settled by Mollie will not be reflected in this amount, e.g. PayPal or gift cards.

   * - ``settlementId``

       .. type:: string

     - The identifier referring to the settlement this payment was settled with. For example, ``stl_BkEjN2eBb``.

   * - ``customerId``

       .. type:: string

     - If a customer was specified upon payment creation, the customer's token will be available here as well. For
       example, ``cst_XPn78q9CfT``.

   * - ``sequenceType``

       .. type:: string

     - Indicates which type of payment this is in a recurring sequence. Set to ``first`` for
       :ref:`first payments <payments/recurring/first-payment>` that allow the customer to agree to automatic recurring
       charges taking place on their account in the future. Set to ``recurring`` for payments where the customer's card
       is charged automatically.

       Set to ``oneoff`` by default, which indicates the payment is a regular non-recurring payment.

       Possible values: ``oneoff`` ``first`` ``recurring``

   * - ``mandateId``

       .. type:: string

     - If the payment is a recurring payment, this field will hold the ID of the mandate used to authorize
       the recurring payment.

   * - ``subscriptionId``

       .. type:: string

     - When implementing the Subscriptions API, any recurring charges resulting from the subscription will
       hold the ID of the subscription that triggered the payment.

   * - ``applicationFee``

       .. type:: object

     - The :doc:`application fee </oauth/application-fees>`, if the payment was created with one.

       .. list-table::
          :widths: auto

          * - ``amount``

              .. type:: amount object

            - The application fee amount as specified during payment creation.

              .. list-table::
                 :widths: auto

                 * - ``currency``

                     .. type:: string

                   - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

                 * - ``value``

                     .. type:: string

                   - A string containing the exact application fee amount in the given currency.

          * - ``description``

              .. type:: string

            - The description of the application fee as specified during payment creation.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the payment. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the payment itself.

          * - ``checkout``

              .. type:: URL object

            - The URL your customer should visit to make the payment. This is where you should redirect the
              consumer to.

              .. note :: You should use HTTP ``GET`` for the redirect to the checkout URL. Using HTTP ``POST`` for
                         redirection will cause issues with some payment methods or iDEAL issuers. Use HTTP status code
                         ``303 See Other`` to force an HTTP ``GET`` redirect.

              Recurring payments don't have a checkout URL.

          * - ``refunds``

              .. type:: URL object

            - The API resource URL of the refunds that belong to this payment.

          * - ``chargebacks``

              .. type:: URL object

            - The API resource URL of the chargebacks that belong to this payment.

          * - ``settlement``

              .. type:: URL object

            - The API resource URL of the settlement this payment has been settled with. Not present if not yet settled.

          * - ``documentation``

              .. type:: URL object

            - The URL to the payment retrieval endpoint documentation.

          * - ``mandate``

              .. type:: URL object

            - The API resource URL of the mandate linked to this payment. Not present if a one-off payment.

          * - ``subscription``

              .. type:: URL object

            - The API resource URL of the subscription this payment is part of. Not present if not a subscription
              payment.

          * - ``customer``

              .. type:: URL object

            - The API resource URL of the customer this payment belongs to. Not present if not linked to a customer.

Payment method specific details
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If the payment has been created with a ``method``, or if the customer selected a method in the payment method selection
screen, a ``details`` object becomes available on the payment object. This object contains detail fields specific to the
selected payment method.

Bancontact
""""""""""
.. list-table::
   :widths: auto

   * - ``details``

       .. type:: object

     - An object with payment details.

       .. list-table::
          :widths: auto

          * - ``cardNumber``

              .. type:: string

            - Only available if the payment is completed - The last four digits of the card number.

          * - ``cardFingerprint``

              .. type:: string

            - Only available if the payment is completed - Unique alphanumeric representation of card, usable for
              identifying returning customers.

          * - ``qrCode``

              .. type:: QR code object

            - Only available if requested during payment creation - The QR code that can be scanned by the mobile
              Bancontact application. This enables the desktop to mobile feature.

Bank transfer
"""""""""""""
.. list-table::
   :widths: auto

   * - ``details``

       .. type:: object

     - An object with payment details.

       .. list-table::
          :widths: auto

          * - ``bankName``

              .. type:: string

            - The name of the bank the consumer should wire the amount to.

          * - ``bankAccount``

              .. type:: string

            - The IBAN the consumer should wire the amount to.

          * - ``bankBic``

              .. type:: string

            - The BIC of the bank the consumer should wire the amount to.

          * - ``transferReference``

              .. type:: string

            - The reference the consumer should use when wiring the amount. Note you should not apply any formatting
              here; show it to the consumer as-is.

          * - ``consumerName``

              .. type:: string

            - Only available if the payment has been completed – The consumer's name.

          * - ``consumerAccount``

              .. type:: string

            - Only available if the payment has been completed – The consumer's bank account. This may be an IBAN, or it
              may be a domestic account number.

          * - ``consumerBic``

              .. type:: string

            - Only available if the payment has been completed – The consumer's bank's BIC / SWIFT code.

          * - ``billingEmail``

              .. type:: string

            - Only available if filled out in the API or by the consumer – The email address which the consumer asked
              the payment instructions to be sent to.

   * - ``_links``

       .. type:: object

     - For bank transfer payments, the ``_links`` object will contain some additional URL objects relevant to the
       payment.

       .. list-table::
          :widths: auto

          * - ``status``

              .. type:: URL object

            - A link to a hosted payment page where your customer can check the status of their payment.

          * - ``payOnline``

              .. type:: URL object

            - A link to a hosted payment page where your customer can finish the payment using an alternative payment
              method also activated on your website profile.

Belfius Pay Button
""""""""""""""""""
.. list-table::
   :widths: auto

   * - ``details``

       .. type:: object

     - An object with payment details.

       .. list-table::
          :widths: auto

          * - ``consumerName``

              .. type:: string

            - Only available one banking day after the payment has been completed – The consumer's name.

          * - ``consumerAccount``

              .. type:: string

            - Only available one banking day after the payment has been completed – The consumer's IBAN.

          * - ``consumerBic``

              .. type:: string

            - Only available one banking day after the payment has been completed – ``GKCCBEBB``.

Bitcoin
"""""""
.. list-table::
   :widths: auto

   * - ``details``

       .. type:: object

     - An object with payment details.

       .. list-table::
          :widths: auto

          * - ``bitcoinAddress``

              .. type:: string

            - Only available if the payment has been completed – The bitcoin address the bitcoins were transferred to.

          * - ``bitcoinAmount``

              .. type:: amount object

            - The amount transferred in XBT.

          * - ``bitcoinUri``

              .. type:: string

            - An URI that is understood by Bitcoin wallet clients and will cause such clients to prepare the
              transaction. Follows the
              `BIP 21 URI scheme <https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki>`_.

          * - ``qrCode``

              .. type:: QR code object

            - Only available if requested during payment creation - The QR code that can be scanned by Bitcoin wallet
              clients and will cause such clients to prepare the transaction.

Credit card
"""""""""""
.. list-table::
   :widths: auto

   * - ``details``

       .. type:: object

     - An object with payment details.

       .. list-table::
          :widths: auto

          * - ``cardHolder``

              .. type:: string

            - Only available if the payment has been completed - The card holder's name.

          * - ``cardNumber``

              .. type:: string

            - Only available if the payment has been completed - The last four digits of the card number.

          * - ``cardFingerprint``

              .. type:: string

            - Only available if the payment has been completed - Unique alphanumeric representation of card, usable for
              identifying returning customers.

          * - ``cardAudience``

              .. type:: string

            - Only available if the payment has been completed and if the data is available - The card's target
              audience.

              Possible values: ``consumer`` ``business`` ``null``

          * - ``cardLabel``

              .. type:: string

            - Only available if the payment has been completed - The card's label. Note that not all labels can be
              processed through Mollie.

              Possible values: ``American Express`` ``Carta Si`` ``Carte Bleue`` ``Dankort`` ``Diners Club``
              ``Discover`` ``JCB`` ``Laser`` ``Maestro`` ``Mastercard`` ``Unionpay`` ``Visa`` ``null``

          * - ``cardCountryCode``

              .. type:: string

            - Only available if the payment has been completed - The
              `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ country code of the country the
              card was issued in. For example: ``BE``.

          * - ``cardSecurity``

              .. type:: string

            - Only available if the payment has been completed – The type of security used during payment processing.

              Possible values: ``normal`` ``3dsecure``

          * - ``feeRegion``

              .. type:: string

            - Only available if the payment has been completed – The fee region for the payment: ``intra-eu`` for
              consumer cards from the EU, and ``other`` for all other cards.

              Possible values: ``intra-eu`` ``other``

          * - ``failureReason``

              .. type:: string

            - Only available for failed payments. Contains a failure reason code.

              Possible values: ``invalid_card_number`` ``invalid_cvv`` ``invalid_card_holder_name`` ``card_expired``
              ``invalid_card_type`` ``refused_by_issuer`` ``insufficient_funds`` ``inactive_card``

Gift cards
""""""""""
.. list-table::
   :widths: auto

   * - ``details``

       .. type:: object

     - An object with payment details.

       .. list-table::
          :widths: auto

          * - ``voucherNumber``

              .. type:: string

            - The voucher number, with the last four digits masked. When multiple gift cards are used, this is the first
              voucher number. Example: ``606436353088147****``.

          * - ``giftcards``

              .. type:: array

            - A list of details of all giftcards that are used for this payment. Each object will contain the following
              properties.

              .. list-table::
                 :widths: auto

                 * - ``issuer``

                     .. type:: string

                   - The ID of the gift card brand that was used during the payment.

                 * - ``amount``

                     .. type:: amount object

                   - The amount in EUR that was paid with this gift card.

                     .. list-table::
                        :widths: auto

                        * - ``currency``

                            .. type:: string

                          - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

                        * - ``value``

                            .. type:: string

                          - A string containing the exact amount of the gift card payment in the given currency.

                 * - ``voucherNumber``

                     .. type:: string

                   - The voucher number, with the last four digits masked. Example: ``606436353088147****``

          * - ``remainderAmount``

              .. type:: amount object

            - Only available if another payment method was used to pay the remainder amount – The amount that was paid
              with another payment method for the remainder amount.

              .. list-table::
                 :widths: auto

                 * - ``currency``

                     .. type:: string

                   - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

                 * - ``value``

                     .. type:: string

                   - A string containing the remaining payment amount.

          * - ``remainderMethod``

              .. type:: string

            - Only available if another payment method was used to pay the remainder amount – The payment method that
              was used to pay the remainder amount.

iDEAL
"""""
.. list-table::
   :widths: auto

   * - ``details``

       .. type:: object

     - An object with payment details.

       .. list-table::
          :widths: auto

          * - ``consumerName``

              .. type:: string

            - Only available if the payment has been completed – The consumer's name.

          * - ``consumerAccount``

              .. type:: string

            - Only available if the payment has been completed – The consumer's IBAN.

          * - ``consumerBic``

              .. type:: string

            - Only available if the payment has been completed – The consumer's bank's BIC.

ING Home'Pay
""""""""""""
.. list-table::
   :widths: auto

   * - ``details``

       .. type:: object

     - An object with payment details.

       .. list-table::
          :widths: auto

          * - ``consumerName``

              .. type:: string

            - Only available one banking day after the payment has been completed – The consumer's name.

          * - ``consumerAccount``

              .. type:: string

            - Only available one banking day after the payment has been completed – The consumer's IBAN.

          * - ``consumerBic``

              .. type:: string

            - Only available one banking day after the payment has been completed – ``BBRUBEBB``.

KBC/CBC Payment Button
""""""""""""""""""""""
.. list-table::
   :widths: auto

   * - ``details``

       .. type:: object

     - An object with payment details.

       .. list-table::
          :widths: auto

          * - ``consumerName``

              .. type:: string

            - Only available one banking day after the payment has been completed – The consumer's name.

          * - ``consumerAccount``

              .. type:: string

            - Only available one banking day after the payment has been completed – The consumer's IBAN.

          * - ``consumerBic``

              .. type:: string

            - Only available one banking day after the payment has been completed – The consumer's bank's BIC.

PayPal
""""""
.. list-table::
   :widths: auto

   * - ``details``

       .. type:: object

     - An object with payment details.

       .. list-table::
          :widths: auto

          * - ``consumerName``

              .. type:: string

            - Only available if the payment has been completed – The consumer's first and last name.

          * - ``consumerAccount``

              .. type:: string

            - Only available if the payment has been completed – The consumer's email address.

          * - ``paypalReference``

              .. type:: string

            - PayPal's reference for the transaction, for instance ``9AL35361CF606152E``.

paysafecard
"""""""""""
.. list-table::
   :widths: auto

   * - ``details``

       .. type:: object

     - An object with payment details.

       .. list-table::
          :widths: auto

          * - ``customerReference``

              .. type:: string

            - The consumer identification supplied when the payment was created.

SEPA Direct Debit
"""""""""""""""""
.. list-table::
   :widths: auto

   * - ``details``

       .. type:: object

     - An object with payment details.

       .. list-table::
          :widths: auto

          * - ``transferReference``

              .. type:: string

            - Transfer reference used by Mollie to identify this payment.

          * - ``creditorIdentifier``

              .. type:: string

            - The creditor identifier indicates who is authorized to execute the payment. In this case, it is a
              reference to Mollie.

          * - ``consumerName``

              .. type:: string

            - The consumer's name.

          * - ``consumerAccount``

              .. type:: string

            - The consumer's IBAN.

          * - ``consumerBic``

              .. type:: string

            - The consumer's bank's BIC.

          * - ``dueDate``

              .. type:: date

            - Estimated date the payment is debited from the consumer's bank account, in ``YYYY-MM-DD`` format.

          * - ``signatureDate``

              .. type:: date

            - Only available if the payment has been verified – Date the payment has been signed by the consumer, in
              ``YYYY-MM-DD`` format.

          * - ``bankReasonCode``

              .. type:: string

            - Only available if the payment has failed – The official reason why this payment has failed. A detailed
              description of each reason is available on the website of the European Payments Council.

          * - ``bankReason``

              .. type:: string

            - Only available if the payment has failed – A textual desciption of the failure reason.

          * - ``endToEndIdentifier``

              .. type:: string

            - Only available for batch transactions – The original end-to-end identifier that you've specified in your
              batch.

          * - ``mandateReference``

              .. type:: string

            - Only available for batch transactions – The original mandate reference that you've specified in your
              batch.

          * - ``batchReference``

              .. type:: string

            - Only available for batch transactions – The original batch reference that you've specified in your batch.

          * - ``fileReference``

              .. type:: string

            - Only available for batch transactions – The original file reference that you've specified in your batch.

SOFORT Banking
""""""""""""""
.. list-table::
   :widths: auto

   * - ``details``

       .. type:: object

     - An object with payment details.

       .. list-table::
          :widths: auto

          * - ``consumerName``

              .. type:: string

            - Only available if the payment has been completed – The consumer's name.

          * - ``consumerAccount``

              .. type:: string

            - Only available if the payment has been completed – The consumer's IBAN.

          * - ``consumerBic``

              .. type:: string

            - Only available if the payment has been completed – The consumer's bank's BIC.

QR codes (optional)
^^^^^^^^^^^^^^^^^^^
A QR code object with payment method specific values is available for certain payment methods if you pass the include
``details.qrCode`` to the resource endpoint.

The ``qrCode`` key in the ``details`` object will then become available. The key will contain this object:

.. list-table::
   :widths: auto

   * - ``height``

       .. type:: integer

     - Height of the image in pixels.

   * - ``width``

       .. type:: integer

     - Width of the image in pixels.

   * - ``src``

       .. type:: string

     - The URI you can use to display the QR code. Note that we can send both data URIs as well as links to HTTPS
       images. You should support both.

For an implemention guide, see our :doc:`QR codes guide </guides/qr-codes>`.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/payments/tr_WDqYK6vllg \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
    $payment = $mollie->payments->get("tr_WDqYK6vllg");

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

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
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/payments-api/get-payment",
               "type": "text/html"
           }
       }
   }
