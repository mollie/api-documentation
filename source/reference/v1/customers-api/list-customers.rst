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

The results are paginated. See :doc:`pagination </overview/pagination>` for more information.

Parameters
----------
.. parameter:: offset
   :type: integer
   :condition: optional

   The number of customers to skip.

.. parameter:: count
   :type: integer
   :condition: optional

   The number of customers to return (with a maximum of 250).

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </overview/authentication>` or are creating an
:doc:`OAuth app </connect/overview>`, the ``testmode`` query string parameter is also available.

.. parameter:: testmode
   :type: boolean
   :condition: optional
   :collapse: true

   Set this to ``true`` to list test mode customers.

Response
--------
``200`` ``application/json``

.. parameter:: totalCount
   :type: integer

   The total number of customers available.

.. parameter:: offset
   :type: integer

   The number of skipped customers as requested.

.. parameter:: count
   :type: integer

   The number of customers found in ``data``, which is either the requested number (with a maximum of 250) or the
   default number.

.. parameter:: data
   :type: array

   An array of customers objects as described in :doc:`Get customer </reference/v1/customers-api/get-customer>`.

.. parameter:: links
   :type: object

   Links to help navigate through the lists of customers, based on the given offset.

   .. parameter:: previous
      :type: string

      The previous set of customers, if available.

   .. parameter:: next
      :type: string

      The next set of customers, if available.

   .. parameter:: first
      :type: string

      The first set of customers, if available.

   .. parameter:: last
      :type: string

      The last set of customers, if available.

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
