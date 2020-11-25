List customers
==============
.. api-name:: Customers API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/customers

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all customers created.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``from``

       .. type:: string
          :required: false

     - Used for :ref:`pagination <pagination-in-v2>`. Offset the result set to the customer with this ID. The customer with this ID is included in the
       result set as well.

   * - ``limit``

       .. type:: integer
          :required: false

     - The number of customers to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the ``testmode`` query string parameter is also available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to list test mode customers.

Response
--------
``200`` ``application/hal+json``

.. list-table::
   :widths: auto

   * - ``count``

       .. type:: integer

     - The number of customers found in ``_embedded``, which is either the requested number (with a maximum of 250) or
       the default number.

   * - ``_embedded``

       .. type:: object

     - The object containing the queried data.

       .. list-table::
          :widths: auto

          * - ``customers``

              .. type:: array

            - An array of customer objects as described in
              :doc:`Get customer </reference/v2/customers-api/get-customer>`.

   * - ``_links``

       .. type:: object

     - Links to help navigate through the lists of customers. Every URL object will contain an ``href`` and a ``type``
       field.

       .. list-table::
          :widths: auto

          * - ``self``

              .. type:: URL object

            - The URL to the current set of customers.

          * - ``previous``

              .. type:: URL object

            - The previous set of customers, if available.

          * - ``next``

              .. type:: URL object

            - The next set of customers, if available.

          * - ``documentation``

              .. type:: URL object

            - The URL to the customers list endpoint documentation.

Example
-------

.. code-block-selector::

   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/customers \
         -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      // First page
      $customers = $mollie->customers->page();

      // Next page
      $customers->next();

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM'
      end

      customers = Mollie::Customer.all

   .. code-block:: javascript
      :linenos:

      const { createMollieClient } = require('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

      (async () => {
        // First page
        let customers = await mollieClient.customers.page();

        // Next page
        customers = await customers.nextPage();
      })();

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "count": 3,
       "_embedded": {
           "customers": [
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
                       "documentation": {
                           "href": "https://docs.mollie.com/reference/v2/customers-api/get-customer",
                           "type": "text/html"
                       }
                   }
               },
               { },
               { }
           ]
       },
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/customers",
               "type": "application/hal+json"
           },
           "previous": null,
           "next": {
               "href": "https://api.mollie.com/v2/customers?from=cst_stTC2WHAuS",
               "type": "application/hal+json"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/customers-api/list-customers",
               "type": "text/html"
           }
       }
   }
