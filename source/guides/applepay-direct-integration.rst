Direct integration of Apple Pay
===============================

Integrating `Apple Pay <https://developer.apple.com/apple-pay/>`_ in your own checkout allows you to add the "Checkout
with Pay" button as you deem fit. Apple provides `guidelines
<https://developer.apple.com/design/human-interface-guidelines/apple-pay/overview/introduction/>`_ on how and where
you should add the Apple Pay buttons.

.. figure:: images/applepay-web@2x.png

Beside payments information, Apple Pay allows you to get the billing and shipping addresses from the shopper too. This
enables a fast and frictionless checkout.

With the direct integration, you are responsible for implementing `Apple's JS APIs
<https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api>`_. Mollie will provide API endpoints
needed by the JS APIs and the ability to send the encrypted
`Apple Pay Payment Token <https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymenttoken>`_ when
creating a payment.

You do not need to join the Apple Developer Program for this integration.

Follow these steps to offer Apple Pay in your own checkout:

Prepare your server
-------------------

Your checkout *must* be served over HTTPS. Up to date TLS ciphers are required. For more information, see Apple's
documentation on `setting up your server
<https://developer.apple.com/documentation/apple_pay_on_the_web/setting_up_your_server>`_.

Apple Pay requires you to place a *domain validation file* on the domain you want to use the Apple Pay JS APIs on. The
presence and validity of this file will be validated by Apple.

Download the `domain validation file <http://www.mollie.com/.well-known/apple-developer-merchantid-domain-association>`_
and place it on your server at ``https://[domain]/.well-known/apple-developer-merchantid-domain-association``.

Check if Apple Pay is available on the device
---------------------------------------------

Check if Apple Pay is `available on the device
<https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/checking_for_apple_pay_availability>`_
using the `canMakePayments
<https://developer.apple.com/documentation/apple_pay_on_the_web/applepaysession/1778027-canmakepayments>`_ method.

If Apple Pay is available on the device, you should `display the Apple Pay Buttons
<https://developer.apple.com/documentation/apple_pay_on_the_web/displaying_apple_pay_buttons>`_.

Create an Apple Pay Session
---------------------------

When the shopper taps or clicks the Apple Pay Button, you should create an `Apple Pay Session
<https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/creating_an_apple_pay_session>`_. This
specifies all the information you want to display to the shopper and details on the payment.

When constructing the `ApplePayPaymentRequest
<https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentrequest>`_, you should set the
`supportedNetworks
<https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentrequest/1916122-supportednetworks>`_ to
``["amex", "maestro", "masterCard", "visa", "vPay"]``.

Providing merchant validation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The merchant validation proves (to Apple) that a validated merchant is calling the Apple Pay Javascript APIs. To perform
the validation, your server should make an API call to Mollie and pass the response to the Apple Pay Session object.

Please see Apple's documentation on `providing merchant validation
<https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/providing_merchant_validation>`_ for
details.

Instead of using Apple's API, you must use a :doc:`dedicated endpoint in the  Mollie API
</reference/v2/wallets-api/request-apple-pay-payment-session>`.

Send the Apple Pay Payment Token to Mollie
------------------------------------------

Once the shopper has authorized the payment, you will receive the `Apple Pay Payment object
<https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypayment>`_. You must then encode the object's
``token`` property to JSON and add the JSON as the ``applePayPaymentToken`` parameter when invoking the
:doc:`Create Payment API </reference/v2/payments-api/create-payment>` or the
:doc:`/reference/v2/orders-api/create-order`.

Example request
^^^^^^^^^^^^^^^

.. code-block:: none
    :caption: Create Payment API
    :linenos:

    POST /v2/payments HTTP/1.1
    Content-Type: application/json

    {
        "method": "applepay",
        "amount": {
            "currency": "EUR",
            "value": "100.00"
        },
        "description": "Order #1337",
        "applePayPaymentToken": "{\"paymentData\": {\"version\": \"EC_v1\", \"data\": \"vK3Bbr...lg==\"}}",
        "webhookUrl": "https://example.org/webhook"
    }



.. code-block:: none
    :caption: Create Order API
    :linenos:

    POST /v2/orders HTTP/1.1
    Content-Type: application/json

    {
        "method": "applepay",
        "amount": {
            "currency": "EUR",
            "value": "100.00"
        },
        "orderNumber": 1337,
        "payment": {
            "applePayPaymentToken": "{\"paymentData\": {\"version\": \"EC_v1\", \"data\": \"vK3Bbr...lg==\"}}",
        },
        "lines": [{
                "type": "physical",
                "sku": "5702016116977",
                "name": "LEGO 42083 Bugatti Chiron",
                "productUrl": "https://shop.lego.com/nl-NL/Bugatti-Chiron-42083",
                "imageUrl": "https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$",
                "metadata": "Some extra information about this orderline.",
                "quantity": 1,
                "vatRate": "25.00",
                "unitPrice": {
                    "currency": "EUR",
                    "value": "100.00"
                },
                "totalAmount": {
                    "currency": "EUR",
                    "value": "100.00"
                },
                "vatAmount": {
                    "currency": "EUR",
                    "value": "20.00"
                }
        }],
        "webhookUrl": "https://example.org/webhook"
    }

Handling errors
^^^^^^^^^^^^^^^

After your customer authorized the payment, you will still need authorization from the issuer of the card. This
authorization may fail, for example if your customer has insufficient balance remaining on the card. You will then
receive an error when creating the payment:

.. code-block:: none
   :linenos:

   HTTP/1.1 422 Unprocessable Entity
   Content-Type: application/hal+json

   {
        "status": 422,
        "title": "Unprocessable Entity",
        "detail": "The transaction was declined by the issuer",
        "_links": {
            "documentation": {
                "href": "https://docs.mollie.com/guides/handling-errors",
                "type": "text/html"
            }
        }
    }



