Get Payment Method API
======================
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

.. list-table::
   :widths: auto

   * - ``locale``

       .. type:: string
          :required: false

     - Passing a locale will translate the payment method name in the corresponding language.

       Possible values: ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
       ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV``
       ``lt_LT``

   * - ``currency``

       .. type:: string
          :required: false

     - The currency to receiving the ``minimumAmount`` and ``maximumAmount`` in. We will return an error when the currency
       is not supported by the payment method.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the following query string parameters are also available. With the ``profileId``
parameter, you must specify which profile you want to look at when listing methods. Organizations can have multiple
profiles for each of their websites. See :doc:`Profiles API </reference/v2/profiles-api/get-profile>` for more
information.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: true

     - The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to list all methods available in testmode.

.. _method-includes:

Includes
^^^^^^^^
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``issuers`` Include issuers available for the payment method (for iDEAL, KBC/CBC payment button, gift cards, or meal vouchers).
* ``pricing`` Include pricing for each payment method.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains a method object. Will always contain ``method`` for this endpoint.

   * - ``id``

       .. type:: string

     - The unique identifier of the payment method. When used during
       :doc:`payment creation </reference/v2/payments-api/create-payment>`, the payment method selection screen will be
       skipped.

   * - ``description``

       .. type:: string

     - The full name of the payment method, translated in the optional locale passed.

   * - ``minimumAmount``

       .. type:: amount object

     - An object containing ``value`` and ``currency``. It represents the minimum payment amount required to use this
       payment method.

   * - ``maximumAmount``

       .. type:: amount object

     - An object containing ``value`` and ``currency``. It represents the maximum payment amount allowed when using this
       payment method.

       .. note:: When there is no maximum amount for the payment method, this parameter will return ``null``.

   * - ``image``

       .. type:: image object

     - The URLs of images representing the payment method.

       .. list-table::
          :widths: auto

          * - ``size1x``

              .. type:: string

            - The URL for a payment method icon of 32x24 pixels.

          * - ``size2x``

              .. type:: string

            - The URL for a payment method icon of 64x48 pixels.

          * - ``svg``

              .. type:: string

            - The URL for a payment method icon in vector format. Usage of this format is preferred since it can scale
              to any desired size.

   * - ``status``

       .. type:: string

     - The status that the method is in. Possible values: ``activated`` ``pending-boarding`` ``pending-review`` ``pending-external`` ``rejected`` or ``null``

       .. list-table::
          :widths: auto

          * - ``activated``

              .. type:: string

            - The payment method is activated and ready for use.

          * - ``pending-boarding``

              .. type:: string

            - Mollie is waiting for you to finish onboarding in the Merchant Dashboard before the payment method can be activated.

          * - ``pending-review``

              .. type:: string

            - Mollie needs to review your request for this payment method before it can be activated.

          * - ``pending-external``

              .. type:: string

            - Activation of this payment method relies on you taking action with an external party, for example signing up with PayPal or a giftcard issuer.

          * - ``rejected``

              .. type:: string

            - Your request for this payment method was rejected. Whenever Mollie rejects such a request, you will always be informed via email.

          * - ``null``

            - This payment method was not requested.

   * - ``pricing``

       .. type:: array

     - Pricing set of the payment method what will be include if you add the :ref:`parameter <method-includes>`.

       .. list-table::
          :widths: auto

          * - ``description``

              .. type:: string

            - The area or product-type where the pricing is applied for, translated in the optional locale passed.

          * - ``fixed``

              .. type:: amount object

            - The fixed price per transaction

               .. list-table::
                  :widths: auto

                  * - ``currency``

                      .. type:: string

                    - The `ISO 4217 <https://en.wikipedia.org/wiki/ISO_4217>`_ currency code.

                  * - ``value``

                      .. type:: string

                    - A string containing the exact amount in the given currency.

          * - ``variable``

              .. type:: string

            - A string containing the percentage what will be charged over the payment amount besides the fixed price.

          * - ``feeRegion``

              .. type:: string
                 :required: false

            - This value is only available for credit card rates. It will correspond with the regions as documented in
              the :doc:`Payments API </reference/v2/payments-api/get-payment>`.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the payment method. Every URL object will contain an ``href`` and
       a ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the payment method itself.

          * - ``documentation``

              .. type:: URL object

            - The URL to the payment method retrieval endpoint documentation.

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
