List customers
==============
.. api-name:: Customers API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for listing customers in the new v2 API can be found
             :doc:`here </reference/v2/customers-api/list-customers>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v1/customers

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

Retrieve all customers created.

The results are paginated. See :doc:`pagination </guides/pagination>` for more information.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``offset``

       .. type:: integer
          :required: false

     - The number of customers to skip.

   * - ``count``

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
``200`` ``application/json``

.. list-table::
   :widths: auto

   * - ``totalCount``

       .. type:: integer

     - The total number of customers available.

   * - ``offset``

       .. type:: integer

     - The number of skipped customers as requested.

   * - ``count``

       .. type:: integer

     - The number of customers found in ``data``, which is either the requested number (with a maximum of 250) or the
       default number.

   * - ``data``

       .. type:: array

     - An array of customers objects as described in :doc:`Get customer </reference/v1/customers-api/get-customer>`.

   * - ``links``

       .. type:: object

     - Links to help navigate through the lists of customers, based on the given offset.

       .. list-table::
          :widths: auto

          * - ``previous``

              .. type:: string

            - The previous set of customers, if available.

          * - ``next``

              .. type:: string

            - The next set of customers, if available.

          * - ``first``

              .. type:: string

            - The first set of customers, if available.

          * - ``last``

              .. type:: string

            - The last set of customers, if available.

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v1/customers \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
       "totalCount": 3,
       "offset": 0,
       "count": 3,
       "data": [
           {
               "resource": "customer",
               "id": "cst_vsKJpSsabw",
               "mode": "test",
               "name": "Customer A",
               "email": "customer@example.org",
               "locale": "nl_NL",
               "metadata": null,
               "recentlyUsedMethods": [
                   "creditcard",
                   "ideal"
               ],
               "createdDatetime": "2016-04-06T13:23:21.0Z"
           },
           { },
           { }
       ]
   }
