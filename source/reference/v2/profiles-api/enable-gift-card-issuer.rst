Enable gift card issuer
=======================
.. api-name:: Profiles API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/profiles/*id*/methods/giftcard/issuers/*issuer

.. authentication::
   :api_keys: false
   :oauth: true
   :organization_access_tokens: true

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/profiles/me/methods/giftcard/issuers/*issuer*

.. authentication::
   :api_keys: true
   :oauth: false
   :organization_access_tokens: false

Enable a gift card issuer on a specific or authenticated profile to use it with payments.

Parameters
----------
Replace ``id`` in the endpoint URL by the profile's ID, for example ``pfl_v9hTwCvYqw`` and ``issuer`` with the name of
the issuer's ID you want to activate, for example ``festivalcadeau``. There is no need to set body parameters in this ``POST``
request.

Response
--------
``201`` ``application/hal+json``

..  list-table::
    :widths: auto

    * - ``resource``

        .. type:: string

      - Indicates the response contains an issuer object. Will always contain ``issuer`` for this endpoint.

    * - ``id``

        .. type:: string

      - The unique identifier of the gift card issuer.

    * - ``description``

        .. type:: string

      - The full name of the gift card issuer.

    * - ``status``

        .. type:: string

      - The status that the issuer is in. Possible values: ``pending-issuer`` or ``activated``.

        .. list-table::
           :widths: auto

           * - ``activated``

               .. type:: string

             - The issuer is activated and ready for use.

           * - ``pending-issuer``

               .. type:: string

             - Activation of this issuer relies on you taking action with the issuer itself.

    * - ``_links``

        .. type:: object

      - An object with several URL objects relevant to the gift card issuer. Every URL object will contain an ``href`` and
        a ``type`` field.

        .. list-table::
           :widths: auto

           * - ``self``

               .. type:: URL object

             - The API resource URL of the gift card issuer itself.

           * - ``documentation``

               .. type:: URL object

             - The URL to the gift card issuer retrieval endpoint documentation.

Request
^^^^^^^
.. code-block-selector::
  .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/profiles/pfl_v9hTwCvYqw/methods/giftcard/issuers/festivalcadeau \
           -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

    {
        "resource": "issuer",
        "id": "festivalcadeau",
        "description": "FestivalCadeau Giftcard",
        "status": "pending-issuer",
        "_links": {
            "self": {
                "href": "https://api.mollie.com/v2/issuers/festivalcadeau",
                "type": "application/hal+json"
            },
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/profiles-api/enable-giftcard-issuer",
                "type": "text/html"
            }
        }
    }
