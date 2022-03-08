Profiles API
============
Profiles are fundamental to most parts of the Mollie API. Both payment processing and payment method activation are
profile-based.

As a merchant you therefore normally create at least one *profile* under your Mollie account during onboarding. In some
cases you may want to create multiple profiles, for example if your organization is running multiple online stores.

The Profiles API enables you to manage profiles and payment methods.

Endpoints
---------
.. endpoint-card::
   :name: Create profile
   :method: POST
   :url: /v2/profiles
   :ref: /reference/v2/profiles-api/create-profile

   Create a profile.

.. endpoint-card::
   :name: Get profile
   :method: GET
   :url: /v2/profiles/*id*
   :ref: /reference/v2/profiles-api/get-profile

   Retrieve details of a specific profile.

.. endpoint-card::
   :name: Get current profile
   :method: GET
   :url: /v2/profiles/me
   :ref: /reference/v2/profiles-api/get-profile-me

   Retrieve details of the currently authenticated profile.

.. endpoint-card::
   :name: Update profile
   :method: PATCH
   :url: /v2/profiles/*id*
   :ref: /reference/v2/profiles-api/update-profile

   Update a specific profile.

.. endpoint-card::
   :name: Delete profile
   :method: DELETE
   :url: /v2/profiles/*id*
   :ref: /reference/v2/profiles-api/delete-profile

   Delete a specific profile.

.. endpoint-card::
   :name: List profiles
   :method: GET
   :url: /v2/profiles
   :ref: /reference/v2/profiles-api/list-profiles

   List all profiles.

.. endpoint-card::
   :name: Enable payment method
   :method: POST
   :url: /v2/profiles/*id*/methods/*method*
   :ref: /reference/v2/profiles-api/enable-method

   Enable a payment method on a profile.

.. endpoint-card::
   :name: Disable payment method
   :method: DELETE
   :url: /v2/profiles/*id*/methods/*method*
   :ref: /reference/v2/profiles-api/disable-method

   Disable a payment method on a profile.

.. endpoint-card::
   :name: Enable gift card issuer
   :method: POST
   :url: /v2/profiles/*id*/methods/giftcard/issuers/*issuer*
   :ref: /reference/v2/profiles-api/enable-gift-card-issuer

   Enable a gift card issuer on a profile.

.. endpoint-card::
   :name: Disable gift card issuer
   :method: DELETE
   :url: /v2/profiles/*id*/methods/giftcard/issuers/*issuer*
   :ref: /reference/v2/profiles-api/disable-gift-card-issuer

   Disable a gift card issuer on a profile.

.. endpoint-card::
   :name: Enable voucher issuer
   :method: POST
   :url: /v2/profiles/*id*/methods/voucher/issuers/*issuer*
   :ref: /reference/v2/profiles-api/enable-voucher-issuer

   Enable a voucher issuer on a profile.

.. endpoint-card::
   :name: Disable voucher issuer
   :method: DELETE
   :url: /v2/profiles/*id*/methods/voucher/issuers/*issuer*
   :ref: /reference/v2/profiles-api/disable-voucher-issuer

   Disable a voucher issuer on a profile.
