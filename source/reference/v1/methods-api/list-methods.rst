List payment methods
====================
.. api-name:: Methods API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for listing payment methods in the new v2 API can be found
             :doc:`here </reference/v2/methods-api/list-methods>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/methods

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Retrieve all payment methods activated on the payment profile.

The results are paginated. See :doc:`pagination </overview/pagination>` for more information.

Parameters
----------
.. parameter:: include
   :type: string
   :condition: required

   Include additional data. Must be a comma-separated list of one or more includes. See
   :doc:`Get method </reference/v1/methods-api/get-method>` for available includes.

.. parameter:: recurringType
   :type: string
   :condition: optional

   Passing ``first`` will only show payment methods eligible for making a
   :ref:`first payment <payments/recurring/first-payment>`. Passing ``recurring`` shows payment methods which can be
   used to automatically charge your customer's account when authorization has been given.

   Possible values: ``first`` ``recurring``

.. parameter:: locale
   :type: string
   :condition: optional

   Passing a locale will sort the payment methods in the preferred order for the country, and translate the payment
   method names to the corresponding language.

   Possible values: ``en_US`` ``de_AT`` ``de_CH`` ``de_DE`` ``es_ES`` ``fr_BE`` ``fr_FR`` ``nl_BE`` ``nl_NL``

.. parameter:: offset
   :type: integer
   :condition: optional

   The number of payment methods to skip.

.. parameter:: count
   :type: integer
   :condition: optional

   The number of payment methods to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, the only mandatory extra query string parameter is the ``profileId`` parameter.
With it, you can specify which profile you want to list the methods of. Organizations can have multiple profiles for
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

   Set this to true to only retrieve payment methods available in test mode. By default, only live payment methods are
   returned.

Includes
^^^^^^^^
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``issuers`` Include issuer details if available, for instance for the iDEAL or gift card payment methods.

Response
--------
``200`` ``application/json``

.. parameter:: totalCount
   :type: integer

   The total number of payment methods available.

.. parameter:: offset
   :type: integer

   The number of skipped payment methods as requested.

.. parameter:: count
   :type: integer

   The number of payment methods found in ``data``, which is either the requested number (with a maximum of 250) or
   the default number.

.. parameter:: data
   :type: array

   An array of payment method objects as described in
   :doc:`Get payment method </reference/v1/methods-api/get-method>`.

.. parameter:: links
   :type: object

   Links to help navigate through the lists of payment methods, based on the given offset.

   .. parameter:: previous
      :type: string

      The previous set of payment methods, if available.

   .. parameter:: next
      :type: string

      The next set of payment methods, if available.

   .. parameter:: first
      :type: string

      The first set of payment methods, if available.

   .. parameter:: last
      :type: string

      The last set of payment methods, if available.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/methods \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "totalCount": 2,
       "offset": 0,
       "count": 2,
       "data": [
           {
               "resource": "method",
               "id": "ideal",
               "description": "iDEAL",
               "amount": {
                   "minimum": "0.53",
                   "maximum": "50000.00"
               },
               "image": {
                   "normal": "https://www.mollie.com/images/payscreen/methods/ideal.png",
                   "bigger": "https://www.mollie.com/images/payscreen/methods/ideal%402x.png"
               }
           },
           {
               "resource": "method",
               "id": "paypal",
               "description": "PayPal",
               "amount": {
                   "minimum": "0.13",
                   "maximum": "8000.00"
               },
               "image": {
                   "normal": "https://www.mollie.com/images/payscreen/methods/paypal.png",
                   "bigger": "https://www.mollie.com/images/payscreen/methods/paypal%402x.png"
               }
           },
           { },
           { }
       ]
   }
