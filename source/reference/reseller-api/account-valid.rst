Validate account
================

.. api-name:: Reseller API
   :version: 1

.. endpoint::
   :method: GET
   :url: https://www.mollie.com/api/reseller/v1/account-valid

.. note:: This API is only for `partners <https://www.mollie.com/partners>`_.

This method allows you to check whether a Mollie account actually exists and whether the password to this account is
correct. The method returns the account's partner ID.

Parameters
----------
Make sure to add the :ref:`obligatory parameters <secret-keys>` always. Besides that, add the following
parameters:

.. list-table::
   :widths: auto

   * - ``username``

       .. type:: string
          :required: true

     - The username of the account you would like to check.

   * - ``password``

       .. type:: string
          :required: true

     - The password of the account you would like to check.

Response
--------
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/xml; charset=utf-8

   <?xml version="1.0"?>
    <response>
        <success>true</success>
        <resultcode>10</resultcode>
        <resultmessage>Customer janjansen exists and password is correct.</resultmessage>
        <exists>true</exists>
        <partner_id>1337</partner_id>
    </response>
