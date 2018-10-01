Get payment method
==================
.. api-name:: Methods API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/methods/*id*

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve a single method by its ID. Note that if a method is not available on the website profile a status
``404 Not found`` is returned. When the method is not enabled, a status ``403 Forbidden`` is returned.

If you do not know the method's ID, you can use the
:doc:`methods list endpoint </reference/v2/methods-api/list-methods>` to retrieve all payment methods that are
available.

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

Mollie Connect/OAuth parameters
-------------------------------
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the following query string parameters are
also available. With the ``profileId`` parameter, you must specify which profile you want to look at when listing
methods. Organizations can have multiple profiles for each of their websites. See
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

.. _method-includes:

Includes
^^^^^^^^
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``issuers`` Include issuers available for the payment method (e.g. for iDEAL, KBC/CBC payment button or gift cards).

Response
--------
``200`` ``application/hal+json; charset=utf-8``

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

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/methods/ideal?include=issuers \
       -H "Authorization: Bearer live_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
    $mollie->methods->get("ideal", ["include" => "issuers"]);

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
        "resource": "method",
        "id": "ideal",
        "description": "iDEAL",
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
