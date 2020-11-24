Available payment methods
=========================

.. api-name:: Reseller API
   :version: 1

.. warning:: The Reseller API has been deprecated. Only selected partners still have access to this legacy functionality.
             As an alternative, we recommend to use the :doc:`Profiles API </reference/v2/profiles-api/get-profile>` for
             this action.

.. endpoint::
   :method: POST
   :url: https://www.mollie.com/api/reseller/v1/available-payment-methods

This method allows you to check which payment methods have been activated for a merchant.

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

     - The username of the account of which you would like to check which payment methods have been activated.

   * - ``password``

       .. type:: string

     - The password of the account of which you would like to check which payment methods have been activated.

   * - ``partner_id_customer``

       .. type:: string

     - The partner ID of the account of which you would like to check which payment methods have been activated. It can
       be used instead of the parameters ``username`` and ``password``.

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
