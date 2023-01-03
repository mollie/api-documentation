Onboard your customers at Mollie
================================
As part of the Mollie Connect toolkit we offer white-label onboarding, along with a set of onboarding APIs and tools.
This allows you to provide a simplified Mollie onboarding experience for your customers, integrating the Mollie
onboarding deeper into your own onboarding flow.

This guide provides an overview of how to set up our white-label onboarding for your customers.

Step 1: Enable hosted onboarding
--------------------------------
If you are new to OAuth, have a look at the :doc:`Mollie Connect overview </connect/overview>` and the
:doc:`Getting started guide for OAuth </connect/getting-started>` before proceeding.

Once you have an OAuth app up and running, you can
`turn on hosted onboarding <https://www.mollie.com/dashboard/settings/hosted-onboarding>`_ in the Mollie Dashboard.

You will have to provide a logo, name, and the redirect URL of your OAuth app.

Step 2: Implement the OAuth authorization flow
----------------------------------------------
Now that you have registered your OAuth app, you can implement the basic OAuth authorization flow. This is necessary
because you will have to ask your user permission to control their Mollie onboarding.

Again, if you are unfamiliar with OAuth, see the :doc:`Getting started guide </connect/getting-started>` for more
details on the authorization flow.

To onboard customers, you commonly need these three permissions:

.. list-table::
   :widths: auto

   * - ``organizations.write``
       Organizations API
     - Change the details of the merchant organization.

   * - ``onboarding.read``
       Onboarding API
     - View the merchant's onboarding status.

   * - ``onboarding.write``
       Onboarding API
     - Submit onboarding data on behalf of the merchant.

Step 3: Have your customer sign up and grant permission
-------------------------------------------------------
Now that have an app with the OAuth authorization flow implemented and the right permissions configured, you can start
sending your customers to the authorization screen.

On this screen your customers can either use an existing Mollie account, or sign up for a new Mollie account on the
spot.

Once they are logged in, your customers will be asked to give permission to your app to submit onboarding data on their
behalf.

.. image:: images/oauth-permission-onboarding@2x.png

Step 4: Customer starts onboarding
----------------------------------
Now that you have permission to view the onboarding status of your customer, you can check the status using the
:doc:`Get onboarding status </reference/v2/onboarding-api/get-onboarding-status>` endpoint.

The endpoint also includes a URL to the white-labeled onboarding flow. You can send your customer to this URL so they
can provide the required onboarding information.

Before you do so, you may want to provide onboarding data you already have on the customer using the
:doc:`Submit onboarding data </reference/v2/onboarding-api/submit-onboarding-data>` endpoint. This is possible as long
as the onboarding status of the new account is set to ``needs-data``.

Any data you submit up front in this fashion will be prefilled in the white-labeled onboarding flow.

Step 5: Wait for your customer to complete the onboarding
---------------------------------------------------------
While you wait for the customer to complete their onboarding, you can use the
:doc:`Onboarding status </reference/v2/onboarding-api/get-onboarding-status>` endpoint response to display the
appropriate message to your customer.

The possible onboarding statuses are ``needs-data``, ``in-review``, and ``completed``.

Additionally, there are two milestones that the customer reaches during the Mollie onboarding: ``canReceivePayments``
(basic information has been provided) and ``canReceiveSettlements`` (all information has been provided and verified).

We recommend showing the following onboarding status messages to your customers:

+----------------+------------------+---------------------+------------------------------------------------------------+
| Status         | Payments enabled | Settlements enabled | Message you can show to customer                           |
+================+==================+=====================+============================================================+
| ``needs-data`` | ``false``        | ``false``           | Before you can receive payments, Mollie needs more         |
|                |                  |                     | information. <Link to onboarding URL>                      |
+----------------+------------------+---------------------+------------------------------------------------------------+
| ``needs-data`` | ``true``         | ``false``           | You can start receiving payments. Before Mollie can pay    |
|                |                  |                     | out to your bank, you need to provide some additional      |
|                |                  |                     | information. <Link to onboarding URL>                      |
+----------------+------------------+---------------------+------------------------------------------------------------+
| ``in-review``  | ``false``        | ``false``           | Mollie has all the required information and is verifying   |
|                |                  |                     | your details.                                              |
+----------------+------------------+---------------------+------------------------------------------------------------+
| ``in-review``  | ``true``         | ``false``           | You can start receiving payments. Mollie is verifying your |
|                |                  |                     | details to enable settlements to your bank.                |
+----------------+------------------+---------------------+------------------------------------------------------------+
| ``completed``  | ``true``         | ``true``            | Setup is complete!                                         |
+----------------+------------------+---------------------+------------------------------------------------------------+
