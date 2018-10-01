Disconnect account
==================

.. api-name:: Reseller API
   :version: 1

.. endpoint::
   :method: DELETE
   :url: https://www.mollie.com/api/reseller/v1/disconnect-account

.. note:: This API is only for `partners <https://www.mollie.com/partners>`_.

This method allows you to cancel one of your merchants as reseller. The link between your account and that of the
merchant will be broken. Any preferential rates your merchant enjoyed via your account will be re-adjusted to the normal
rates.

Parameters
----------
Make sure to add the :ref:`obligatory parameters <secret-keys>` always. Besides that, add the following
parameters:

.. list-table::
   :widths: auto

   * - ``username``

       .. type:: string
          :required: true

     - The username of the account you would like to disconnect.

   * - ``password``

       .. type:: string
          :required: true

     - The password of the account you would like to disconnect.

   * - ``partner_id_customer``

       .. type:: string
          :required: false

     - 	The partner ID of the account you would like to disconnect. It can be used instead of the parameters username
        and password.

Response
--------
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/xml; charset=utf-8

   <?xml version="1.0" encoding="UTF-8"?>
    <response>
        <success>true</success>
        <resultcode>10</resultcode>
        <resultmessage>Account disconnected successfully.</resultmessage>
    </response>

Possible response codes
^^^^^^^^^^^^^^^^^^^^^^^
.. list-table::
   :widths: auto

   * - ``10``

     - The account has been successfully disconnected.

   * - ``30``

     - You cannot disconnect this account because the combination of username and password is incorrect.

   * - ``35``

     - You cannot disconnect this account because you did not bring it in.
