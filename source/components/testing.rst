Testing Mollie Components
=========================
**Mollie Components** can be tested during implementation with the regular :doc:`test mode </overview/testing>`.

First, you will have to initialize the :ref:`components-mollie-constructor` constructor with your profile ID and
the ``testmode`` option:

.. code-block:: js
   :linenos:

   var mollie = Mollie('pfl_3RkSN1zuPE', { locale: 'nl_NL', testmode: true });

Then, you can implement the remainder of Mollie Components as specified in :doc:`our guide </components/overview>`. When
test mode is enabled for Mollie Components, the card tokens you receive should be used in combination with your
**Test API key** instead of your Live API key. Therefore, make sure you use the correct API key when
:doc:`creating the payment </reference/v2/payments-api/create-payment>`.

Test card numbers
-----------------
You can use test card numbers provided by the different card issuers to test different types of cards. Please refer to
our :doc:`testing guide </overview/testing>` for a list of test card numbers.

Testing failure scenarios
-------------------------
Credit card payments can fail for various reasons ranging from having provided an invalid card number to having the card
issuer reject the payment due to insufficient funds. In the case of a failed credit card payment, the API therefore
includes a ``failureReason`` in the :doc:`payment response </reference/v2/payments-api/get-payment>` to provide more
context.

To test the various card payment failure reasons the Mollie API can return, please refer to our
:doc:`testing guide </overview/testing>`.
