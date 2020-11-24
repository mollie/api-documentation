Create customer
===============
.. api-name:: Customers API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for creating customers in the new v2 API can be found
             :doc:`here </reference/v2/customers-api/create-customer>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v1/customers

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Creates a simple minimal representation of a customer in the Mollie API to use for the
`Mollie Checkout <https://www.mollie.com/en/checkout>`_ and Recurring features. These customers will appear in your
`Mollie Dashboard <https://www.mollie.com/dashboard/>`_ where you can manage their details, and also see their payments
and subscriptions.

Parameters
----------
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

     - Set this to ``true`` to create a test mode customer.

Response
--------
``201`` ``application/json``

A customer object is returned, as described in :doc:`Get customer </reference/v1/customers-api/get-customer>`.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X POST https://api.mollie.com/v1/customers \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
       -d "name=Customer A" \
       -d "email=customer@example.com"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/json

   {
       "resource": "customer",
       "id": "cst_8wmqcHMN4U",
       "mode": "test",
       "name": "Customer A",
       "email": "customer@example.org",
       "locale": "nl_NL",
       "metadata": null,
       "recentlyUsedMethods": [],
       "createdDatetime": "2016-04-06T13:10:19.0Z"
   }
