Mollie object
=============
.. api-name:: Mollie.js

.. endpoint::
   :url: https://js.mollie.com/v1/mollie.js

The ``Mollie`` object in the Mollie JavaScript SDK is used to initialize the Mollie integration.

For a step-by-step tutorial on integrating Mollie Components, please refer to the
:doc:`Mollie Components guide </components/overview>`.

.. _components-mollie-constructor:

Mollie(profileId[, options])
----------------------------
.. parameter:: profileId
   :type: string
   :condition: required

   Your profile ID, for example ``pfl_3RkSN1zuPE``.

.. parameter:: options
   :type: options object
   :condition: optional

   Any options you want to set. E.g. ``{ locale: "nl_NL"}``

   .. parameter:: locale
      :type: string
      :condition: optional

      Allows you to preset the language to be used. When this parameter is not provided, the browser language will be
      used instead. If we also not support the browser language then it will be shown in English. We recommend you
      provide the language tag, since this is usually more accurate.

      Possible values: ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
      ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV``
      ``lt_LT``

   .. parameter:: testmode
      :type: boolean
      :condition: optional

      Set to ``true`` to enable test mode. Test tokens will be recognizable by the ``test`` suffix, e.g.
      `tkn_123abctest`.

.. _components-mollie-create-token:

mollie.createToken()
--------------------
Calling the ``createToken`` method will receive a token if successful. This token must then be sent to your back end
where it can be passed as the ``cardToken`` parameter to the
:doc:`Create payment endpoint </reference/v2/payments-api/create-payment>`.

This method has to be invoked from the ``submit`` event of your checkout form:

Javascript
^^^^^^^^^^
.. code-block:: js
   :linenos:

    form.addEventListener('submit', e => {
      e.preventDefault();

      mollie.createToken().then(function(result) {
        // Handle the result this can be either result.token or result.error.
      });
    });

ES6
^^^
.. code-block:: js
   :linenos:

   form.addEventListener('submit', async e => {
     e.preventDefault();

     const { token, error } = await mollie.createToken();
   });

.. _components-mollie-create-component:

mollie.createComponent(type[, options])
---------------------------------------
This will create a *Component* which the shopper uses to enter the card holder data. After creating, the components
should be mounted in your checkout.

Please refer to :doc:`Component object </reference/mollie-js/component-object>` to see which methods are available on
the object.

For a credit card integration you need to create four components — one for each card holder data field.

.. parameter:: type
   :type: string
   :condition: required

   The ``createComponent`` method will create an component ready to be mounted.

   Possible values: ``"cardHolder"`` ``"cardNumber"`` ``"verificationCode"`` ``"expiryDate"`` |  ``"card"``

   .. note:: Value ``"card"`` can not be used together with other ones (because it already contain all of the others).
     For more info please read :doc:`Mollie Components </components/overview>`.

.. parameter:: options
   :type: options object
   :condition: optional

   The options you want to give to Mollie Components.

   .. parameter:: styles
      :type: styles object
      :condition: optional

      See :doc:`Styling Mollie Components </components/styling>`.

   .. parameter:: components
      :type: components object
      :condition: optional

      Only available for ``"card"`` type. Allows you to customize individual
      Components inside the Mollie Card Component.

      .. parameter:: cardHolder
         :type: individualComponent object
         :condition: optional

         Allows you to customize card holder component inside the Mollie Card Component.

         .. parameter:: label
            :type: string
            :condition: optional

            Customize label for this component

      .. parameter:: cardNumber
         :type: individualComponent object
         :condition: optional

         Allows you to customize card number component inside the Mollie Card Component.

         .. parameter:: label
            :type: string
            :condition: optional

            Customize label for this component

      .. parameter:: verificationCode
         :type: individualComponent object
         :condition: optional

         Allows you to customize verification code component inside the Mollie Card Component.

         .. parameter:: label
            :type: string
            :condition: optional

            Customize label for this component

      .. parameter:: expiryDate
         :type: individualComponent object
         :condition: optional

         Allows you to customize expiration date component inside the Mollie Card Component.

         .. parameter:: label
            :type: string
            :condition: optional

            Customize label for this component


Example for ``cardHolder`` component
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code-block:: js
   :linenos:

    var options = {
      styles: {
        base: {
          color: '#eee',
          fontSize: '10px',
          '::placeholder': {
            color: 'rgba(68, 68, 68, 0.2)',
          }
        }
      }
    }

    var cardNumberEl = mollie.createComponent('cardNumber', options)

Example for ``card`` component
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code-block:: js
   :linenos:

    var options = {
      styles: {
        base: {
          color: '#eee',
          fontSize: '10px',
          '::placeholder': {
            color: 'rgba(68, 68, 68, 0.2)',
          }
        }
      },
      components: {
        cardHolder: {
          label: 'Custom card holder label'
        },
        verificationCode: {
          label: 'Custom verification code label'
        }
      }
    }

    var cardNumberEl = mollie.createComponent('cardNumber', options)
