Create account
==============
.. api-name:: Reseller API
   :version: 1

.. warning:: The Reseller API has been deprecated. Only selected partners still have access to this legacy
             functionality. We recommend using the :doc:`Onboarding API </connect/onboarding>` for this action.

.. endpoint::
   :method: POST
   :url: https://www.mollie.com/api/reseller/v1/account-create

You can use this method to create an account for a merchant. This account will appear in your list of referred
merchants.

Parameters
----------
Make sure to add the :ref:`obligatory parameters <secret-keys>` always. Besides that, add the following
parameters:

.. parameter:: testmode
   :type: boolean
   :condition: optional

   Values: ``1`` or leave out. If this option is switched on, no account will be created. You can use this option to
   experiment with creating accounts. The resulting partner ID will be ``1000``.

.. parameter:: username
   :type: string
   :condition: required

.. parameter:: name
   :type: string
   :condition: required

   The merchant's full name.

.. parameter:: company_name
   :type: string
   :condition: required

.. parameter:: email
   :type: string
   :condition: required

   The merchant's e-mail address. A confirmation e-mail will be sent to this address.

.. parameter:: address
   :type: string
   :condition: required

.. parameter:: zipcode
   :type: string
   :condition: required

.. parameter:: city
   :type: string
   :condition: required

.. parameter:: country
   :type: string
   :condition: required

   Country of the merchant in ISO 3166-1 alpha-2 format.

   Example: ``NL`` ``BE``

.. parameter:: locale
   :type: string
   :condition: optional

   Preferred locale for the merchant. You can provide any ``xx_XX`` format ISO 15897 locale. This determines the
   language of any follow-up communications from Mollie.

   Example: ``nl_NL`` ``en_US``

.. parameter:: registration_number
   :type: string
   :condition: optional

   Registration number of this company, for Dutch companies the Chamber of Commerce registration number.

.. parameter:: legal_form
   :type: string
   :condition: optional

   Legal form of this company. Must be one of the following values:

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

.. parameter:: representative
   :type: string
   :condition: optional

   Name of the legal representative of this company.

.. parameter:: billing_address
   :type: string
   :condition: optional

   Billing Address. When this field is included, you must fill out all ``billing_*`` fields.

.. parameter:: billing_zipcode
   :type: string
   :condition: optional

.. parameter:: billing_city
   :type: string
   :condition: optional

.. parameter:: billing_country
   :type: string
   :condition: optional

   ISO 3166-1 alpha-2 country code for billing address.

   Example: ``NL`` ``BE``

.. parameter:: bankaccount_iban
   :type: string
   :condition: optional

   Payout IBAN. When this field is included, you must fill out all ``bankaccount_*`` fields.

.. parameter:: bankaccount_bic
   :type: string
   :condition: optional

.. parameter:: bankaccount_bankname
   :type: string
   :condition: optional

.. parameter:: bankaccount_location
   :type: string
   :condition: optional

   	City where bank is domiciled.

.. parameter:: vat_number
   :type: string
   :condition: optional

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
   * - ``10``

   The account has been successfully created.

   * - ``34``

   The account cannot be created because one or more fields were rejected. A more extensive description has been
   included in the reply.

   * - ``36``

   The account cannot be created because the username has been taken.
