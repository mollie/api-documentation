List payment methods
====================
.. api-name:: Methods API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/methods

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve all available payment methods. The results are not paginated.

* For test mode, payment methods are returned that are enabled in the Dashboard (or the activation is pending).
* For live mode, payment methods are returned that have been activated on your account and have been enabled in the
  Dashboard.

When using the ``first`` sequence type, methods will be returned if they can be used as a first payment in a recurring
sequence and if they are enabled in the Dashboard.

When using the ``recurring`` sequence type, methods that can be used for recurring payments or subscriptions will be
returned. Enabling / disabling methods in the dashboard does not affect how they can be used for recurring payments.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``sequenceType``

       .. type:: string
          :required: false

     - Passing ``first`` will only show payment methods eligible for making a first payment. Passing
       ``recurring`` shows payment methods which can be used to automatically charge your customer's account when
       authorization has been given. Set to ``oneoff`` by default, which indicates the method is available for a
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

     - An object containing ``value`` and ``currency``. Only methods that support the amount and currency
       are returned.

       Example: ``https://api.mollie.com/v2/methods?amount[value]=100.00&amount[currency]=USD``

Mollie Connect/OAuth parameters
-------------------------------
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the following parameters are also
available. With the ``profileId`` parameter, you must specify which profile you want to look at when listing methods.
Organizations can have multiple profiles for each of their websites. See
:doc:`Profiles API </reference/v2/profiles-api/get-profile>` for more information.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: true

     - The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``. This field is mandatory.

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to list all methods available in testmode.

Includes
--------
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``issuers`` Include issuer details such as which iDeal issuers are available.

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of methods found in ``_embedded``.

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

     - Links related to the lists of methods. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: object

            - The URL to the current set of methods.

          * - ``documentation``

              .. type:: object

            - The URL to the methods list endpoint documentation.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/methods \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
    $methods = $mollie->methods->all();

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "count": 13,
       "_embedded": {
           "methods": [
               {
                    "resource": "method",
                    "id": "ideal",
                    "description": "iDEAL",
                    "image": {
                        "size1x": "https://mollie.com/external/icons/payment-methods/ideal.png",
                        "size2x": "https://mollie.com/external/icons/payment-methods/ideal%402x.png",
                        "svg": "https://mollie.com/external/icons/payment-methods/ideal.svg"
                    },
                    "_links": {
                        "self": {
                            "href": "https://api.mollie.com/v2/methods/ideal",
                            "type": "application/hal+json"
                        },
                        "documentation": {
                            "href": "https://mollie.com/en/docs/reference/methods/get",
                            "type": "text/html"
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
