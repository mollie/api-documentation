Styling Mollie Components
=========================

:doc:`Mollie Components <overview>` can be fully styled to ensure a smooth blend-in with your checkout.

Most of the styling should be applied to the ``.mollie-component`` container instead of passing styling to the
actual Component. The ``<div class="mollie-component" />`` container lives completely in your own environment and thus 
will give the most flexible way of styling. See the `Components Examples repository <https://github.com/mollie/components-examples>`_ for more info.

However there is some styling that will not be inherrit such as typography related properties. These properties can 
be applied when the creating components. You can apply these styles to three states ``base``, ``valid`` and ``invalid``:

``base``
  The state of the Component when your customer has not entered any data yet or is entering data. These styles will also become the default styles for the ``valid`` and ``invalid`` states.

``valid``
  The state of the Component when your customer has entered valid data, such as a valid credit card number. 

``invalid``
  The state of the Component when your customer entered invalid data, such as an expiry date in the past.

For each of these there is an set of properties you can use:

* ``backgroundColor`` of type ``color``
* ``color`` of type ``color``
* ``fontSize`` of type ``number``
* ``fontWeight`` of type ``string|number``
* ``letterSpacing`` of type ``number``
* ``lineHeight`` of type ``number``
* ``textAlign`` of type ``string``
* ``textDecoration`` of type ``string``
* ``textTransform`` of type ``string``

Every property has one or more types. Multiple types are indicated by a ``|`` character. We don’t allow ``URL`` , ``http``, ``https`` and ``www``.

* ``string`` A valid string, spaces aren't allowed,
* ``number`` A valid CSS number with an optional unit ``px``, ``em`` or ``rem``.
* ``color`` We accept colors as ``#f00``, ``#ff0000``, ``rgb(a)``, ``hsl(a)`` and ``transparent``,

We allow the following pseudo-classes. These will be autoprefixed and can be nested with the above listed properties.

* ``::placeholder``

Example
-------

Using styles with :ref:`components-mollie-create-component`:

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
        },
        valid: {
          color: '#090',
        }
      }
    };

    var cardNumberEl = mollie.createComponent('cardNumber', options)
