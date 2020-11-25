Mollie Connect: Overview
========================
**Mollie Connect** allows you to create apps for Mollie merchants using `OAuth <https://en.wikipedia.org/wiki/OAuth>`_.
OAuth allows you to access merchants' organizations with their consent, without having to manually exchange API keys.
Whether you are just looking to improve your customers' experiences, to automate essential business processes, or to
whitelabel our platform completely, it is all possible with OAuth.

Our OAuth platform allows you to:

* Create Payments, Orders and Refunds on behalf of merchants;
* Manage merchants' website profiles and enable payment methods;
* Access a merchants' transaction and settlement data, for example for reconciliation or bookkeeping purposes;
* Show the next settlement and balance at Mollie in your app;
* Integrate merchants' invoices from Mollie in your app;
* Charge merchants for Payments, Orders and Subscriptions initiated through your app
  (:doc:`application fees </oauth/application-fees>`)

What does the Mollie OAuth flow look like?
------------------------------------------
After you've :doc:`registered your OAuth app with Mollie </oauth/getting-started>`, Mollie merchants will be able to
install your app on their Mollie organization using the *Connect with Mollie* button.

When the button is clicked, you have to follow the well known OAuth *authorization flow* as visualized below:

.. image:: images/oauth-overview-flow@2x.png

The authorization flow is explained in further detail in :doc:`OAuth: Getting started </oauth/getting-started>`.

What merchant data can I access?
--------------------------------
As with all OAuth platforms, you tell Mollie what data you need when requesting an authorization by listing the
permissions your app requires. The merchant will explicitly have to agree with any permissions you request, so be sure
to only request necessary permissions.

Please refer to :doc:`OAuth: Permissions </oauth/permissions>` for a full list of available permissions.

How do merchants install my app?
--------------------------------
By implementing the authorization flow, Mollie merchants are able to install your app on their Mollie organization.
:doc:`OAuth: Getting started </oauth/getting-started>` discusses authorizations in further detail.

Can I get referral commission via OAuth as a partner of Mollie?
---------------------------------------------------------------
Yes, you can! When you're a Mollie Partner, all merchants that will create an organization in the OAuth-flow of your app
will be linked to your partner-account what makes it possible to receive referral commission. You don't have to do
anything else than just integrate OAuth. For more information about the Mollie Partnership or to enable commission,
please see our `Partner page <https://www.mollie.com/en/partners/>`_.

.. _connect-button:

The Connect with Mollie button
------------------------------
To keep the user experience consistent, we recommend using one of the buttons below in your authorization flow.

.. image:: images/button-small@2x.png

`Download files <https://www.mollie.com/assets/images/branding/connect-button/connect-with-mollie.zip>`_

The download includes a Sketch file and retina PNGs.

What are the lifetimes of the OAuth tokens?
-------------------------------------------
Some tokens will expire after a certain time. You should ask for a new :doc:`authorization </reference/oauth2/authorize>`
or :doc:`access token </reference/oauth2/tokens>` if needed.

+-------------------------------+-----------------------------------+
| **Auth code**                 | 30 seconds                        |
+-------------------------------+-----------------------------------+
| **Access token**              | 1 hour                            |
+-------------------------------+-----------------------------------+
| **Refresh token**             | Does not expire automatically     |
+-------------------------------+-----------------------------------+