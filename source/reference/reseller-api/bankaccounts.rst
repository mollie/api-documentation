Get bankaccount
===============

.. api-name:: Reseller API
   :version: 1

.. endpoint::
   :method: GET
   :url: https://www.mollie.com/api/reseller/v1/bankaccounts

.. note:: This API is only for `partners <https://www.mollie.com/partners>`_.

This method allows you to retrieve all of a customer's bank accounts.

Parameters
----------
Make sure to add the :ref:`obligatory parameters <secret-keys>` always. Besides that, add the following
parameters:

.. list-table::
   :widths: auto

   * - ``username``

       .. type:: string
          :required: true

     - The username of the account of which you would like to retrieve the bank accounts

   * - ``password``

       .. type:: string
          :required: true

     - The password of the account of which you would like to retrieve the bank accounts

   * - ``partner_id_customer``

       .. type:: string
          :required: false

     - The partner ID of the account of which you would like to retrieve the bank accounts. It can be used instead of
       the parameters username and password

Response
--------
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/xml; charset=utf-8

   <?xml version="1.0"?>
    <response>
        <items>
            <bankaccount>
                <id>9d7512a3d2c16b5f9dd49b7aae2d7eaf</id>
                <account_name>JAN JANSEN</account_name>
                <account_iban>NL40RABO0123456789</account_iban>
                <bic_code>RABONL2U</bic_code>
                <bank>RABOBANK</bank>
                <location>AMSTERDAM</location>
                <selected>true</selected>
                <verified>false</verified>
            </bankaccount>
        </items>
    </response>
