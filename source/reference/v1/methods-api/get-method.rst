Get payment method
==================
.. api-name:: Methods API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for retrieving payment methods in the new v2 API can be found
             :doc:`here </reference/v2/methods-api/get-method>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/methods/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Retrieve a payment method object by its payment method identifier.

Parameters
----------
Replace ``id`` in the endpoint URL by the payment method's ID, for example ``creditcard``.

.. parameter:: include
   :type: string
   :condition: required

   Include additional data. Must be a comma-separated list of one or more includes.

.. parameter:: locale
   :type: string
   :condition: optional

   Passing a locale will translate the payment method name to the corresponding language.

   Possible values: ``en_US`` ``en_GB`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
   ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV`` ``lt_LT``

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, the only mandatory extra query string parameter is the ``profileId`` parameter.
With it, you can specify which profile you want to retrieve a method for. Organizations can have multiple profiles for
each of their websites. See :doc:`Profiles API </reference/v1/profiles-api/create-profile>` for more information.

.. parameter:: profileId
   :type: string
   :condition: required
   :collapse: true

   The payment profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to true to only retrieve the payment method if it is available in test mode.

Includes
^^^^^^^^
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``issuers`` Include issuer details if available, for instance for the iDEAL or gift card payment methods.

Response
--------
``200`` ``application/json``

.. parameter:: resource
   :type: string

   Indicates the response contains a payment method object. Will always contain ``method`` for this endpoint.

.. parameter:: id
   :type: string

   The identifier uniquely referring to this payment method. When supplying this ID as the ``method`` parameter
   during :doc:`payment creation </reference/v1/payments-api/create-payment>`, the payment method selection screen is
   skipped.

.. parameter:: description
   :type: string

   The full name of the payment method.

.. parameter:: amount
   :type: object

   The minimum and maximum allowed payment amount will differ between payment methods.

   .. parameter:: minimum
      :type: decimal

      The minimum payment amount in EUR required to use this payment method.

   .. parameter:: maximum
      :type: decimal

      The maximum payment amount in EUR allowed when using this payment method. For gift cards, the maximum amount may
      be ignored.

.. parameter:: image
   :type: object

   URLs of images representing the payment method.

   .. parameter:: normal
      :type: string

      The URL for a payment method icon of 55x37 pixels.

   .. parameter:: bigger
      :type: string

      The URL for a payment method icon of 110x74 pixels.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/methods/creditcard \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "resource": "method",
       "id": "creditcard",
       "description": "Credit card",
       "amount": {
           "minimum": "0.31",
           "maximum": "10000.00"
       },
       "image": {
           "normal": "https://www.mollie.com/images/payscreen/methods/creditcard.png",
           "bigger": "https://www.mollie.com/images/payscreen/methods/creditcard%402x.png"
       }
   }
