Integrating Mollie in your mobile app
=====================================

This guide will help you to integrate Mollie in a mobile app for devices such as mobile phones and tablets. Several
factors should be considered, such as store rules and regulations, and security and technical considerations.

.. _app-store-r-r:

App store rules and regulations
-------------------------------

Some app stores place limitations on any payment mechanism that does not use the app store's billing APIs.

iOS
^^^
Apple is very strict when it comes to following the guidelines. They have a mandatory review which means that your app
must be reviewed by Apple before it can be downloaded from the App Store. All the rules for iOS apps can be found in
the `App Store Review Guidelines <https://developer.apple.com/app-store/review/guidelines/#payments>`_ under the section
**Payments**.

Under these guidelines you may only use external payment methods (e.g. the methods provided by Mollie) for selling
physical goods, not for digital goods or services.

Android
^^^^^^^
Google is somewhat looser when it comes to checking apps before they can be distributed via the store. However, Google
also has a number of guidelines for its Google Play store which you can find in the
`Google Play Developer Policy <https://play.google.com/about/monetization-ads/payments/>`_. Google performs random
checks to verify that apps comply with their guidelines.

You must use Google Play In-app Billing in any case, except when:

* Payment is solely for physical products
* Payment is for digital content that may be consumed outside of the app itself (e.g. songs that can be played on other
  music players).

Consult your app store's terms and conditions to find out what exact limitations apply to your situation.

Payment method rules and regulations
------------------------------------

Additionally, some payment methods place limitations on how they can be embedded in a WebView. For example, the iDEAL
R&R disallows hiding the URL of the issuer's hosted payment pages and forbids placing the payment in a WebView, since that
allows your app to inject code into the banking pages.

Security considerations
-----------------------

Note that your app is distributed to and executed on mobile devices after being installed from the app store. Since
you do not control the mobile device, you should not put Mollie API keys inside the app. If the app is installed on a
rooted device, any keys in the app can easily be extracted by an attacker. Even on a non-rooted device, the keys could be
stolen by a MITM proxy server.

In principle, you should consider the device your app is installed on untrusted.

To make matters even worse, any API keys shipped with your app cannot be reset, since that will break all installed
apps that use the same API key.

Hence, any communication with the Mollie APIs must not be done by the app but by a trusted back end service under your
control. This service should authenticate your app, perform any needed API calls with Mollie and forward any information
needed by your app such as the checkout URL to the app.

The app is untrusted, so you cannot accept any values from the app (for example, an amount). In your trusted back end
service you must always determine the parameters for creating payments, orders or refunds according to your business
rules.

Integrating with other mobile apps
----------------------------------

Your customers will expect your app to play nice with the apps they use for making payments from their mobile device,
such as the banking apps of iDEAL issuers or the Bancontact app.

These apps will often use custom URL schemes which you will need to take extra precautions with to make sure that any
redirects to these custom URL schemes cause the app to open. To make it even more complicated, some apps are not
registered to a custom scheme but to the prefix of a regular (HTTPS) URL.

When your customer finishes the payment using the app, the banking app won't know how to return to your app. You will
need to use your custom scheme to return to your app after the payment. Mollie's API accepts custom URL schemes for the
``redirectUrl`` parameters.

Note that this is usually handled correctly if you open the checkout URL in the mobile device's default browser instead
of an embedded WebView inside your app.

Webhooks
--------

Webhooks cannot be sent to mobile devices and since the payment status is not always known when your customer returns
to the app, you cannot rely on checking on your customer's return to your app.

You should set the ``webhookUrl`` parameters to an endpoint on your trusted back end service, which then sends a silent
push notification to the app. The app can then show the appropriate messages or take appropriate action.
