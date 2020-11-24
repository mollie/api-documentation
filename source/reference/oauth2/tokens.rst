Generate tokens
===============
.. api-name:: Connect API

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/oauth2/tokens

Authentication: :doc:`OAuth client credentials </oauth/overview>`

Exchange the auth code received at the :doc:`Authorize endpoint </reference/oauth2/authorize>` for an actual access
token, with which you can communicate with the Mollie API.

Parameters
----------
.. list-table::
   :widths: auto

   * - ``grant_type``

       .. type:: string
          :required: true

     - If you wish to exchange your auth code for an access token, use grant type ``authorization_code``. If you wish to
       renew your access token with your refresh token, use grant type ``refresh_token``.

       Possible values: ``authorization_code`` ``refresh_token``

   * - ``code``

       .. type:: string
          :required: false

     - The auth code you've received when creating the authorization. Only use this field when using grant
       type ``authorization_code``.

   * - ``refresh_token``

       .. type:: string
          :required: false

     - The refresh token you've received when creating the authorization. Only use this field when using
       grant type ``refresh_token``.

   * - ``redirect_uri``

       .. type:: string
          :required: false

     - The URL the merchant is sent back to once the request has been authorized. It must match the URL you set when
       :doc:`registering your app </oauth/getting-started>`.

       .. note::
          When refreshing a token, this parameter **is** required if the initial ``authorization_code`` grant request
          contained a ``redirect_uri``.

Response
--------
``200`` ``application/json; charset=utf-8``

.. list-table::
   :widths: auto

   * - ``access_token``

       .. type:: string

     - The access token, with which you will be able to access the Mollie API on the merchant's behalf.

   * - ``refresh_token``

       .. type:: string

     - The refresh token, with which you will be able to retrieve new access tokens on this endpoint. Please note that
       the refresh token does not expire.

   * - ``expires_in``

       .. type:: integer

     - The number of seconds left before the access token expires. Be sure to renew your access token before this
       reaches zero.

   * - ``token_type``

       .. type:: string

     - As per OAuth standards, the provided access token can only be used with bearer authentication.

       Possible values: ``bearer``

   * - ``scope``

       .. type:: string

     - A space separated list of permissions. Please refer to :doc:`Permissions </oauth/permissions>` for the full
       permission list.

Example
-------

Initial request
^^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -u app_j9Pakf56Ajta6Y65AkdTtAv:S5lTvMDTjl95HGnwYmsszDtbMp8QBE2lLcRJbD7I https://api.mollie.com/oauth2/tokens \
       -d "grant_type=authorization_code&code=auth_IbyEKUrXmGW1J8hPg6Ciyo4aaU6OAu"

Initial response
^^^^^^^^^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json; charset=utf-8

   {
       "access_token": "access_46EUJ6x8jFJZZeAvhNH4JVey6qVpqR",
       "refresh_token": "refresh_FS4xc3Mgci2xQ5s5DzaLXh3HhaTZOP",
       "expires_in": 3600,
       "token_type": "bearer",
       "scope": "payments.read organizations.read"
   }

Now that we have a refresh token, we should renew the access token before its expiry date as follows:

Refresh request
^^^^^^^^^^^^^^^
.. code-block:: bash
   :linenos:

   curl -u app_j9Pakf56Ajta6Y65AkdTtAv:S5lTvMDTjl95HGnwYmsszDtbMp8QBE2lLcRJbD7I https://api.mollie.com/oauth2/tokens \
       -d "grant_type=refresh_token&refresh_token=refresh_FS4xc3Mgci2xQ5s5DzaLXh3HhaTZOP"

Refresh response
^^^^^^^^^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/json; charset=utf-8

   {
       "access_token": "access_TRbHbeB3my8XywBAdT6HRkGAJMuh4",
       "refresh_token": "refresh_FS4xc3Mgci2xQ5s5DzaLXh3HhaTZOP",
       "expires_in": 3600,
       "token_type": "bearer",
       "scope": "payments.read organizations.read"
   }
