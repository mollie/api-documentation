Component object
================
.. api-name:: Mollie.js

.. endpoint::
   :url: https://js.mollie.com/v1/mollie.js

A ``Component`` object in the Mollie JavaScript SDK references an embeddable checkout component, such as a credit card
number field or a credit card expiry date field.

For a step-by-step tutorial on integrating Mollie Components, refer to the
:doc:`Mollie Components guide </components/overview>`.

.. _components-mollie-component-mount:

component.mount(targetElement)
------------------------------
Adds the component to the DOM, meaning it will become visible for the user from this point onwards.

.. code-block:: HTML
   :linenos:

    <label for="cardNumber">Card number</label>
    <div id="cardNumber"></div>

.. parameter:: targetElement
   :type: HTMLElement|string
   :condition: required

   An `HTMLElement <https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement>`_ or a valid CSS Selector such as
   ``#id`` and ``.class``.

Javascript
^^^^^^^^^^
.. code-block:: js
   :linenos:

    cardNumberEl.mount('#cardNumber');

ES6
^^^
.. code-block:: js
   :linenos:

    cardNumberEl.mount('#cardNumber');

component.addEventListener(event, callback)
-------------------------------------------
Components can listen to several ``events``. The callback receives an object with all the related information.

.. parameter:: event
   :type: string
   :condition: required

   Subscribe to the event that are emitted by Mollie js.

   Possible values: ``"blur"`` ``"focus"`` ``"change"``

.. parameter:: callback
   :type: function
   :condition: required

   A function that will be called whenever the event is been emitted.

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
