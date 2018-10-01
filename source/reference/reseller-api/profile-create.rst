Create profile
==================

.. api-name:: Reseller API
   :version: 1

.. endpoint::
   :method: POST
   :url: https://www.mollie.com/api/reseller/v1/create-profile

.. note:: This API is only for `partners <https://www.mollie.com/partners>`_.

This method allows you to create a website profile for a merchant.

Parameters
----------
Make sure to add the :ref:`obligatory parameters <secret-keys>` always. Besides that, add the following
parameters:

.. list-table::
   :widths: auto

   * - ``username``

       .. type:: string
          :required: true

     - The username of the account you would like to create a profile for.

   * - ``password``

       .. type:: string
          :required: true

     - The password of the account you would like to create a profile for.

   * - ``partner_id_customer``

       .. type:: string
          :required: false

     -  The partner ID of the account you would like to create a profile for. It can be used instead of the parameters
        ``username`` and ``password``.

   * - ``name``

       .. type:: string
          :required: true

     - The name of the website profile.

   * - ``website``

       .. type:: URL
          :required: true

     - The url of the website profile

   * - ``email``

       .. type:: string
          :required: true

     - The e-mail address at which customers can reach the merchant.

   * - ``phone``

       .. type:: string
          :required: true

     - The phone number at which customers can reach the merchant.

   * - ``category``

       .. type:: string
          :required: false

     - The category in which the merchant is active. The value is a merchant category code. Must be one of the following
       values:

        * ``5399`` Physical Products
        * ``5732`` Electronics, Computers and Software
        * ``4121`` Travel, Rentals, Transport
        * ``6012`` Financial Services
        * ``5499`` Food and Drink
        * ``7999`` Events, Festivals and Recreation
        * ``5192`` Books, Magazines and Newspapers
        * ``7299`` Physical Services
        * ``8398`` Charities and Donations
        * ``0`` Other

Response
--------
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/xml; charset=utf-8

   <?xml version="1.0" encoding="UTF-8"?>
   <response version="v1">
        <success>true</success>
        <resultcode>10</resultcode>
        <resultmessage>Profile created successfully</resultmessage>
        <profile>
            <name>Snoep.nl</name>
            <hash>9C696E36</hash>
            <website>http://snoep.nl/</website>
            <sector>6</sector>
            <category>5399</category>
            <verified>false</verified>
            <phone>0201234567</phone>
            <email>info@snoep.nl</email>
            <api_keys>
                <test>test_ImXWtEB4alZ149cxDrLxr1XDt8kbI9</test>
                <live>live_DjymcBSCZX4MijQ2RKHGTmAvB4J4xw</live>
            </api_keys>
        </profile>
   </response>
