Get customer
============
.. api-name:: Customers API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/customers/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve a single customer by its ID.

Parameters
----------
Replace ``id`` in the endpoint URL by the customer's ID, for example ``cst_8wmqcHMN4U``.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, you can enable test mode through the ``testmode`` query string parameter.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to retrieve a test mode customer.

Response
--------
``200`` ``application/hal+json``

.. parameter:: resource
   :type: string

   Indicates the response contains a customer object. Will always contain ``customer`` for this endpoint.

.. parameter:: id
   :type: string

   The customer's unique identifier, for example ``cst_vsKJpSsabw``.

.. parameter:: mode
   :type: string

   The mode used to create this customer.

   Possible values: ``live`` ``test``

.. parameter:: name
   :type: string

   The full name of the customer as provided when the customer was created.

.. parameter:: email
   :type: string

   The email address of the customer as provided when the customer was created.

.. parameter:: locale
   :type: string

   Allows you to preset the language to be used in the hosted payment pages shown to the consumer. If this parameter was
   not provided when the customer was created, the browser language will be used instead in the payment flow (which is
   usually more accurate).

   Possible values: ``en_US`` ``en_GB`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
   ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV`` ``lt_LT``

.. parameter:: metadata
   :type: mixed

   Data provided during the customer creation.

.. parameter:: createdAt
   :type: datetime

   The customer's date and time of creation, in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ format.

.. parameter:: _links
   :type: object

   An object with several URL objects relevant to the customer. Every URL object will contain an ``href`` and a ``type``
   field.

   .. parameter:: self
      :type: URL object

      The API resource URL of the customer itself.

   .. parameter:: dashboard
      :type: URL object

      Direct link to the Customer in the Mollie Dashboard.

   .. parameter:: mandates
      :type: URL object

      The API resource URL of the mandates belonging to the Customer, if there are no mandates this parameter is
      omitted.

   .. parameter:: subscriptions
      :type: URL object

      The API resource URL of the subscriptions belonging to the Customer, if there are no subscriptions this parameter
      is omitted.

   .. parameter:: payments
      :type: URL object

      The API resource URL of the payments belonging to the Customer, if there are no payments this parameter is
      omitted.

   .. parameter:: documentation
      :type: URL object

      The URL to the customer retrieval endpoint documentation.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/customers/cst_kEn1PlbGa \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $customer = $mollie->customers->get("cst_kEn1PlbGa");

   .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_api_key("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXs")

      customer = mollie_client.customers.get("cst_8wmqcHMN4U")

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      customer = Mollie::Customer.get('cst_8wmqcHMN4U')

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      const customer = await mollieClient.customers.get('cst_kEn1PlbGa');

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "customer",
       "id": "cst_kEn1PlbGa",
       "mode": "test",
       "name": "Customer A",
       "email": "customer@example.org",
       "locale": "nl_NL",
       "metadata": null,
       "createdAt": "2018-04-06T13:23:21.0Z",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/customers/cst_kEn1PlbGa",
               "type": "application/hal+json"
           },
           "dashboard": {
               "href": "https://www.mollie.com/dashboard/org_123456789/customers/cst_kEn1PlbGa",
               "type": "text/html"
           },
           "mandates": {
               "href": "https://api.mollie.com/v2/customers/cst_kEn1PlbGa/mandates",
               "type": "application/hal+json"
           },
           "subscriptions": {
               "href": "https://api.mollie.com/v2/customers/cst_kEn1PlbGa/subscriptions",
               "type": "application/hal+json"
           },
           "payments": {
               "href": "https://api.mollie.com/v2/customers/cst_kEn1PlbGa/payments",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/customers-api/get-customer",
               "type": "text/html"
           }
       }
   }
