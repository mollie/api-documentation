Get payment method
==================
.. api-name:: Methods API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/methods/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve a single method by its ID. Note that if a method is not available on the website profile a status
``404 Not found`` is returned. When the method is not enabled, a status ``403 Forbidden`` is returned. You can enable
payments methods via the :doc:`Enable payment method endpoint </reference/v2/profiles-api/enable-method>` in the
Profiles API, or via your `Mollie Dashboard <https://www.mollie.com/dashboard>`_.

If you do not know the method's ID, you can use the
:doc:`methods list endpoint </reference/v2/methods-api/list-methods>` to retrieve all payment methods that are
available.

Additionally, it is possible to check if Wallets such as :doc:`Apple Pay </wallets/applepay>` are enabled by passing the
wallet ID (``applepay``) as the method ID.

Parameters
----------
Replace ``id`` in the endpoint URL by the methods's ID. For example: ``https://api.mollie.com/v2/methods/ideal``.

.. parameter:: locale
   :type: string
   :condition: optional

   Passing a locale will translate the payment method name in the corresponding language.

   Possible values: ``en_US`` ``en_GB`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
   ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV`` ``lt_LT``

.. parameter:: currency
   :type: string
   :condition: optional

   The currency to receiving the ``minimumAmount`` and ``maximumAmount`` in. We will return an error when the currency
   is not supported by the payment method.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, you have to specify which profile you are retrieving the payment method details
for using the ``profileId`` parameter. Organizations can have multiple profiles for each of their websites. See
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

   Set this to ``true`` to list all methods available in testmode.

.. _method-includes:

Includes
^^^^^^^^
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``issuers`` Include issuers available for the payment method (for iDEAL, KBC/CBC payment button, gift cards, or meal
  vouchers).
* ``pricing`` Include pricing for each payment method.

Response
--------
``200`` ``application/hal+json``

.. parameter:: resource
   :type: string

   Indicates the response contains a method object. Will always contain ``method`` for this endpoint.

.. parameter:: id
   :type: string

   The unique identifier of the payment method. When used during
   :doc:`payment creation </reference/v2/payments-api/create-payment>`, the payment method selection screen will be
   skipped.

.. parameter:: description
   :type: string

   The full name of the payment method, translated in the optional locale passed.

.. parameter:: minimumAmount
   :type: amount object

   The minimum payment amount required to use this payment method.

   .. parameter:: currency
      :type: string

      An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

   .. parameter:: value
      :type: string

      A string containing the exact amount in the given currency.

.. parameter:: maximumAmount
   :type: amount object

   The maximum payment amount allowed when using this payment method.

   .. note:: When there is no maximum amount for the payment method, this parameter will return ``null``.

   .. parameter:: currency
      :type: string

      An `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

   .. parameter:: value
      :type: string

      A string containing the exact amount in the given currency.

.. parameter:: image
   :type: image object

   The URLs of images representing the payment method.

   .. parameter:: size1x
      :type: string

      The URL for a payment method icon of 32x24 pixels.

   .. parameter:: size2x
      :type: string

      The URL for a payment method icon of 64x48 pixels.

   .. parameter:: svg
      :type: string

      The URL for a payment method icon in vector format. Usage of this format is preferred since it can scale to any
      desired size.

.. parameter:: status
   :type: string

   The status that the method is in.

   Possible values:

   * ``activated``: The payment method is activated and ready for use.
   * ``pending-boarding``: Mollie is waiting for you to finish onboarding in the Merchant Dashboard before the payment
     method can be activated.
   * ``pending-review``: Mollie needs to review your request for this payment method before it can be activated.
   * ``pending-external``: Activation of this payment method relies on you taking action with an external party, for
     example signing up with PayPal or a giftcard issuer.
   * ``rejected``: Your request for this payment method was rejected. Whenever Mollie rejects such a request, you will
     always be informed via email.
   * ``null``: This payment method was not requested.

.. parameter:: pricing
   :type: array

   Pricing set of the payment method what will be include if you add the :ref:`parameter <method-includes>`.

   .. parameter:: description
      :type: string

      The area or product-type where the pricing is applied for, translated in the optional locale passed.

   .. parameter:: fixed
      :type: amount object

      The fixed price per transaction.

      .. parameter:: currency
         :type: string

         The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

      .. parameter:: value
         :type: string

         A string containing the exact amount in the given currency.

   .. parameter:: variable
      :type: string

      A string containing the percentage what will be charged over the payment amount besides the fixed price.

   .. parameter:: feeRegion
      :type: string
      :condition: optional

      This value is only available for credit card rates. It will correspond with the regions as documented in the
      :doc:`Payments API </reference/v2/payments-api/get-payment>`.

.. parameter:: _links
   :type: object

   An object with several URL objects relevant to the payment method. Every URL object will contain an ``href`` and a
   ``type`` field.

   .. parameter:: self
      :type: URL object

      The API resource URL of the payment method itself.

   .. parameter:: documentation
      :type: URL object

      The URL to the payment method retrieval endpoint documentation.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/methods/ideal?include=issuers \
         -H "Authorization: Bearer live_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $mollie->methods->get("ideal", ["include" => "issuers,pricing"]);

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')
      mollie_client.methods.get('ideal', include='issuers,pricing')

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      Mollie::Method.get('ideal', include: 'issuers,pricing')

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const method = await mollieClient.methods.get('ideal', { include: ['issuers', 'pricing'] });
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
        "resource": "method",
        "id": "ideal",
        "description": "iDEAL",
        "minimumAmount": {
            "value": "0.01",
            "currency": "EUR"
        },
        "maximumAmount": {
            "value": "50000.00",
            "currency": "EUR"
        },
        "image": {
            "size1x": "https://www.mollie.com/external/icons/payment-methods/ideal.png",
            "size2x": "https://www.mollie.com/external/icons/payment-methods/ideal%402x.png",
            "svg": "https://www.mollie.com/external/icons/payment-methods/ideal.svg"
        },
        "issuers": [
            {
                "resource": "issuer",
                "id": "ideal_ABNANL2A",
                "name": "ABN AMRO",
                "image": {
                    "size1x": "https://www.mollie.com/external/icons/ideal-issuers/ABNANL2A.png",
                    "size2x": "https://www.mollie.com/external/icons/ideal-issuers/ABNANL2A%402x.png",
                    "svg": "https://www.mollie.com/external/icons/ideal-issuers/ABNANL2A.svg"
                }
            },
            {
                "resource": "issuer",
                "id": "ideal_ASNBNL21",
                "name": "ASN Bank",
                "image": {
                    "size1x": "https://www.mollie.com/external/icons/ideal-issuers/ASNBNL21.png",
                    "size2x": "https://www.mollie.com/external/icons/ideal-issuers/ASNBNL21%402x.png",
                    "svg": "https://www.mollie.com/external/icons/ideal-issuers/ASNBNL21.svg"
                }
            },
            { },
            { }
        ],
        "status": "activated",
        "pricing": [
            {
                "description": "The Netherlands",
                "fixed": {
                    "value": "0.29",
                    "currency": "EUR"
                },
                "variable": "0"
            }
        ],
        "_links": {
            "self": {
                "href": "https://api.mollie.com/v2/methods/ideal",
                "type": "application/hal+json"
            },
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/methods-api/get-method",
                "type": "text/html"
            }
        }
    }
