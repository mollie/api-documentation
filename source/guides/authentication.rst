Authentication
==============

What data do I need?
--------------------
The first thing you need is a `website profile <https://www.mollie.com/dashboard/settings/profiles>`_. Each website
profile has a *Live API key* and a *Test API key*. Use these keys to:

* Show the Mollie API it is really you.
* Select the website profile the intended communication with the Mollie API relates to.
* Specify whether you're testing or working with real payments.

The API key must be sent along with each API request, by providing it in the HTTP call's ``Authorization`` header. The
API key is preceded by ``Bearer``. For example: a valid ``Authorization`` header is
``Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM``. If one of our default API clients is used, the client will offer a 
``setApiKey`` method that will allow you to easily configure the required header.

While building and testing your integration you should use the *Test API key*. This will cause your code to
(automatically) only create test payments. Test payments come with a hosted payment page that allows you to select
whether your test payments are successful or not without spending actual money. This way you can easily test and
rehearse different scenarios that will occur later on when you switch to real payments. After your testing is done you
go live by using the Live API key instead of the Test API key. Going live (or going back to testing) is as easy as
changing keys. Nothing else needs to change.

Of course it's very important to keep any API-keys :doc:`secure </guides/security>`. Do not ever share them. However, if a key
leaks you can always `regenerate <https://www.mollie.com/dashboard/developers/api-keys>`_ it. Don't forget to apply new
keys to your code. Until you do your integration will not work.

Apart from the hosted payment pages and the fact that test payments are created instead of real ones, the Mollie API behaves
the same way regardless of whether the Test API key or the Live API key is used. Because of this, there won't be any
technical surprises upon going live. Make a note: don't forget to start using the *Live API key* when your site goes
public or your customers could be getting a free ride.

Example
-------
Any API action you want to execute requires a valid *Test API key* or *Live API key*. In order to show you how
authentication works we use the ``GET`` method on the ``payments``
:doc:`resource </reference/v2/payments-api/get-payment>`. This method fetches a payment, but that's not really important
here. Focus on how the API key is involved.

In the example below we're using the *Test API Key* ``test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM``. The response shows a result
for a retrieved payment with fictional ``id`` ``tr_WDqYK6vllg``.

.. code-block:: bash
   :linenos:

   curl -X GET https://api.mollie.com/v2/payments/tr_WDqYK6vllg \
       -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"

Response
--------
The response will be JSON.

.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/hal+json; charset=utf-8

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
