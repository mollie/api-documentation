Disconnect account
==================

.. api-name:: Reseller API
   :version: 1

.. warning:: The Reseller API has been deprecated. Only selected partners still have access to this legacy functionality.
             This functionality is no longer available.

.. endpoint::
   :method: POST
   :url: https://www.mollie.com/api/reseller/v1/disconnect-account

This method allows you to cancel one of your merchants as reseller. The link between your account and that of the
merchant will be broken. Any preferential rates your merchant enjoyed via your account will be re-adjusted to the normal
rates.

Parameters
----------
Make sure to add the :ref:`obligatory parameters <secret-keys>` always. Besides that, add the following
parameters:

.. note:: It is not necessary to set ``username`` and ``password`` if you are using ``partner_id_customer``. Otherwise
          both are required to set.

.. list-table::
   :widths: auto

   * - ``username``

       .. type:: string

     - The username of the account you would like to disconnect.

   * - ``password``

       .. type:: string

     - The password of the account you would like to disconnect.

   * - ``partner_id_customer``

       .. type:: string

     - 	The partner ID of the account you would like to disconnect. It can be used instead of the parameters ``username``
        and ``password``.

Response
--------
.. code-block:: none
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
