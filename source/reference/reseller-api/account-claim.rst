Claim account
=============

.. api-name:: Reseller API
   :version: 1

.. endpoint::
   :method: GET
   :url: https://www.mollie.com/api/reseller/v1/account-claim

.. note:: This API is only for `partners <https://www.mollie.com/partners>`_.

The account-claim method can be used to link an existing Mollie account to your own.

You then become the reseller of this account, and it will appear in the list of merchants you have referred. The
account will receive the same payment method rate as your other merchants. You will also receive a partner commission for
referring the merchant.

Parameters
----------
Make sure to add the :ref:`obligatory parameters <secret-keys>` always. Besides that, add the following
parameters:

.. list-table::
   :widths: auto

   * - ``username``

       .. type:: string
          :required: true

     - The username of the account you want to claim.

   * - ``password``

       .. type:: string
          :required: true

     - The password of the account you want to claim.

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
        <resultmessage>Succesfully claimed the account.</resultmessage>
        <partner_id>1337</partner_id>
        <username>chucknorris</username>
    </response>

Possible response codes
^^^^^^^^^^^^^^^^^^^^^^^
.. list-table::
   :widths: auto

   * - ``10``

     - The account has been successfully claimed.

   * - ``20``

     - The username field is missing.

   * - ``21``

     - The password field is missing.

   * - ``30``

     - The combination of username and password is incorrect.
