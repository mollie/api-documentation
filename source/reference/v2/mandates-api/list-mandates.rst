List mandates
=============
.. api-name:: Mandates API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/customers/*customerId*/mandates

.. authentication::
   :api_keys: true
   :oauth: true

Retrieve all mandates for the given ``customerId``, ordered from newest to oldest.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, for example ``cst_8wmqcHMN4U``.

.. list-table::
   :widths: auto

   * - ``from``

       .. type:: string
          :required: false

     - Offset the result set to the mandate with this ID. The mandate with this ID is included in the result
       set as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of mandates to return (with a maximum of 250).

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` parameter is also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to true to only retrieve mandates made in test mode. By default, only live mandates are
       returned.

Response
--------
``200`` ``application/json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of mandates found in ``_embedded``, which is either the requested number (with a maximum of 250) or
       the default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``mandates``

              .. type:: array

            - An array of mandate objects as described in :doc:`Get mandate </reference/v2/mandates-api/get-mandate>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of mandates. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current set of mandates.

          * - ``previous``

              .. type:: URL object

            - The previous set of mandates, if available.

          * - ``next``

              .. type:: URL object

            - The next set of mandates, if available.

          * - ``documentation``

              .. type:: URL object

            - The URL to the mandates list endpoint documentation.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/mandates \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
    $customer = $mollie->customers->get("cst_stTC2WHAuS");
    $mandates = $customer->mandates();

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "count": 5,
       "_embedded": {
           "mandates": [
               {
                   "resource": "mandate",
                   "id": "mdt_AcQl5fdL4h",
                   "status": "valid",
                   "method": "directdebit",
                   "details": {
                       "consumerName": "John Doe",
                       "consumerAccount": "NL55INGB0000000000",
                       "consumerBic": "INGBNL2A"
                   },
                   "mandateReference": null,
                   "signatureDate": "2018-05-07",
                   "createdAt": "2018-05-07T10:49:08+00:00",
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/mandates/mdt_AcQl5fdL4h",
                           "type": "application/hal+json"
                       },
                       "customer": {
                           "href": "https://api.mollie.com/v2/customers/cst_8wmqcHMN4U",
                           "type": "application/hal+json"
                       },
                       "documentation": {
                           "href": "https://mollie.com/en/docs/reference/customers/create-mandate",
                           "type": "text/html"
                       }
                   }
               },
               { },
               { },
               { },
               { }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/mandates?limit=5",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/customers/cst_8wmqcHMN4U/mandates?from=mdt_AcQl5fdL4h&limit=5",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/mandates-api/revoke-mandate",
               "type": "text/html"
           }
       }
   }
