Requesting Apple Pay Payment Session
====================================
.. api-name:: Miscellaneous
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/wallets/applepay/sessions

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

For integrating :doc:`Apple Pay </wallets/applepay>` in your own checkout on the web, you need to `provide merchant validation
<https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/providing_merchant_validation>`_. This
is normally done using Apple's `Requesting Apple Pay Session
<https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/requesting_an_apple_pay_payment_session>`_.
The merchant validation proves (to Apple) that a validated merchant is calling the Apple Pay Javascript APIs.

When integrating Apple Pay via Mollie, you cannot call Apple's API but you should call this API instead. The response of
this API call should be passed as-is to the the completion method, `completeMerchantValidation
<https://developer.apple.com/documentation/apple_pay_on_the_web/applepaysession/1778015-completemerchantvalidation>`_.

Before requesting an Apple Pay Payment Session, you must place the  `domain validation file
<http://www.mollie.com/.well-known/apple-developer-merchantid-domain-association>`_ on your server at:
``https://[domain]/.well-known/apple-developer-merchantid-domain-association``. Without this file, it will not be
possible to use Apple Pay on your domain.

The guidelines for working with a payment session are:

- Request a new payment session object for each transaction. You can only use a merchant session object a single time.

- The payment session object expires five minutes after it is created.

- Never request the payment session from the browser. The request must be sent from your server.

For the full documentation, see the official `Apple Pay JS API
<https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api>`_ documentation.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the only mandatory extra parameter is the ``profileId`` parameter. Data from the
profile will be used for Apple Pay, for example the name of the profile will be displayed on the touch bar, if the
payment is used on a MacBook with touch bar.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: true

     - The payment profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``validationUrl``

       .. type:: string
          :required: true

     - The ``validationUrl`` you got from the `ApplePayValidateMerchant event <https://developer.apple.com/documentation/apple_pay_on_the_web/applepayvalidatemerchantevent>`_.

       A `list of all valid host names <https://developer.apple.com/documentation/apple_pay_on_the_web/setting_up_your_server#3172427>`_
       for merchant validation is available. You should white list these in your application and reject any
       ``validationUrl`` that have a host name not in the list.

   * - ``domain``

       .. type:: string
          :required: true

     - The domain of your web shop, that is visible in the browser's location bar. For example ``pay.myshop.com``.

Example
-------

Request
^^^^^^^

.. code-block:: none
   :linenos:

   POST /v2/wallets/applepay/sessions HTTP/1.1
   Authorization: Bearer live_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM
   Content-Type: application/json

   {
       "domain": "pay.mywebshop.com",
       "validationUrl": "https://apple-pay-gateway-cert.apple.com/paymentservices/paymentSession",
   }

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json

   {
       "epochTimestamp": 1555507053169,
       "expiresAt": 1555510653169,
       "merchantSessionIdentifier": "SSH2EAF8AFAEAA94DEEA898162A5DAFD36E_916523AAED1343F5BC5815E12BEE9250AFFDC1A17C46B0DE5A943F0F94927C24",
       "nonce": "0206b8db",
       "merchantIdentifier": "BD62FEB196874511C22DB28A9E14A89E3534C93194F73EA417EC566368D391EB",
       "domainName": "pay.example.org",
       "displayName": "Chuck Norris's Store",
       "signature": "308006092a864886f7...8cc030ad3000000000000"
   }
