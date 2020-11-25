Delete customer
===============
.. api-name:: Customers API
   :version: 2

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/customers/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Delete a customer. All mandates and subscriptions created for this customer will be canceled as well.

Parameters
----------
Replace ``id`` in the endpoint URL by the customer's ID, for example ``cst_8wmqcHMN4U``.

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the ``testmode`` parameter is also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to delete a test mode customer.

Response
--------
``204 No Content``

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X DELETE https://api.mollie.com/v2/customers/cst_8wmqcHMN4U \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
      $mollie->customers->delete("cst_8wmqcHMN4U");

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      Mollie::Customer.delete('cst_8wmqcHMN4U')

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        const status = mollieClient.customers.delete('cst_8wmqcHMN4U');
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 204 No Content
