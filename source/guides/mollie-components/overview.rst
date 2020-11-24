Mollie Components
=================

*Mollie Components* is a set of Javascript APIs that allow you to add the fields needed for credit card holder data to
your own checkout, in a way that is fully :abbr:`PCI-DSS SAQ-A (Payment Card Industry Data Security Standard
Self-Assessment Questionnaire A)` compliant.

.. figure:: ../images/mollie-components-preview@2x.jpg

At a high level, it works by using a Javascript API to add fields to your checkout that your customer will use to enter
their credit card details, such as their card number.

Mollie Components does not give you access to the card holder data. Instead, when the checkout is submitted, you use
Mollie Components to exchange the card holder data for a ``cardToken`` which you can use with the
:doc:`Create Payment API </reference/v2/payments-api/create-payment>` or
:doc:`/reference/v2/orders-api/create-order`.

Depending on various factors, the payment will either be completed immediately or you will get a ``_links.checkout``
URL where your customer can perform the 3-D Secure authentication. If the customer authenticates successfully, the
payment is completed.

Implementation steps
--------------------

Follow these steps to implement Mollie Components in your checkout:

.. figure:: ../images/mollie-components-flow@2x.png

#. Add the Mollie Components Javascript library to your checkout.
#. Initialize the ``Mollie`` object.
#. Create and mount the four Components for the four credit card fields (card holder, card number, expiry date and
   :abbr:`CVC (Card Verification Code)`). This will add the fields to your checkout.
#. Add a ``submit`` event listener to your form to retrieve the ``cardToken`` when your customer has completed the
   checkout form.
#. Send the ``cardToken`` to your back end, by adding it to your form.
#. From your back end, create a credit card Payment or Order with the ``cardToken`` using the
   :doc:`Create Payment API </reference/v2/payments-api/create-payment>` or
   :doc:`/reference/v2/orders-api/create-order` respectively.
#. If required, redirect the shopper to the URL returned by our API for 3-D Secure authentication.

Mollie has created `example implementations <https://github.com/mollie/components-examples>`_ you can use to get started.

Add the Mollie Components Javascript library to your checkout
-------------------------------------------------------------

Start by including ``mollie.js`` in to your project. It should be added just before the ``</body>`` tag.

The Javascript file is located at ``https://js.mollie.com/v1/mollie.js``.

.. code-block:: html
   :linenos:

    <html>
      <head>
        <title>My Checkout</title>
      </head>
      <body>
        <script src="https://js.mollie.com/v1/mollie.js"></script>
      </body>
    </html>

.. note:: If you are using `Content Security Policy <https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP>`_, you
          should whitelist the ``js.mollie.com`` domain. We recommend using a strict CSP on your checkout.

Initialize the Mollie object
----------------------------

First, you need the Profile Id of the profile that you want to use. This can be found on the
`Developers - API-keys <https://www.mollie.com/dashboard/developers/api-keys>`_ page in the Dashboard or retrieved
programmatically using the :doc:`Get Current Profile API </reference/v2/profiles-api/get-profile-me>`.

After the script has loaded you can use the :ref:`components-mollie-constructor` function. This will return
an object that you can use for creating the four Components your customer will use to enter their card holder data.

.. code-block:: js
   :linenos:

   var mollie = Mollie('pfl_3RkSN1zuPE', { locale: 'nl_NL', testmode: false });

.. note:: Be aware the Profile Id is *not* your API key. Your API key is private and should never be used in a browser
          context. The Profile Id starts with ``pfl_``, where as API keys start with ``live_`` or ``test_``.

Create and mount the card holder data Components
------------------------------------------------

After initializing the Mollie object, you should create the four card holder data Components using the
:ref:`components-mollie-create-component` function and mount them in your checkout using the
:ref:`components-mollie-component-mount` function:

.. code-block:: html
   :linenos:

   <form>
     <div id="card-number"></div>
     <div id="card-number-error"></div>



     <div id="expiry-date"></div>
     <div id="expiry-date-error"></div>

     <div id="verification-code"></div>
     <div id="verification-code-error"></div>

     <button type="button">Pay</button>
   </form>

.. code-block:: js
   :linenos:

   var cardNumber = mollie.createComponent('cardNumber');
   cardNumber.mount('#card-number');

   var cardHolder = mollie.createComponent('cardHolder');
   cardHolder.mount('#card-holder');

   var expiryDate = mollie.createComponent('expiryDate');
   expiryDate.mount('#expiry-date');

   var verificationCode = mollie.createComponent('verificationCode');
   verificationCode.mount('#verification-code');

This will add the input fields to your checkout and make them visible for your customer. To add styling to the Components,
see :doc:`styling`.

Handling errors
---------------

Add a change event listener to each component to listen for errors. Displaying the error is up to you. The example below
assumes an empty element in which the error can be rendered.

Errors will be localized according to the locale defined when initializing Mollie Components.

.. code-block:: js
   :linenos:

   var cardNumberError = document.querySelector('#card-number-error');

   cardNumber.addEventListener('change', event => {
     if (event.error && event.touched) {
       cardNumberError.textContent = event.error;
     } else {
       cardNumberError.textContent = '';
     }
   });

Add a submit event listener to your form
----------------------------------------

Add a submit event listener to your form and use the :ref:`components-mollie-create-token` function to get the token.
You can then place the ``cardToken`` in a hidden input to submit it to your back end, for example:

.. code-block:: js
   :linenos:

   form.addEventListener('submit', async e => {
     e.preventDefault();

     const { token, error } = await mollie.createToken();

     if (error) {
       // Something wrong happened while creating the token. Handle this situation gracefully.
       return;
     }

     // Add token to the form
     const tokenInput = document.createElement('input');
     tokenInput.setAttribute('type', 'hidden');
     tokenInput.setAttribute('name', 'cardToken');
     tokenInput.setAttribute('value', token);

     form.appendChild(tokenInput);

     // Submit form to the server
     form.submit();
   });

Create a Payment or Order with the card token
---------------------------------------------

On your back end, you will receive the ``cardToken``. You need to pass this when
:doc:`creating a Payment </reference/v2/payments-api/create-payment>`. Additionally, you should set the ``method`` to
``creditcard``.

Alternatively, you can use the :doc:`/reference/v2/orders-api/create-order`. and pass the card token
via the ``payment.cardToken`` parameter.

The ``cardToken`` is valid for 1 hour.

Example
^^^^^^^
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/payments \
         -H "Authorization: Bearer live_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d "method=creditcard" \
         -d "amount[currency]=EUR" \
         -d "amount[value]=10.00" \
         -d "description=Order #12345" \
         -d "redirectUrl=https://webshop.example.org/order/12345/" \
         -d "webhookUrl=https://webshop.example.org/payments/webhook/" \
         -d "cardToken=tkn_UqAvArS3gw"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("live_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $payment = $mollie->payments->create([
            "method" => "creditcard",
            "amount" => [
                  "currency" => "EUR",
                  "value" => "10.00"
            ],
            "description" => "Order #12345",
            "redirectUrl" => "https://webshop.example.org/order/12345/",
            "webhookUrl" => "https://webshop.example.org/payments/webhook/",
            "cardToken" => "tkn_UqAvArS3gw",
      ]);

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key('live_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      payment = mollie_client.payments.create({
         'method': 'creditcard',
         'amount': {
               'currency': 'EUR',
               'value': '10.00'
         },
         'description': 'Order #12345',
         'webhookUrl': 'https://webshop.example.org/order/12345/',
         'redirectUrl': 'https://webshop.example.org/payments/webhook/',
         'cardToken': 'tkn_UqAvArS3gw'
      })

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'live_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      payment = Mollie::Payment.create(
        method: 'creditcard',
        amount: {
          currency: 'EUR',
          value: '10.00'
        },
        description: 'Order #12345',
        redirect_url: 'https://webshop.example.org/order/12345/',
        webhook_url: 'https://webshop.example.org/payments/webhook/',
        card_token: 'tkn_UqAvArS3gw'
      )

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'live_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const payment = await mollieClient.payments.create({
          method: 'creditcard',
          amount: {
            currency: 'EUR',
            value: '10.00', // We enforce the correct number of decimals through strings
          },
          description: 'Order #12345',
          redirectUrl: 'https://webshop.example.org/order/12345/',
          webhookUrl: 'https://webshop.example.org/payments/webhook/',
          cardToken: 'tkn_UqAvArS3gw'
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
       "profileId": "pfl_3RkSN1zuPE",
       "sequenceType": "oneoff",
       "details": {
          "cardToken": "tkn_UqAvArS3gw"
       },
       "redirectUrl": "https://webshop.example.org/order/12345/",
       "webhookUrl": "https://webshop.example.org/payments/webhook/",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS",
               "type": "application/json"
           },
           "checkout": {
               "href": "https://pay.mollie.com/authenticate/b47ef2ce1d3bea2ddadf3895080d1d4c",
               "type": "text/html"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/payments-api/create-payment",
               "type": "text/html"
           }
       }
   }

Make sure you use the API key that belongs to the same profile you used when initializing the ``Mollie`` object.

It is possible an error occurs when creating the payment. See :doc:`handling-errors` on what to do in such cases.

Redirect the shopper to the 3-D Secure authentication page
----------------------------------------------------------

In most cases, your payment will not be completed immediately but will first require a 3-D Secure authentication by your
customer. You should redirect your customer to the ``_links.checkout`` URL returned by the
:doc:`/reference/v2/payments-api/create-payment` or :doc:`/reference/v2/orders-api/create-order`.
Your customer can then authenticate him / herself with the card issuer.

.. code-block:: none
   :linenos:

   HTTP/1.1 303 See Other
   Date: Mon, 27 Jul 2019 12:28:53 GMT
   Location: https://pay.mollie.com/authenticate/b47ef2ce1d3bea2ddadf3895080d1d4c
   Connection: Closed

It is possible an error occurs during or after 3-D Secure authentication. See :doc:`handling-errors` on how to handle
these cases.

Browser support
---------------

Mollie Components supports the current and previous major release of the following browsers:

- Chrome
- Chrome for Android
- Safari
- Safari iOS
- Opera
- Firefox
- Edge

The latest release of Microsoft Internet Explorer 11 is supported as well.

If you need to support older browsers, you cannot use Mollie Components.
