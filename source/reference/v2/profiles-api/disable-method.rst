Disable payment method
======================
.. api-name:: Profiles API
   :version: 2

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/profiles/*id*/methods/*method*

.. authentication::
   :api_keys: false
   :oauth: true
   :organization_access_tokens: true

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/profiles/me/methods/*method*

.. authentication::
   :api_keys: true
   :oauth: false
   :organization_access_tokens: false

Disable a payment method on a specific or authenticated profile.

.. warning:: Disabling a payment method may affect more integrations of the organization than just your own. In general,
             explicitly disabling a payment method is not necessary.

Parameters
----------
Replace ``id`` in the endpoint URL by the profile's ID, for example ``pfl_v9hTwCvYqw`` and ``method`` with the name of
the method's ID you want to disable, for example ``bancontact``.

Response
--------
``204 No Content``

Example
-------

Request
^^^^^^^
.. code-block-selector::
  .. code-block:: bash
     :linenos:

     curl -X DELETE https://api.mollie.com/v2/profiles/pfl_v9hTwCvYqw/methods/ideal \
         -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

  .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      $profile = $mollie->profiles->get('pfl_v9hTwCvYqw'));

      $profile->disableMethod('ideal');

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 204 No Content
