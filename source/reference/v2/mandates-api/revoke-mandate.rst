Revoke mandate
==============
.. api-name:: Mandates API
   :version: 2

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/customers/*customerId*/mandates/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Revoke a customer's mandate. You will no longer be able to charge the consumer's bank account or credit card with this
mandate and all connected subscriptions will be canceled.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, and replace ``id`` by the mandate's ID. For example:
``/v2/customers/cst_stTC2WHAuS/mandates/mdt_pWUnw6pkBN``.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` parameter is also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to revoke a test mode mandate.

Response
--------
``204 No Content``

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X DELETE https://api.mollie.com/v2/customers/cst_stTC2WHAuS/mandates/mdt_pWUnw6pkBN \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $customer = $mollie->customers->get("cst_stTC2WHAuS");
      $mandate = $customer->getMandate("mdt_pWUnw6pkBN");
      $mandate->revoke();

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      Mollie::Customer::Mandate.delete('mdt_pWUnw6pkBN', customer_id: 'cst_stTC2WHAuS')

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const status = await mollieClient.customers_mandates.delete(
          'mdt_pWUnw6pkBN',
          { customerId: 'cst_stTC2WHAuS' }
        );
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 204 No Content
