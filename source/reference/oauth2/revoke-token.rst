Revoke token
============
.. api-name:: OAuth API

.. endpoint::
   :method: DELETE
   :url: https://api.mollie.com/oauth2/tokens

Authentication: :doc:`OAuth client credentials </connect/overview>`

Revoke an access- or a refresh token. Once revoked the token can not be used anymore.

.. warning:: When you revoke a refresh token, all access tokens based on the same authorization grant will be revoked
   as well.

Parameters
----------
.. parameter:: token_type_hint
   :type: string
   :condition: required

   Type of the token you want to revoke.

   Possible values: ``access_token`` ``refresh_token``

.. parameter:: token
   :type: string
   :condition: required

   The token you want to revoke

Response
--------
``204 No Content``

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl -u client_id:client_secret
       -X DELETE https://api.mollie.com/oauth2/tokens \
       -d "token_type_hint=refresh_token&token=refresh_FS4xc3Mgci2xQ5s5DzaLXh3HhaTZOP"
