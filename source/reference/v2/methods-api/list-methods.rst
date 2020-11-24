List payment methods
====================
.. api-name:: Methods API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/methods

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all enabled payment methods. The results are not paginated.

* For test mode, payment methods are returned that are enabled in the Dashboard (or the activation is pending).
* For live mode, payment methods are returned that have been activated on your account and have been enabled in the
  Dashboard.

New payment methods can be activated via the :doc:`Enable payment method endpoint </reference/v2/profiles-api/enable-method>`
in the Profiles API.

When using the ``first`` sequence type, methods will be returned if they can be used as a first payment in a recurring
sequence and if they are enabled in the Dashboard.

When using the ``recurring`` sequence type, payment methods that can be used for recurring payments or subscriptions
will be returned. Enabling / disabling methods in the dashboard does not affect how they can be used for recurring
payments.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``sequenceType``

       .. type:: string
          :required: false

     - Passing ``first`` will only show payment methods eligible for making a first payment. Passing
       ``recurring`` shows payment methods which can be used to automatically charge your customer's account when
       authorization has been given. Set to ``oneoff`` by default, which indicates the payment method is available for a
       regular non-recurring payment.

       Possible values: ``oneoff`` ``first`` ``recurring``

   * - ``locale``

       .. type:: string
          :required: false

     - Passing a locale will sort the payment methods in the preferred order for the country, and translate
       the payment method names in the corresponding language.

       Possible values: ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
       ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV``
       ``lt_LT``

   * - ``amount``

       .. type:: amount object
          :required: false

     - An object containing ``value`` and ``currency``. Only payment methods that support the amount and currency
       are returned.

       Example: ``https://api.mollie.com/v2/methods?amount[value]=100.00&amount[currency]=USD``

   * - ``resource``

       .. type:: string
          :required: false

     - Use the ``resource`` parameter to indicate if you will use the result with the
       :doc:`Create Order </reference/v2/orders-api/create-order>` or :doc:`Create
       Payment </reference/v2/payments-api/create-payment>` API.

       For example: when passing ``orders`` the result will include payment methods that can only be used in conjunction
       with orders, such as *Klarna Pay later* and meal vouchers. Default behaviour is returning all
       available payment methods for ``payments``.

       Possible values: ``orders`` ``payments``.

   * - ``billingCountry``

       .. type:: string
          :required: false

     - The billing country of your customer in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_
       format. This parameter can be used to check whether your customer is eligible for certain payment methods, for
       example *Klarna Slice it*.

       Example: ``https://api.mollie.com/v2/methods?resource=orders&billingCountry=DE``

   * - ``includeWallets``

       .. type:: string
          :required: false

     - A comma-separated list of the wallets you support in your checkout. Wallets often require wallet specific code to
       check if they are available on the shoppers device, hence the need to indicate your support.

       At the moment, the only supported wallet is ``applepay``.

       Example: ``https://api.mollie.com/v2/methods?includeWallets=applepay``

   * - ``orderLineCategories``

       .. type:: string
          :required: false

     - A comma-separated list of the order line categories you support in your checkout. The available
       categories can be found on the :doc:`Create Order API </reference/v2/orders-api/create-order>` page.

       Example: ``https://api.mollie.com/v2/methods?resource=orders&orderLineCategories=eco,meal``

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the following query string parameters are also available. With the ``profileId``
parameter, you must specify which profile you want to look at when listing payment methods. Organizations can have
multiple profiles for each of their websites. See :doc:`Profiles API </reference/v2/profiles-api/get-profile>` for more
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

     - Set this to ``true`` to list all payment methods available in testmode.

Includes
--------
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``issuers`` Include issuer details such as which iDEAL or gift card issuers are available.
* ``pricing`` Include pricing for each payment method.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of payment methods found in ``_embedded``.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``methods``

              .. type:: array

            - An array of methods objects as described in :doc:`Get method </reference/v2/methods-api/get-method>`.

   * - ``_links``

       .. type:: object

     - Links related to the lists of payment methods. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: object

            - The URL to the current set of methods.

          * - ``documentation``

              .. type:: object

            - The URL to the List payment methods endpoint documentation.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/methods?include=pricing \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      // Methods for the Payments API
      $methods = $mollie->methods->allActive();

      // Methods for the Orders API
      $methods = $mollie->methods->allActive(['resource' => 'orders']);

      // Methods including pricing
      $methods = $mollie->methods->allActive(['include' => 'pricing']);

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key('test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM')

      # Methods for the Payments API
      methods = mollie_client.methods.list()

      # Methods for the Orders API
      methods = mollie_client.methods.list(resource='orders')

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      # Methods for the Payments API
      methods = Mollie::Method.all

      # Methods for the Orders API
      methods = Mollie::Method.all(resource: 'orders')

      # Methods including pricing
      methods = Mollie::Method.all(include: 'pricing')

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        // Methods for the Payments API
        let methods = await mollieClient.methods.all();

        // Methods for the Orders API
        methods = await mollieClient.methods.all({ resource: 'orders' });
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 13,
       "_embedded": {
           "methods": [
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
                        "size1x": "https://mollie.com/external/icons/payment-methods/ideal.png",
                        "size2x": "https://mollie.com/external/icons/payment-methods/ideal%402x.png",
                        "svg": "https://mollie.com/external/icons/payment-methods/ideal.svg"
                    },
                    "status": "activated",
                    "pricing": [
                        {
                            "description": "Netherlands",
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
                        }
                    }
               },
               {
                    "resource": "method",
                    "id": "creditcard",
                    "description": "Credit card",
                    "minimumAmount": {
                        "value": "0.01",
                        "currency": "EUR"
                    },
                    "maximumAmount": {
                        "value": "2000.00",
                        "currency": "EUR"
                    },
                    "image": {
                        "size1x": "https://mollie.com/external/icons/payment-methods/creditcard.png",
                        "size2x": "https://mollie.com/external/icons/payment-methods/creditcard%402x.png",
                        "svg": "https://mollie.com/external/icons/payment-methods/creditcard.svg"
                    },
                    "status": "activated",
                    "pricing": [
                        {
                            "description": "Commercial & non-European cards",
                            "fixed": {
                                "value": "0.25",
                                "currency": "EUR"
                            },
                            "variable": "2.8",
                            "feeRegion": "other"
                        },
                        {
                            "description": "European cards",
                            "fixed": {
                                "value": "0.25",
                                "currency": "EUR"
                            },
                            "variable": "1.8",
                            "feeRegion": "eu-cards"
                        },
                        {
                            "description": "American Express",
                            "fixed": {
                                "value": "0.25",
                                "currency": "EUR"
                            },
                            "variable": "2.8",
                            "feeRegion": "amex"
                        }
                    ],
                    "_links": {
                        "self": {
                            "href": "https://api.mollie.com/v2/methods/creditcard",
                            "type": "application/hal+json"
                        }
                    }
               },
               { },
               { }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/methods",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/methods-api/list-methods",
               "type": "text/html"
           }
       }
   }
