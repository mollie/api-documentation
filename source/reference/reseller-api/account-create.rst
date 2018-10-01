Create account
==============

.. api-name:: Reseller API
   :version: 1

.. endpoint::
   :method: POST
   :url: https://www.mollie.com/api/reseller/v1/account-create

.. note:: This API is only for `partners <https://www.mollie.com/partners>`_.

You can use this method to create an account for a merchant. This account will appear in your list of referred
merchants.

Parameters
----------
Make sure to add the :ref:`obligatory parameters <secret-keys>` always. Besides that, add the following
parameters:

.. list-table::
   :widths: auto

   * - ``testmode``

       .. type:: boolean
          :required: false

     - Values: ``1`` or leave out. If this option is switched on, no account will be created. You can use this option to
       experiment with creating accounts. The resulting partner ID will be ``1000``.

   * - ``username``

       .. type:: string
          :required: true

     - 	Chosen username

   * - ``name``

       .. type:: string
          :required: true

     - The merchant's full name.

   * - ``company_name``

       .. type:: string
          :required: true

     - 	Company Name

   * - ``email``

       .. type:: string
          :required: true

     - 	The merchant's e-mail address. A confirmation e-mail will be sent to this address.

   * - ``address``

       .. type:: string
          :required: true

     - Street and number

   * - ``zipcode``

       .. type:: string
          :required: true

     - 	Postal code

   * - ``city``

       .. type:: string
          :required: true

     - 	City

   * - ``country``

       .. type:: string
          :required: true

     - 	Country of the merchant in ISO 3166-1 alpha-2 format.

        Example: ``NL`` ``BE``

   * - ``locale``

       .. type:: string
          :required: false

     - 	Preferred locale for the merchant. Should be in locale format. This determines the language of any follow up
        communications from Mollie

        Example: ``nl_NL`` ``en_US``

   * - ``registration_number``

       .. type:: string
          :required: false

     - 	Registration number of this company, for Dutch companies the Chamber of Commerce registration number.

   * - ``legal_form``

       .. type:: string
          :required: false

     - 	Legal form of this company. Must be one of the following values:

        * ``sole proprietorship`` Sole proprietorship (Netherlands)
        * ``sole proprietorship-be`` Sole proprietorship (Belgium)
        * ``sole proprietor-bvba-be`` One-man private limited liability company (Belgium)
        * ``professional partnership`` Professional partnership (Netherlands)
        * ``general partnership`` General partnership (Netherlands)
        * ``general partnership-be`` General partnership (Belgium)
        * ``limited liability company`` Limited liability company (Netherlands)
        * ``private limited liability company-be`` Private limited liability company (Belgium)
        * ``limited partnership`` Limited partnership (Netherlands)
        * ``limited partnership-be`` Limited partnership (Belgium)
        * ``publicly traded partnership-be`` Publicly traded partnership (Belgium)
        * ``corp.`` Corp. (Netherlands)
        * ``corp.-be`` Corp. (Belgium)
        * ``co-operative society`` Co-operative society (Netherlands)
        * ``unlimited liability cooperative-be`` Unlimited liability cooperative (CVOA) (Belgium)
        * ``limited liability cooperative-be`` Limited liability cooperative (CVBA) (Belgium)
        * ``foundation`` Foundation (Netherlands)
        * ``foundation-be`` Foundation (Belgium)
        * ``association`` Association (Netherlands)
        * ``nonprofit association-be`` Nonprofit association (vzw) (Belgium)
        * ``government`` Public body (Netherlands)
        * ``church community`` Church community (Netherlands)
        * ``crown estate`` Crown estate (Netherlands)
        * ``agricultural partnership-be`` Agricultural partnership (Belgium)
        * ``economic interest grouping-be`` Economic interest grouping (Belgium)
        * ``european company-be`` European company (Belgium)
        * ``vvzrl-be`` Company or Association without corporate personality (Belgium)
        * ``non-be`` Foreign company (Belgium)
        * ``foreign comp`` Foreign company registered in the Netherlands (Netherlands)
        * ``non-nl`` Foreign company form

   * - ``representative``

       .. type:: string
          :required: false

     - 	Name of the legal representative of this company.

   * - ``billing_address``

       .. type:: string
          :required: false

     - 	Billing Address. When this field is included, you must fill out all ``billing_*`` fields.

   * - ``billing_zip code``

       .. type:: string
          :required: false

     - 	Billing zip code

   * - ``billing_city``

       .. type:: string
          :required: false

     - 	Billing city

   * - ``billing_country``

       .. type:: string
          :required: false

     - 	ISO 3166-1 alpha-2 country code for billing address.

        Example: ``NL`` ``BE``

   * - ``bankaccount_iban``

       .. type:: string
          :required: false

     - 	Payout IBAN. When this field is included, you must fill out all ``bankaccount_*`` fields.

   * - ``bankaccount_bic``

       .. type:: string
          :required: false

     - 	Bank BIC code

   * - ``bankaccount_bankname``

       .. type:: string
          :required: false

     - 	Bank Name

   * - ``bankaccount_location``

       .. type:: string
          :required: false

     - 	City where bank is domiciled

   * - ``vat_number``

       .. type:: string
          :required: false

     - 	VAT Number

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
      <resultmessage>Account created successfully.</resultmessage>
      <username>jandevries</username>
      <password>Vfj@$&amp;MC</password>
      <partner_id>127035</partner_id>
   </response>

Possible response codes
^^^^^^^^^^^^^^^^^^^^^^^
.. list-table::
   :widths: auto

   * - ``10``

     - The account has been successfully created.

   * - ``34``

     - The account cannot be created because one or more fields were rejected. A more extensive description has been
       included in the reply.

   * - ``36``

     - The account cannot be created because the username has been taken.
