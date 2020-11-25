Authentication
==============

Getting started
---------------
The Mollie API offers three authentication methods:

* **API keys**: basic API access for a specific payment profile.
* **Organization access tokens**: advanced API access for organization-level data. (API v2 and later)
* **App access tokens (OAuth)**: for app developers who need access to the Mollie accounts of their app users.

We recommend creating basic API keys to get started.

Creating API keys
-----------------
The first thing you need is a `website profile <https://www.mollie.com/dashboard/settings/profiles>`_. Each website
profile has a *Live API key* and a *Test API key*.

While building and testing your integration, you should use the *Test API key*. Read more about the
test mode in our :doc:`guide </guides/testing>` about testing the Mollie API. Once you're ready to
start processing real payments, switch out your test key for the *Live API key*.

Of course it's very important to keep any API keys :doc:`secure </guides/security>`. Do not ever share them. However, if
a key leaks you can always `regenerate <https://www.mollie.com/dashboard/developers/api-keys>`_ it. Don't forget to
apply new keys to your code. Until you do your integration will not work.

Authenticating an API call
--------------------------
The API key or token must be sent along with each API request, by providing it in the HTTP call's ``Authorization``
header using the ``Bearer`` method. For example: a valid ``Authorization`` header is
``Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM``. Our default API clients provide shortcuts to easily set the API key or
access token. For example, our PHP client offers ``MollieApiClient::setApiKey()`` and
``MollieApiClient::setAccessToken()``.

In the example below we use a Test API key on the ``GET`` method of the ``payments``
:doc:`resource </reference/v2/payments-api/get-payment>`. This method fetches a payment - in this case the payment with
the fictional payment ID ``tr_WDqYK6vllg``.

.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/payments/tr_WDqYK6vllg \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

The response will be JSON.

.. code-block:: none
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json

   {
       "resource": "payment",
       "id": "tr_WDqYK6vllg",
       "mode": "test",
       "createdAt": "2018-03-12T11:51:35+00:00",
       "amount": {
           "value": "1.00",
           "currency": "EUR"
       },
       "description": "Order 66",
       "method": null,
       "metadata": null,
       "status": "open",
       "isCancelable": false,
       "expiresAt": "2018-03-12T12:06:35+00:00",
       "details": null,
       "profileId": "pfl_7N5qjbu42V",
       "sequenceType": "oneoff",
       "redirectUrl": "https://www.example.org/payment/completed",
       "_links": {
           "self": {
               "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg"
           },
           "checkout": {
               "href": "https://www.mollie.com/payscreen/select-method/WDqYK6vllg"
           }
       }
   }

Comparison of authentication methods
------------------------------------
For completeness' sake, the following table compares the available authentication methods.

.. list-table::
   :header-rows: 1

   * -
     - API key
     - Organization access token
     - App access token (OAuth)

   * - **Access level**
     - Access to all actions on the payment processing APIs for a specific payment profile.
     - Access to the API actions you selected when creating the token.
     - Access to the API actions the app user gave your app explicit permission to.

   * - **Requirements**
     - Create a payment profile first via
       `Dashboard: Profiles overview <https://www.mollie.com/dashboard/settings/profiles>`_, or using the
       :doc:`Profiles API </reference/v2/profiles-api/get-profile>`.
     - None.
     - Create an application, then have a user authorize your app to access their account data. See
       :doc:`Mollie Connect </oauth/overview>` for more information.

   * - **Test mode**
     - API keys come in pairs. Use the Test API key for test mode.
     - Use the ``testmode`` parameter in your request.
     - Use the ``testmode`` parameter in your request.

   * - **Create via**
     - `Dashboard: API keys <https://www.mollie.com/dashboard/developers/api-keys>`_
     - `Dashboard: Organization access tokens <https://www.mollie.com/dashboard/developers/organization-access-tokens>`_
     - :doc:`OAuth authorization flow </oauth/overview>`

