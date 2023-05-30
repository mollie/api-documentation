Create client link
==================
.. api-name:: Clients API
   :version: 2
   :beta: true

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/client-links

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: false

.. note:: This functionality is currently in closed beta. Contact our partner management team if you are interested in
          testing this functionality with us.

Link a new organization to your :doc:`OAuth application </connect/getting-started>`, in effect creating a new client.
This is a two step process.

First, you must send your customer's details to this endpoint. You can provide data that will be pre-filled during
onboarding.

This endpoint's response will contain a special ``clientLink`` link where you are expected to redirect your customer.
This is the second step.

To the ``clientLink`` link, you must then add the OAuth details of your application, the ``client_id``, ``scopes`` you
want to request et cetera. These are the same parameters the :doc:`/reference/oauth2/authorize` endpoint takes. All
accepted parameters are :ref:`listed below <clientlink-parameters>`.

When you redirect your customer, an organization will be created, your OAuth application will be authorized
automatically and your customer will be logged in to their (newly created) Mollie Dashboard.

If the organization already exists, no new organization will be created. Instead the OAuth Authorize screen will be
shown to your customer, allowing them to grant the requested authorizations for their existing organization to your
OAuth application.

Finally, your customer will be redirected back to you (to the ``redirect_uri`` you specified when creating your OAuth
application). Then, the normal :doc:`OAuth Authorize flow </connect/getting-started>` where you exchange an `auth
token` for an `app access token` can be followed.

Once you have received the `app access token` for the organization, you can perform any other API calls on behalf of the
(newly created) organization using OAuth.

Your next step should probably be to create a Profile using the :doc:`/reference/v2/profiles-api/create-profile`
endpoint and :doc:`enable the payment methods </reference/v2/profiles-api/enable-method>` you want your customer to
use with Mollie.

Parameters
----------

.. parameter:: owner
   :type: object
   :condition: required

   Personal data of your customer which is required for this endpoint.

   .. parameter:: email
      :type: string
      :condition: required

      The email address of your customer.

   .. parameter:: givenName
      :type: string
      :condition: required

      The given name (first name) of your customer.

   .. parameter:: familyName
      :type: string
      :condition: required

      The family name (surname) of your customer.

   .. parameter:: locale
      :type: string
      :condition: optional

      Allows you to preset the language to be used in the login / authorize flow. When this parameter is omitted, the
      browser language will be used instead. You can provide any ``xx_XX`` format ISO 15897 locale, but the authorize flow
      currently only supports the following languages:

      Possible values: ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``es_ES`` ``it_IT``

.. parameter:: name
   :type: string
   :condition: required

   Name of the organization.

.. parameter:: address
   :type: address object
   :condition: required

   Address of the organization. Note that the ``country`` parameter must always be provided.

   .. parameter:: streetAndNumber
      :type: string
      :condition: conditional

      The street name and house number of the organization. If an address is provided, this field is required.

   .. parameter:: postalCode
      :type: string
      :condition: conditional

      The postal code of the organization. If an address is provided, this field is required for countries with a
      postal code system.

   .. parameter:: city
      :type: string
      :condition: conditional

      The city of the organization. If an address is provided, this field is required.

   .. parameter:: country
      :type: string
      :condition: required

      The country of the address in `ISO 3166-1 alpha-2 <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_ format.
      This field is always required.

.. parameter:: registrationNumber
   :type: string
   :condition: optional

   The Chamber of Commerce (or local equivalent) registration number of the organization.

.. parameter:: vatNumber
   :type: string
   :condition: optional

   The VAT number of the organization, if based in the European Union or the United Kingdom.

   Example: ``NL123456789B01``

.. _clientlink-parameters:

Parameters for the ``clientLink`` link
--------------------------------------

The ``clientLink`` link takes a subset of the parameters allowed for the :doc:`/reference/oauth2/authorize` endpoint:
``client_id``, ``state``, ``approval_prompt`` and ``scopes``.

.. note:: At a minimum, we recommend you request ``onboarding.read onboarding.write`` and any scopes required for
          orders or payments you want to create. ``onboarding.read`` is required if you wish to follow the onboarding
          progress via the :doc:`/reference/v2/onboarding-api/get-onboarding-status` endpoint
          or `Mollie Dashboard <https://www.mollie.com/dashboard/partners/clients>`_.

Example
^^^^^^^

.. code-block:: none
   :linenos:

   https://my.mollie.com/dashboard/client-link/finalize/csr_vZCnNQsV2UtfXxYifWKWH?client_id=app_j9Pakf56Ajta6Y65AkdTtAv&state=decafbad&scopes=onboarding.read+organization.read+payments.write+payments.read+profiles.write

In case of an invalid value, your customer will be redirected to the redirect URI set for your OAuth application with
the ``error`` and ``error_description`` query parameters added.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/client-links \
           -H "Content-Type: application/json" \
           -H "Authorization: Bearer access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
           -d '{
                   "owner": {
                      "email": "norris@chucknorrisfacts.net",
                      "givenName": "Chuck",
                      "familyName": "Norris",
                      "locale": "en_US"
                   },
                   "address": {
                      "streetAndNumber": "Keizersgracht 126",
                      "postalCode": "1015 CW",
                      "city": "Amsterdam",
                      "country": "NL"
                   },
                   "name": "Mollie B.V.",
                   "registrationNumber": "30204462",
                   "vatNumber": "NL815839091B01"
               }'

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

   {
       "id": "csr_vZCnNQsV2UtfXxYifWKWH",
       "resource": "client-link",
       "_links": {
           "clientLink": {
               "href": "https://my.mollie.com/dashboard/client-link/finalize/csr_vZCnNQsV2UtfXxYifWKWH",
               "type": "text/html"
           },
           "documentation": {
               "href": "https://docs.mollie.com/reference/v2/clients-api/create-client-link",
               "type": "text/html"
           }
       }
   }
