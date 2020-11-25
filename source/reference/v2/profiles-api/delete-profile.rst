Delete profile
==============
.. api-name:: Profiles API
   :version: 2

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/profiles/*id*

.. authentication::
   :api_keys: false
   :organization_access_tokens: true
   :oauth: true

This endpoint enables profile deletions, rendering the profile unavailable for further API calls and transactions.

Parameters
----------
Replace ``id`` in the endpoint URL by the profile's ID, for example ``pfl_v9hTwCvYqw``.

Response
--------
``204 No Content``

Example
-------

.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -X DELETE https://api.mollie.com/v2/profiles/pfl_v9hTwCvYqw \
         -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

   .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      $mollie->profiles->delete("pfl_v9hTwCvYqw");

   .. code-block:: ruby
      :linenos:

      require 'mollie-api-ruby'

      Mollie::Client.configure do |config|
        config.api_key = 'access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ'
      end

      Mollie::Profile.delete('pfl_v9hTwCvYqw')

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 204 No Content
