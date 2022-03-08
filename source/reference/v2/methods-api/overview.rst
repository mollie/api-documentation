Methods API
===========
Using the Methods API you can retrieve a list of the payment methods currently active on your profile. This is useful
especially if you would like to integrate the payment method selection into your own checkout flow, since it allows you
to automatically load in all available payment methods.

For payment methods with issuer selection such as iDEAL, you can also retrieve the current list of issuers via the
Methods API.

For more information on customizing your checkout experience, see
:doc:`Build your own checkout </payments/build-your-own-checkout>`.

Payment methods can be activated via the Mollie Dashboard or via the
:doc:`Enable payment method endpoint </reference/v2/profiles-api/enable-method>` on the Profiles API. Payment methods
are activated per profile. If you run multiple websites, you can create a profile for each website and activate payment
methods for each profile separately.

Endpoints
---------
.. endpoint-card::
   :name: List payment methods
   :method: GET
   :url: /v2/methods
   :ref: /reference/v2/methods-api/list-methods

   Retrieve all payment methods enabled on a profile.

.. endpoint-card::
   :name: List all payment methods
   :method: GET
   :url: /v2/methods/all
   :ref: /reference/v2/methods-api/list-all-methods

   Retrieve all payment methods that Mollie offers.

.. endpoint-card::
   :name: Get payment method
   :method: GET
   :url: /v2/methods/*id*
   :ref: /reference/v2/methods-api/get-method

   Retrieve details of a specific payment method.
