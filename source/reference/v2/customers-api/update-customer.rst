Update customer
===============
.. api-name:: Customers API
   :version: 2

.. endpoint::
   :method: PATCH
   :url: https://api.mollie.com/v2/customers/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Update an existing customer.

Parameters
----------
Replace ``id`` in the endpoint URL by the customer's ID, for example ``cst_8wmqcHMN4U``.

.. list-table::
   :widths: auto

   * - ``name``

       .. type:: string
          :required: false

     - The full name of the customer.

   * - ``email``

       .. type:: string
          :required: false

     - The email address of the customer.

   * - ``locale``

       .. type:: string
          :required: false

     - Allows you to preset the language to be used in the hosted payment pages shown to the consumer. When this
       parameter is not provided, the browser language will be used instead in the payment flow (which is usually more
       accurate).

       Possible values: ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
       ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV``
       ``lt_LT``

   * - ``metadata``

       .. type:: mixed
          :required: false

     - Provide any data you like, and we will save the data alongside the customer. Whenever
       you fetch the customer with our API, we'll also include the metadata. You can use up to 1kB of JSON.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the ``testmode`` parameter is also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to update a test mode customer.

Response
--------
``200`` ``application/hal+json``

A customer object is returned, as described in :doc:`Get customer </reference/v2/customers-api/get-customer>`.

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X PATCH https://api.mollie.com/v2/customers/cst_8wmqcHMN4U \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -d "name=Updated Customer A" \
         -d "email=updated-customer@example.org"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $customer = $mollie->customers->get("cst_8wmqcHMN4U");
      $customer->name = "Updated Customer A";
      $customer->email = "updated-customer@example.org";
      $customer->update();

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      customer = Mollie::Customer.update(
        'cst_8wmqcHMN4U',
        name: 'Updated Customer A',
        email: 'updated-customer@example.org'
      )

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const customer = await mollieClient.customers.update({
          customerId: 'cst_8wmqcHMN4U',
          name: 'Updated Customer A',
          email: 'updated-customer@example.org',
        });
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "customer",
       "id": "cst_8wmqcHMN4U",
       "mode": "test",
       "name": "Updated Customer A",
       "email": "updated-customer@example.org",
       "locale": "nl_NL",
       "metadata": null,
       "createdAt": "2018-04-06T13:23:21.0Z",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/customers/cst_8wmqcHMN4U",
               "type": "application/hal+json"
           },
           "dashboard": {
               "href": "https://www.mollie.com/dashboard/org_123456789/customers/cst_8wmqcHMN4U",
               "type": "text/html"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/customers-api/get-customer",
               "type": "text/html"
           }
       }
   }
