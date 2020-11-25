Mollie Components reference
===========================

The ``Mollie`` object is used to initialize :doc:`Mollie Components <overview>`.

.. _components-mollie-constructor:

Mollie(profileId[, options])
----------------------------

.. list-table::
   :widths: auto

   * - ``profileId``

       .. type:: string
          :required: true

     - Your Profile Id, for example ``pfl_3RkSN1zuPE``.

   * - ``options``

       .. type:: options object
          :required: false

     - Any options you want to set. E.g. ``{ locale: "nl_NL"}``

       .. list-table::
          :widths: auto

          * - ``locale``

              .. type:: string
                 :required: false

            - Allows you to preset the language to be used. When this
              parameter is not provided, the browser language will be used instead. If we also not support the browser language then it will be shown in English. We recommend you
              provide the language tag because this is usually more accurate.

              Possible values: ``en_US`` ``nl_NL`` ``nl_BE`` ``fr_FR`` ``fr_BE`` ``de_DE`` ``de_AT`` ``de_CH`` ``es_ES``
              ``ca_ES`` ``pt_PT`` ``it_IT`` ``nb_NO`` ``sv_SE`` ``fi_FI`` ``da_DK`` ``is_IS`` ``hu_HU`` ``pl_PL`` ``lv_LV``
              ``lt_LT``

          * - ``testmode``

              .. type:: boolean
                 :required: false

            - Set to ``true`` to enable test mode. Test tokens will be recognizable by the ``test`` suffix e.g. `tkn_123abctest`.


.. _components-mollie-create-token:

mollie.createToken()
--------------------
Calling the ``createToken`` method will receive a token if successful. This token must then be sent to your back end
where it can be passed as the ``cardToken`` parameter to the
:doc:`Create Payment API </reference/v2/payments-api/create-payment>`.

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

This will create the Components which the shopper uses to enter the card holder data. After creating, the components should
be mounted in your checkout.

You need to create four components, one for each card holder data field.

.. list-table::
   :widths: auto

   * - ``type``

       .. type:: string
          :required: true

     - The ``createComponent`` method will create an component ready to be mounted.

       Possible values: ``"cardHolder"`` ``"cardNumber"`` ``"verificationCode"`` ``"expiryDate"``

   * - ``options``

       .. type:: options object
          :required: false

     - The options you want to give to Mollie Components. E.g. ``{ styles: fontSize: "10px"}``

       .. list-table::
          :widths: auto

          * - ``styles``

              .. type:: styles object
                  :required: false

            - See :doc:`styling`.

Javascript
^^^^^^^^^^
.. code-block:: js
   :linenos:

    var options = {
                    styles : {
                      base: {
                        color: '#eee',
                        fontSize: '10px',
                        '::placeholder' : {
                          color: 'rgba(68, 68, 68, 0.2)',
                        }
                      }
                    }
                  }

    var cardNumberEl = mollie.createComponent('cardNumber', options)

ES6
^^^
.. code-block:: js
   :linenos:

    const options = {
                      styles : {
                        base: {
                          color: '#eee',
                          fontSize: '10px',
                          '::placeholder' : {
                            color: 'rgba(68, 68, 68, 0.2)',
                          }
                        }
                      }
                    }

    const cardNumberEl = mollie.createComponent('cardNumber', options)

Component methods
=================

.. _components-mollie-component-mount:

component.mount(targetElement)
------------------------------

Adds the component to the DOM, meaning it will become visible for the user from this point onwards.

.. code-block:: HTML
   :linenos:

    <label for="card" >Card label</label>
    <div id="card"></div>

.. list-table::
   :widths: auto

   * - ``targetElement``

       .. type:: HTMLelement|string
          :required: true

     - An `HTMLElement <https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement>`_ or a valid CSS Selector such as ``#id`` and ``.class``.

Javascript
^^^^^^^^^^
.. code-block:: js
   :linenos:

    cardNumberEl.mount('#card');

ES6
^^^
.. code-block:: js
   :linenos:

    cardNumberEl.mount('#card');

component.addEventListener(event, callback)
-------------------------------------------

Components can listen to several ``events``. The callback receives an object with all the related information.

.. list-table::
   :widths: auto

   * - ``event``

       .. type:: string
          :required: true

     - Subscribe to the event that are emitted by Mollie js.

       Possible values: ``"blur"`` ``"focus"`` ``"change"``

   * - ``callback``

       .. type:: function
          :required: true

     - A function that will be called whenever the event is been emitted.


Javascript
^^^^^^^^^^
.. code-block:: js
   :linenos:

    var callback = function(event) { console.log('We need a real world example here', event.type) }
    cardNumberEl.addEventListener('change', callback);

ES6
^^^
.. code-block:: js
   :linenos:

    const callback = (event)=> { console.log('We need a real world example here', event.type) }
    cardNumberEl.addEventListener('change', callback);

component.unmount()
-------------------
Removes the component from the DOM. Note that state — such as input values — is not preserved when re-mounting.

Javascript
^^^^^^^^^^
.. code-block:: js
   :linenos:

    cardNumberEl.unmount();

ES6
^^^
.. code-block:: js
   :linenos:

    cardNumberEl.unmount();
