Get profiles
============

.. api-name:: Reseller API
   :version: 1

.. warning:: The Reseller API has been deprecated. Only selected partners still have access to this legacy functionality.
             As an alternative, we recommend to use the :doc:`Profiles API </reference/v2/profiles-api/get-profile>`
             for this action.

.. endpoint::
   :method: POST
   :url: https://www.mollie.com/api/reseller/v1/profiles

.. note:: This API is only for `partners <https://www.mollie.com/partners>`_.

This method allows you to retrieve all of a merchant's active website profiles.

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

     - The username of the account of which you would like to retrieve the bank accounts

   * - ``password``

       .. type:: string

     - The password of the account of which you would like to retrieve the bank accounts

   * - ``partner_id_customer``

       .. type:: string

     - The partner ID of the account of which you would like to retrieve the bank accounts. It can be used instead of
       the parameters ``username`` and ``password``

Response
--------
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/xml; charset=utf-8

   <?xml version="1.0"?>
   <response>
      <items>
         <profile>
            <name>Snoep.nl</name>
            <hash>9C696E36</hash>
            <website>http://snoep.nl/</website>
            <sector>6</sector>
            <category>5399</category>
            <verified>true</verified>
            <phone>0201234567</phone>
            <email>info@snoep.nl</email>
            <api_keys>
               <test>test_ImXWtEB4alZ149cxDrLxr1XDt8kbI9</test>
               <live>live_DjymcBSCZX4MijQ2RKHGTmAvB4J4xw</live>
            </api_keys>
         </profile>
      </items>
   </response>
