Enable voucher issuer
=====================
.. api-name:: Profiles API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/profiles/*id*/methods/voucher/issuers/*issuer*

.. authentication::
   :api_keys: false
   :oauth: true
   :organization_access_tokens: true

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/profiles/me/methods/voucher/issuers/*issuer*

.. authentication::
   :api_keys: true
   :oauth: false
   :organization_access_tokens: false

Enable a voucher issuer on a specific or authenticated profile to use it with payments.

Parameters
----------
Replace ``id`` in the endpoint URL by the profile's ID, for example ``pfl_v9hTwCvYqw`` and ``issuer`` with the
identifier of the issuer you want to activate, for example ``appetiz``.

.. parameter:: contractId
   :type: string
   :condition: optional

   The contract id of the related contractor. Please note, for the first call that will be made to an issuer of the
   contractor, this field is required. You do not have to provide the same contract id for other issuers of the same
   contractor. Update of the contract id will be possible through making the same call again with different contract ID
   value until the contract id is approved by the contractor.

Response
--------
``201`` ``application/hal+json``

.. parameter:: resource
   :type: string

   Indicates the response contains an issuer object. Will always contain ``issuer`` for this endpoint.

.. parameter:: id
   :type: string

   The unique identifier of the voucher issuer.

.. parameter:: description
   :type: string

   The full name of the voucher issuer.

.. parameter:: status
   :type: string

   The status that the issuer is in. Possible values: ``pending-issuer`` or ``activated``.

   * ``activated`` The issuer is activated and ready for use.
   * ``pending-issuer`` Activation of this issuer relies on you taking action with the issuer itself.

.. parameter:: contractor
   :type: object

   An object with contractor information.

   .. parameter:: id
      :type: string

   .. parameter:: name
      :type: string

   .. parameter:: contractId
      :type: string

.. parameter:: _links
   :type: object

   An object with several URL objects relevant to the voucher issuer. Every URL object will contain an ``href`` and a
   ``type`` field.

   .. parameter:: self
      :type: URL object

      The API resource URL of the voucher issuer itself.

   .. parameter:: documentation
      :type: URL object

      The URL to the voucher issuer retrieval endpoint documentation.

Example
-------

Request
^^^^^^^
.. code-block-selector::
  .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/profiles/pfl_v9hTwCvYqw/methods/voucher/issuers/appetiz \
           -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ" \
           -H "Content-Type: application/json" \
           --data-raw '{ "contractId": "abc123" }'

  .. code-block:: python
      :linenos:

      from mollie.api.client import Client

      mollie_client = Client()
      mollie_client.set_access_token("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ")

      profile = mollie_client.profiles.get("pfl_v9hTwCvYqw")
      issuer = profile.methods.enable_issuer("voucher", "appetiz", {"contractId": "abc123"})

Response
^^^^^^^^
.. code-block:: http
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

    {
        "resource": "issuer",
        "id": "appetiz",
        "description": "Appetiz",
        "status": "pending-issuer",
        "contractor": {
            "id": "Conecs",
            "name": "Conecs",
            "contractId": "abc123"
        },
        "image": {
            "size1x": "https://www.mollie.com/external/icons/voucher-issuers/apetiz.png",
            "size2x": "https://www.mollie.com/external/icons/voucher-issuers/apetiz%402x.png",
            "svg": "https://www.mollie.com/external/icons/voucher-issuers/apetiz.svg"
        },
        "_links": {
            "self": {
                "href": "https://api.mollie.com/v2/issuers/appetiz",
                "type": "application/hal+json"
            },
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/profiles-api/enable-voucher-issuer",
                "type": "text/html"
            }
        }
    }
