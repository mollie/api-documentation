List organizations
==================
.. api-name:: Organizations API
    :version: 2

.. endpoint::
    :method: GET
    :url: https://api.mollie.com/v2/organizations

.. authentication::
    :api_keys: false
    :oauth: true

Retrieve all organizations that are connected to your partner-account.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

.. note:: This API is only for `partners <https://www.mollie.com/partners>`_.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``from``

       .. type:: string
          :required: false

     - Offset the result set to the organization with this ID. The organization with this ID is included in the result
       set as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of organizations to return (with a maximum of 250).

Response
--------
``200`` ``application/hal+json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``organizations``

              .. type:: array

            - An array of organization objects as described in
              :doc:`Get organization </reference/v2/organizations-api/get-organization>`.

   * - ``count``

       .. type:: integer

     - The number of organizations found in ``_embedded``, which is either the requested number (with a maximum of 250)
       or the default number.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of organizations. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current set of organizations.

          * - ``previous``

              .. type:: URL object

            - The previous set of organizations, if available.

          * - ``next``

              .. type:: URL object

            - The next set of organizations, if available.

          * - ``documentation``

              .. type:: URL object

            - The URL to the organizations list endpoint documentation.

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/organizations?limit=5 \
       -H "Authorization: Bearer access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
    $organizations = $mollie->organizations->page();

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

   {
       "_embedded": {
           "organizations": [
               {
                   "resource": "organization",
                   "id": "org_12345678",
                   "name": "Mollie B.V.",
                   "email": "info@mollie.com",
                   "address": {
                       "streetAndNumber": "Keizersgracht 313",
                       "postalCode": "1016 EE",
                       "city": "Amsterdam",
                       "country": "NL"
                   },
                   "registrationNumber": "30204462",
                   "vatNumber": "NL815839091B01",
                   "_links": {
                       "self": {
                           "href": "https://api.mollie.com/v2/organizations/org_12345678",
                           "type": "application/hal+json"
                       },
                       "documentation": {
                           "href": "https://docs.mollie.com/reference/v2/organizations-api/get-organization",
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
       "count": 5,
       "_links": {
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/organizations-api/list-organizations",
                "type": "text/html"
            },
            "self": {
                "href": "https://api.mollie.com/v2/organizations?limit=5",
                "type": "application/hal+json"
            },
            "previous": null,
            "next": null
        }
   }
