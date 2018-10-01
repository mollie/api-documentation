Available payment methods
=========================

.. api-name:: Reseller API
   :version: 1

.. endpoint::
   :method: GET
   :url: https://www.mollie.com/api/reseller/v1/available-payment-methods

.. note:: This API is only for `partners <https://www.mollie.com/partners>`_.

This method allows you to check which payment methods have been activated for a merchant.

Parameters
----------
Make sure to add the :ref:`obligatory parameters <secret-keys>` always. Besides that, add the following
parameters:

.. list-table::
   :widths: auto

   * - ``username``

       .. type:: string
          :required: true

     - The username of the account of which you would like to check which payment methods have been activated.

   * - ``password``

       .. type:: string
          :required: true

     - The password of the account of which you would like to check which payment methods have been activated.

   * - ``partner_id_customer``

       .. type:: string
          :required: false

     - The partner ID of the account of which you would like to check which payment methods have been activated. It can
       be used instead of the parameters username and password.

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
         <resultmessage>Customer has the following payment services available.</resultmessage>
         <services>
            <ivr>true</ivr>
            <psms>true</psms>
            <ideal>false</ideal>
            <paysafecard>true</paysafecard>
            <creditcard>false</creditcard>
            <mistercash>false</mistercash>
         </services>
    </response>
