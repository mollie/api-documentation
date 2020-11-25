Cancel subscription
===================
.. api-name:: Subscriptions API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for canceling subscriptions in the new v2 API can be found
             :doc:`here </reference/v2/subscriptions-api/cancel-subscription>`. For more information on the v2 API,
             refer to our :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v1/customers/*customerId*/subscriptions/*id*

.. authentication::
   :api_keys: true
   :organization_access_tokens: false
   :oauth: true

A subscription can be canceled any time by calling ``DELETE`` on the resource endpoint.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, and replace ``id`` by the subscription's ID. For
example: ``/v1/customers/cst_stTC2WHAuS/subscriptions/sub_rVKGtNd6s3``.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` parameter is also
available.

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Set this to ``true`` to cancel a test mode subscription.

Response
--------
``204 No Content``

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X DELETE https://api.mollie.com/v1/customers/cst_stTC2WHAuS/subscriptions/sub_rVKGtNd6s3 \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 204 No Content
