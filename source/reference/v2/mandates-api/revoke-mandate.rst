Revoke mandate
==============
.. api-name:: Mandates API
   :version: 2

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/customers/*customerId*/mandates/*id*

.. authentication::
   :api_keys: true
   :oauth: true

Revoke a customer's mandate. You will no longer be able to charge the consumer's bank account or credit card with this
mandate.

Parameters
----------
Replace ``customerId`` in the endpoint URL by the customer's ID, and replace ``id`` by the mandate's ID. For example:
``/v2/customers/cst_stTC2WHAuS/mandates/mdt_pWUnw6pkBN``.

Response
--------
``204 No Content``

Example
-------

Request (curl)
^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X DELETE https://api.mollie.com/v2/customers/cst_stTC2WHAuS/mandates/mdt_pWUnw6pkBN \
      -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Request (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $mollie = new \Mollie\Api\MollieApiClient();
    $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");
    $customer = $mollie->customers->get("cst_stTC2WHAuS");
    $mandate = $customer->getMandate("mdt_pWUnw6pkBN");
    $mandate->revoke();

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 204 No Content
