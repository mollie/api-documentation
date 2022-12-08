Create profile
==============
.. api-name:: Reseller API
   :version: 1

.. warning:: The Reseller API has been deprecated. Only selected partners still have access to this legacy
             functionality. As an alternative, we recommend using the
             :doc:`Profiles API </reference/v2/profiles-api/overview>` for this action.

.. endpoint::
   :method: POST
   :url: https://www.mollie.com/api/reseller/v1/create-profile

This method allows you to create a website profile for a merchant.

Parameters
----------
Make sure to add the :ref:`obligatory parameters <secret-keys>` always. Besides that, add the following
parameters:

.. note:: It is not necessary to set ``username`` and ``password`` if you are using ``partner_id_customer``. Otherwise
   both are required to set.

.. parameter:: username
   :type: string

   The username of the account you would like to create a profile for.

.. parameter:: password
   :type: string

   The password of the account you would like to create a profile for.

.. parameter:: partner_id_customer
   :type: string

   The partner ID of the account you would like to create a profile for. It can be used instead of the parameters
   ``username`` and ``password``.

.. parameter:: name
   :type: string
   :condition: required

   The name of the website profile.

.. parameter:: website
   :type: URL
   :condition: required

   The url of the website profile. The URL must be compliant to `RFC3986 <https://tools.ietf.org/html/rfc3986>`_ with
   the exception that we only accept URLs with ``http://`` or ``https://`` schemes and domains that contain a TLD. URLs
   containing an ``@`` are not allowed.

.. parameter:: email
   :type: string
   :condition: required

   The e-mail address at which customers can reach the merchant.

.. parameter:: phone
   :type: string
   :condition: required

   The phone number at which customers can reach the merchant.

.. parameter:: category
   :type: string
   :condition: optional

   .. warning:: Be aware that from September the ``category`` parameter will be deprecated and replaced by a new
                business category parameter. We will continue to provide support for the ``category`` parameter
                until 2022, but please revisit our documentation in September to learn how to update your API calls.

   The category in which the merchant is active. The value is a merchant category code. Must be one of the following
   values:

   * ``5192`` Books, magazines and newspapers
   * ``5262`` Marketplaces, crowdfunding, donation platforms
   * ``5399`` General merchandise
   * ``5499`` Food and drinks
   * ``5533`` Automotive Products
   * ``5641`` Children Products
   * ``5651`` Clothing & Shoes
   * ``5712`` Home furnishing
   * ``5732`` Electronics, computers and software
   * ``5734`` Hosting/VPN services
   * ``5735`` Entertainment
   * ``5815`` Credits/vouchers/giftcards
   * ``5921`` Alcohol
   * ``5944`` Jewelry & Accessories
   * ``5945`` Hobby, Toy, and Game Shops
   * ``5977`` Health & Beauty products
   * ``6012`` Financial services
   * ``6051`` Crypto currency
   * ``7299`` Consultancy
   * ``7922`` Events, conferences, concerts, tickets
   * ``7997`` Gyms, membership fee based sports
   * ``7999`` Travel, rental and transportation
   * ``8111`` Lawyers and legal advice
   * ``8299`` Advising/coaching/training
   * ``8398`` Charity and donations
   * ``8699`` Political parties
   * ``9399`` Government services
   * ``0`` Other

Response
--------
.. code-block:: none
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
            <category>5499</category>
            <verified>false</verified>
            <phone>0201234567</phone>
            <email>info@snoep.nl</email>
            <api_keys>
                <test>test_ImXWtEB4alZ149cxDrLxr1XDt8kbI9</test>
                <live>live_DjymcBSCZX4MijQ2RKHGTmAvB4J4xw</live>
            </api_keys>
        </profile>
   </response>
