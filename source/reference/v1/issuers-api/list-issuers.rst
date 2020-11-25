List issuers
============
.. api-name:: Issuers API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             In the new v2 API, issuers can be retrieved by using the ``issuers`` include on the Methods API.
             Documentation for the Methods API v2 can be found :doc:`here </reference/v2/methods-api/list-methods>`. For
             more information on the v2 API, refer to our :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/issuers

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Retrieve all available iDEAL issuers. This endpoint enables you to integrate iDEAL's bank selection screen into your own
payment flow.

The Issuers API only supports iDEAL.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``offset``

       .. type:: integer
          :required: false

     - The number of issuers to skip.

   * - ``count``

       .. type:: integer
          :required: false

     - The number of issuers to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the ``testmode`` query string parameter is also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to true to only retrieve the issuers available in test mode.

Response
--------
``200`` ``application/json``

.. list-table::
   :widths: auto

   * - ``totalCount``

       .. type:: integer

     - The total number of issuers available.

   * - ``offset``

       .. type:: integer

     - The number of skipped issuers as requested.

   * - ``count``

       .. type:: integer

     - The number of issuers found in ``data``, which is either the requested number (with a maximum of 250) or the
       default number.

   * - ``data``

       .. type:: array

     - An array of issuer objects as described in :doc:`Get issuer </reference/v1/issuers-api/get-issuer>`.

   * - ``links``

       .. type:: object

     - Links to help navigate through the lists of issuers, based on the given offset.

       .. list-table::
          :widths: auto

          * - ``previous``

              .. type:: string

            - The previous set of issuers, if available.

          * - ``next``

              .. type:: string

            - The next set of issuers, if available.

          * - ``first``

              .. type:: string

            - The first set of issuers, if available.

          * - ``last``

              .. type:: string

            - The last set of issuers, if available.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/issuers \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "totalCount": 9,
       "offset": 0,
       "count": 9,
       "data": [
           {
               "resource": "issuer",
               "id": "ideal_ABNANL2A",
               "name": "ABN AMRO",
               "method": "ideal",
               "image": {
                   "normal": "https://www.mollie.com/images/checkout/v2/ideal-issuer-icons/ABNANL2A.png",
                   "bigger": "https://www.mollie.com/images/checkout/v2/ideal-issuer-icons/ABNANL2A%402x.png"
               }
           },
           {
               "resource": "issuer",
               "id": "ideal_ASNBNL21",
               "name": "ASN Bank",
               "method": "ideal",
               "image": {
                   "normal": "https://www.mollie.com/images/checkout/v2/ideal-issuer-icons/ASNBNL21.png",
                   "bigger": "https://www.mollie.com/images/checkout/v2/ideal-issuer-icons/ASNBNL21%402x.png"
               }
           },
           {
               "resource": "issuer",
               "id": "ideal_INGBNL2A",
               "name": "ING",
               "method": "ideal",
               "image": {
                   "normal": "https://www.mollie.com/images/checkout/v2/ideal-issuer-icons/INGBNL2A.png",
                   "bigger": "https://www.mollie.com/images/checkout/v2/ideal-issuer-icons/INGBNL2A%402x.png"
               }
           },
           { },
           { }
       ]
   }
