Delete customer
===============
.. api-name:: Customers API
   :version: 2

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/customers/*id*

.. authentication::
   :api_keys: true
   :oauth: true

Delete a customer. All mandates and subscriptions created for this customer will be canceled as well.

Parameters
----------
Replace ``id`` in the endpoint URL by the customer's ID, for example ``cst_8wmqcHMN4U``.

Mollie Connect/OAuth parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you're creating an app with :doc:`Mollie Connect/OAuth </oauth/overview>`, the ``testmode`` parameter is also
available.

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

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X DELETE https://api.mollie.com/v2/customers/cst_8wmqcHMN4U \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
    $mollie->customers->delete("cst_8wmqcHMN4U");

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 204 No Content
