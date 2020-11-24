Disable gift card issuer
========================
.. api-name:: Profiles API
   :version: 2

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/profiles/*id*/methods/giftcard/issuers/*issuer*

.. authentication::
   :api_keys: false
   :oauth: true
   :organization_access_tokens: true

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/v2/profiles/me/methods/giftcard/issuers/*issuer*

.. authentication::
   :api_keys: true
   :oauth: false
   :organization_access_tokens: false

Disable a gift card issuer on a specific or authenticated profile.

Parameters
----------
Replace ``id`` in the endpoint URL by the profile's ID, for example ``pfl_v9hTwCvYqw`` and ``issuer`` with the name of
the issuer's ID you want to disable, for example ``festivalcadeau``.

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

     curl -X DELETE https://api.mollie.com/v2/profiles/pfl_v9hTwCvYqw/methods/giftcard/issuers/festivalcadeau \
         -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 204 No Content
