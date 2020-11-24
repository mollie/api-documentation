List all payment methods
========================
.. api-name:: Methods API
   :version: 2

.. endpoint::
   :method: GET
   :url: https://api.mollie.com/v2/methods/all

.. authentication::
   :api_keys: true
   :organization_access_tokens: true
   :oauth: true

Retrieve all payment methods that Mollie offers and can be activated by the Organization. The results are not paginated.
New payment methods can be activated via the :doc:`Enable payment method endpoint </reference/v2/profiles-api/enable-method>`
in the Profiles API.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``locale``

       .. type:: string
          :required: false

     - Passing a locale will translate the payment method names in the corresponding language.

       Possible values: ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
       ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV``
       ``lt_LT``

   * - ``amount``

       .. type:: amount object
          :required: false

     - An object containing ``value`` and ``currency``. Only payment methods that support the amount and currency
       are returned.

       Example: ``https://api.mollie.com/v2/methods/all?amount[value]=100.00&amount[currency]=USD``

Access token parameters
^^^^^^^^^^^^^^^^^^^^^^^
If you are using :doc:`organization access tokens </guides/authentication>` or are creating an
:doc:`OAuth app </oauth/overview>`, the following query string parameters are also available. With the ``profileId``
parameter, you must specify which profile you want to look at when listing methods. Organizations can have multiple
profiles for each of their websites. See :doc:`Profiles API </reference/v2/profiles-api/get-profile>` for more
information.

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: true

     - The website profile's unique identifier, for example ``pfl_3RkSN1zuPE``.

Includes
--------
This endpoint allows you to include additional information by appending the following values via the ``include``
querystring parameter.

* ``issuers`` Include issuer details such as which iDEAL or gift card issuers are available.
* ``pricing`` Include pricing for each payment method.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X GET https://api.mollie.com/v2/methods/all \
           -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setApiKey("test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM");

      $methods = $mollie->methods->allAvailable();

Response
--------
``200`` ``application/hal+json``

The response has the same elements as described in :doc:`List payment methods </reference/v2/methods-api/list-methods>`.
