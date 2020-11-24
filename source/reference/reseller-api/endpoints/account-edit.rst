Update account
==============

.. api-name:: Reseller API
   :version: 1

.. warning:: The Reseller API has been deprecated. Only selected partners still have access to this legacy functionality.
             As an alternative, we recommend using :doc:`Mollie Connect </oauth/overview>` and the :doc:`Mollie v2 API
             </reference/v2/payments-api/create-payment>`.

.. endpoint::
   :method: POST
   :url: https://www.mollie.com/api/reseller/v1/account-edit

This method allows you to change an existing merchant. You can only change your own merchants. Please take note: some
changes may result in the merchant no longer receiving any payouts.

Parameters
----------
Make sure to add the :ref:`obligatory parameters <secret-keys>` always. Besides that, you can add parameters
as described in :doc:`Create account </reference/reseller-api/endpoints/account-create>`. Please note that you'll need to add one
additional required parameter just for this endpoint:

.. list-table::
   :widths: auto

   * - ``username``

       .. type:: string
          :required: true

     - The username of the account you would like to change.


Response
--------
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/xml; charset=utf-8

   <?xml version="1.0"?>
    <response>
        <success>true</success>
        <resultcode>10</resultcode>
        <resultmessage>Account edited successfully.</resultmessage>
        <username>Jan Janssen</username>
        <partner_id>123456</partner_id>
    </response>

Possible response codes
^^^^^^^^^^^^^^^^^^^^^^^
.. list-table::
   :widths: auto

   * - ``10``

     - The account has been successfully adjusted.

   * - ``30``

     - You cannot change this account, because the username is incorrect.

   * - ``34``

     - The account cannot be created because one or more fields were rejected. A more extensive description has been included in the reply.

   * - ``35``

     - You cannot change this account, because you did not bring in this account.
