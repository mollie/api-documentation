Delete customer
===============
.. api-name:: Customers API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for deleting customers in the new v2 API can be found
             :doc:`here </reference/v2/customers-api/delete-customer>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v1/customers/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
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

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X DELETE https://api.mollie.com/v1/customers/cst_8wmqcHMN4U \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 204 No Content
