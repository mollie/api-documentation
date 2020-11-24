Get onboarding status
=====================
.. api-name:: Onboarding API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/onboarding/me

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

Get the status of onboarding of the authenticated organization.

Parameters
----------
There are no parameters for this endpoint.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``resource``

       .. type:: string

     - Indicates the response contains an onboarding object. Will always contain ``onboarding`` for this endpoint.

   * - ``name``

       .. type:: string

     - The name of the organization.

   * - ``signedUpAt``

       .. type:: datetime

     - The sign up date and time of the organization.

   * - ``status``

       .. type:: string

     - The current status of the organization's onboarding process. Possible values:

       * ``needs-data`` The onboarding is not completed and the merchant needs to provide (more) information
       * ``in-review`` The merchant provided all information and Mollie needs to check this
       * ``completed`` The onboarding is completed

   * - ``canReceivePayments``

       .. type:: boolean

     - Whether or not the organization can receive payments.

   * - ``canReceiveSettlements``

       .. type:: boolean

     - Whether or not the organization can receive settlements.

   * - ``_links``

       .. type:: object

     - An object with several URL objects relevant to the onboarding status. Every URL object will contain an ``href`` and a
       ``type`` field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The API resource URL of this endpoint itself.

          * - ``dashboard``

              .. type:: URL object

            - The URL of the onboarding process in Mollie Dashboard. You can redirect your customer to here for e.g. completing
              the onboarding process.

          * - ``organization``

              .. type:: URL object

            - The API resource URL of the organization.

          * - ``documentation``

              .. type:: URL object

            - The URL to the onboarding status retrieval endpoint documentation.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/onboarding/me \
           -H "Authorization: Bearer access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $onboarding = $mollie->onboarding->get();

   .. code-block:: ruby
      :linenos:

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      Mollie::Onboarding.me

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "resource": "onboarding",
       "name": "Mollie B.V.",
       "signedUpAt": "2018-12-20T10:49:08+00:00",
       "status": "completed",
       "canReceivePayments": true,
       "canReceiveSettlements": true,
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/onboarding/me",
               "type": "application/hal+json"
           },
           "dashboard": {
               "href": "https://www.mollie.com/dashboard/onboarding",
               "type": "text/html"
           },
           "organization": {
               "href": "https://api.mollie.com/v2/organization/org_12345",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/onboarding-api/get-onboarding-status",
               "type": "text/html"
           }
       }
   }
