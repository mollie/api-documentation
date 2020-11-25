Enable payment method
=====================
.. api-name:: Profiles API
   :version: 2

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/profiles/*id*/methods/*method*

.. authentication::
   :api_keys: false
   :oauth: true
   :organization_access_tokens: true

.. endpoint::
   :method: POST
   :url: https://api.mollie.com/v2/profiles/me/methods/*method*

.. authentication::
   :api_keys: true
   :oauth: false
   :organization_access_tokens: false

Enable a payment method on a specific or authenticated profile to use it with payments.

.. note:: Some payment methods might need extra steps to be activated, for example an OAuth connection with the supplier.
          In those cases, the status will be set to ``pending-external`` and the response will contain a link to continue the activation.

Parameters
----------
Replace ``id`` in the endpoint URL by the profile's ID, for example ``pfl_v9hTwCvYqw`` and ``method`` with the name of
the method's ID you want to activate, for example ``ideal``. There is no need to set body parameters in this ``POST``
request.

Response
--------
An objects of ``method`` will be returned as described in :doc:`Get method </reference/v2/methods-api/get-method>`.

Example
-------

Request
^^^^^^^

.. code-block-selector::
  .. code-block:: bash
      :linenos:

      curl -X POST https://api.mollie.com/v2/profiles/pfl_v9hTwCvYqw/methods/ideal \
           -H "Authorization: Bearer access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ"

  .. code-block:: php
      :linenos:

      <?php
      $mollie = new \Mollie\Api\MollieApiClient();
      $mollie->setAccessToken("access_Wwvu7egPcJLLJ9Kb7J632x8wJ2zMeJ");
      $profile = $mollie->profiles->get('pfl_v9hTwCvYqw');

      $profile->enableMethod('ideal');

Response
^^^^^^^^
.. code-block:: none
   :linenos:

   HTTP/1.1 201 Created
   Content-Type: application/hal+json; charset=utf-8

   {
        "resource": "method",
        "id": "ideal",
        "description": "iDEAL",
        "minimumAmount": {
            "value": "0.01",
            "currency": "EUR"
        },
        "maximumAmount": {
            "value": "50000.00",
            "currency": "EUR"
        },
        "image": {
            "size1x": "https://www.mollie.com/external/icons/payment-methods/ideal.png",
            "size2x": "https://www.mollie.com/external/icons/payment-methods/ideal%402x.png",
            "svg": "https://www.mollie.com/external/icons/payment-methods/ideal.svg"
        },
        "status": "activated",
        "_links": {
            "self": {
                "href": "https://api.mollie.com/v2/methods/ideal",
                "type": "application/hal+json"
            },
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/profiles-api/enable-method",
                "type": "text/html"
            }
        }
    }