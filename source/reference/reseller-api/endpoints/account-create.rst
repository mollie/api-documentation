Create account
==============

.. api-name:: Reseller API
   :version: 1

.. warning:: The Reseller API has been deprecated. Only selected partners still have access to this legacy functionality.
             We recommend to use the :doc:`Onboarding API </oauth/onboarding>` for this action.

.. endpoint::
   :method: POST
   :url: https://www.mollie.com/api/reseller/v1/account-create

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

        * ``eenmanszaak`` Sole proprietorship (Netherlands)
        * ``eenmanszaak-be`` Sole proprietorship (Belgium)
        * ``eenmans-bvba-be`` One-man private limited liability company (Belgium)
        * ``maatschap`` Professional partnership (Netherlands)
        * ``vof`` General partnership (Netherlands)
        * ``vof-be`` General partnership (Belgium)
        * ``bv`` Limited liability company (Netherlands)
        * ``bvba-be`` Private limited liability company (Belgium)
        * ``cv`` Limited partnership (Netherlands)
        * ``commv-be`` Limited partnership (Belgium)
        * ``commva-be`` Publicly traded partnership (Belgium)
        * ``nv`` Corp. (Netherlands)
        * ``nv-be`` Corp. (Belgium)
        * ``cooperatie`` Co-operative society (Netherlands)
        * ``cvoa-be`` Unlimited liability cooperative (CVOA) (Belgium)
        * ``cvba-be`` Limited liability cooperative (CVBA) (Belgium)
        * ``stichting`` Foundation (Netherlands)
        * ``stichting-be`` Foundation (Belgium)
        * ``vereniging`` Association (Netherlands)
        * ``vzw-be`` Nonprofit association (vzw) (Belgium)
        * ``overheid`` Public body (Netherlands)
        * ``kerkgenootschap`` Church community (Netherlands)
        * ``kroondomein`` Crown estate (Netherlands)
        * ``lbvn-be`` Agricultural partnership (Belgium)
        * ``esv-be`` Economic interest grouping (Belgium)
        * ``es-be`` European company (Belgium)
        * ``vvzrl-be`` Company or Association without corporate personality (Belgium)
        * ``niet-be`` Foreign company (Belgium)
        * ``buitenlandse-ven`` Foreign company registered in the Netherlands (Netherlands)
        * ``niet-nl`` Foreign company form

   * - ``representative``

       .. type:: string
          :required: false

     - 	Name of the legal representative of this company.

   * - ``billing_address``

       .. type:: string
          :required: false

     - 	Billing Address. When this field is included, you must fill out all ``billing_*`` fields.

   * - ``billing_zipcode``

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
.. code-block:: none
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
