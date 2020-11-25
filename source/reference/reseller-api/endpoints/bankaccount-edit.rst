Update bankaccount
==================

.. api-name:: Reseller API
   :version: 1

.. warning:: The Reseller API has been deprecated. Only selected partners still have access to this legacy functionality.
             At this moment, it's no longer possible to update bank account information through the API. This information
             can still be updated via our Dashboard.

.. endpoint::
   :method: POST
   :url: https://www.mollie.com/api/reseller/v1/bankaccount-edit

This method allows you to change a merchant's bank account.

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

     - The username of the account of which you would like to change the bank account

   * - ``password``

       .. type:: string

     - The password of the account of which you would like to change the bank account

   * - ``partner_id_customer``

       .. type:: string

     - The partner ID of the account of which you would like to change the bank account. It can be used instead of the
       parameters ``username`` and ``password``.

   * - ``id``

       .. type:: string
          :required: true

     - The ID of the bank account you would like to change

   * - ``name``

       .. type:: string
          :required: false

     - Account name

   * - ``iban``

       .. type:: string
          :required: false

     - Payout IBAN

   * - ``bic``

       .. type:: string
          :required: false

     - 	Bank BIC code

   * - ``bankname``

       .. type:: string
          :required: false

     - Bank Name

   * - ``location``

       .. type:: string
          :required: false

     - City where bank is domiciled

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
        <resultmessage>Bankaccount successfully updated.</resultmessage>
        <bankaccount>
            <id>9d7512a3d2c16b5f9dd49b7aae2d7eaf</id>
            <account_name>JAN JANSEN</account_name>
            <account_iban>NL40RABO0123456789</account_iban>
            <bank_bic>RABONL2U</bank_bic>
            <bank>RABOBANK</bank>
            <location>AMSTERDAM</location>
            <selected>true</selected>
            <verified>false</verified>
        </bankaccount>
    </response>
