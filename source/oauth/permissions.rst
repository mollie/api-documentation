Mollie Connect: Permissions
===========================

Accessing merchant data
-----------------------
Your app may request a set of permissions, which allow access to various endpoints of the Mollie API. All currently
available permissions are listed below.

Permissions can be requested by redirecting the resource owner to the
:doc:`Authorize endpoint </reference/oauth2/authorize>` with the requested permissions as a space separated list in the
``scope`` parameter.

.. list-table::
   :widths: auto

   * - | ``payments.read``
       | Payments API
     - View the merchant's payments, chargebacks and payment methods.

   * - | ``payments.write``
       | Payments API
     - Create payments for the merchant. The received payment will be added to the merchant's balance.

   * - | ``refunds.read``
       | Refunds API
     - View the merchant's refunds.

   * - | ``refunds.write``
       | Refunds API
     - Create or cancel refunds.

   * - | ``customers.read``
       | Customers API
     - View the merchant's customers.

   * - | ``customers.write``
       | Customers API
     - Manage the merchant's customers.

   * - | ``mandates.read``
       | Mandates API
     - View the merchant's mandates.

   * - | ``mandates.write``
       | Mandates API
     - Manage the merchant's mandates.

   * - | ``subscriptions.read``
       | Subscriptions API
     - View the merchant's subscriptions.

   * - | ``subscriptions.write``
       | Subscriptions API
     - Manage the merchant's subscriptions.

   * - | ``profiles.read``
       | Profiles API
     - View the merchant's website profiles.

   * - | ``profiles.write``
       | Profiles API
     - Manage the merchant's website profiles.

   * - | ``invoices.read``
       | Invoices API
     - View the merchant's invoices.

   * - | ``settlements.read``
       | Settlements API
     - View the merchant's settlements.

   * - | ``orders.read``
       | Orders API
     - View the merchant's orders.

   * - | ``orders.write``
       | Orders API
     - Manage the merchant's orders.

   * - | ``shipments.read``
       | Shipments API
     - View the merchant's order shipments.

   * - | ``shipments.write``
       | Shipments API
     - Manage the merchant's order shipments.

   * - | ``organizations.read``
       | Organizations API
     - View the merchant's organizational details.

   * - | ``organizations.write``
       | Organizations API
     - Change the merchant's organizational details.

   * - | ``onboarding.read``
       | Onboarding API
     - View the merchant's onboarding status.

   * - | ``onboarding.write``
       | Onboarding API
     - Submit onboarding data for the merchant.
