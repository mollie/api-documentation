Get Current Organization API
============================
.. api-name:: Organizations API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/organizations/me

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Retrieve the currently authenticated organization.


Parameters
----------

No parameters applicable for this endpoint.


Response
--------
``200`` ``application/hal+json``

For the full list of fields, see :doc:`/reference/v2/organizations-api/get-organization`. Only
``_links`` is listed here.

.. list-table::
   :widths: auto

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the organization. Every URL object will contain an ``href`` and
       a ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of the organization itself.

          * - ``chargebacks``

              .. type:: URL object

            - The API resource URL where the organization's
              :doc:`chargebacks </reference/v2/chargebacks-api/list-chargebacks>` can be retrieved.

          * - ``customers``

              .. type:: URL object

            - The API resource URL where the organization's
              :doc:`customers </reference/v2/customers-api/list-customers>` can be retrieved.

          * - ``invoices``

              .. type:: URL object

            - The API resource URL where the organization's
              :doc:`invoices </reference/v1/invoices-api/list-invoices>` can be retrieved.

          * - ``payments``

              .. type:: URL object

            - The API resource URL where the organization's
              :doc:`payments </reference/v2/payments-api/list-payments>` can be retrieved.

          * - ``profiles``

              .. type:: URL object

            - The API resource URL where the organization's
              :doc:`profiles </reference/v2/profiles-api/list-profiles>` can be retrieved.

          * - ``refunds``

              .. type:: URL object

            - The API resource URL where the organization's
              :doc:`refunds </reference/v2/refunds-api/list-refunds>` can be retrieved.

          * - ``settlements``

              .. type:: URL object

            - The API resource URL where the organization's
              :doc:`settlements </reference/v2/settlements-api/list-settlements>` can be retrieved.

          * - ``dashboard``

              .. type:: URL object

            - The URL to the organization dashboard

          * - ``documentation``

              .. type:: URL object

            - The URL to the payment method retrieval endpoint documentation.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/organizations/me \
      -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      $currentOrganization = $mollie->organizations->current();

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ'
      end

      organization = Mollie::Organization.current

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
        "resource": "organization",
        "id": "org_12345678",
        "name": "Mollie B.V.",
        "email": "info@mollie.com",
        "address": {
           "streetAndNumber" : "Keizersgracht 313",
           "postalCode": "1016 EE",
            "city": "Amsterdam",
            "country": "NL"
        },
        "registrationNumber": "30204462",
        "vatNumber": "NL815839091B01",
        "_links": {
            "self": {
                "href": "https://api.mollie.com/v2/organizations/me",
                "type": "application/hal+json"
            },
            "chargebacks": {
                "href": "https://api.mollie.com/v2/chargebacks",
                "type": "application/hal+json"
            },
            "customers": {
                "href": "https://api.mollie.com/v2/customers",
                "type": "application/hal+json"
            },
            "invoices": {
                "href": "https://api.mollie.com/v2/invoices",
                "type": "application/hal+json"
            },
            "payments": {
                "href": "https://api.mollie.com/v2/payments",
                "type": "application/hal+json"
            },
            "profiles": {
                "href": "https://api.mollie.com/v2/profiles",
                "type": "application/hal+json"
            },
            "refunds": {
                "href": "https://api.mollie.com/v2/refunds",
                "type": "application/hal+json"
            },
            "settlements": {
                "href": "https://api.mollie.com/v2/settlements",
                "type": "application/hal+json"
            },
            "dashboard": {
                "href": "https://mollie.com/dashboard/org_12345678",
                "type": "text/html"
            },
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/organizations-api/current-organization",
                "type": "text/html"
            }
        }
    }
