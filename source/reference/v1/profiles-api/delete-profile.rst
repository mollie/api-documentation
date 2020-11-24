Delete profile
==============
.. api-name:: Profiles API
   :version: 1

.. warning:: The v1 API has been deprecated. The v1 API will be supported for the foreseeable future, at least until
             July 2023. However, new features will only be added to the v2 API.

             The documentation for deleting profiles in the new v2 API can be found
             :doc:`here </reference/v2/profiles-api/delete-profile>`. For more information on the v2 API, refer to our
             :doc:`v2 migration guide </payments/migrating-v1-to-v2>`.

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v1/profiles/*id*

.. authentication::
   :api_keys: false
   :organization_access_tokens: false
   :oauth: true

This endpoint enables profile deletions, rendering the profile unavailable for further API calls and transactions.

Parameters
----------
Replace ``id`` in the endpoint URL by the payment profile's ID, for example ``pfl_v9hTwCvYqw``.

Response
--------
``204 No Content``

Example
-------

Request
^^^^^^^
.. code-block:: bash
   :linenos:

   curl -X DELETE https://api.mollie.com/v1/profiles/pfl_v9hTwCvYqw \
       -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 204 No Content
