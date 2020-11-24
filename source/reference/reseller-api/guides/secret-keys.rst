Secret keys and authentication
==============================

.. warning:: The Reseller API has been deprecated. Only selected partners still have access to this legacy functionality.
             As an alternative, we recommend using :doc:`Mollie Connect </oauth/overview>` and the :doc:`Mollie v2 API
             </reference/v2/payments-api/create-payment>`.

**Secret keys** facilitate encrypted communication with Mollie's Reseller APIs. These APIs provide even better security
than the previous ones because:

**Authentication is performed by means of a** ``profile_key`` **:**
  This means you don't have to include a username or password. You can retrieve your profile key from the Reseller
  portal in the Mollie Dashboard.
**Each API request contains a timestamp:**
  This means that the request cannot be resubmitted later.
**All API requests are signed with a secret key:**
  This is how our platform knows that the request was made by your website and is authentic, and that the parameters
  were not changed en route.

.. _secret-keys:

Obligatory parameters
----------------------
You need to send these obligatory parameters along either via ``POST`` or in the query string via ``GET``. These
parameters are used to authenticate the API request. Please take note that you must URL-encode the values for the
parameters: ``my value`` becomes ``my%20value``.

.. list-table::
   :widths: auto

   * - ``partner_id``

       .. type:: string
          :required: true

     - Your Partner ID.

   * - ``profile_key``

       .. type:: string
          :required: true

     - Your profile key, you can retrieve it via the Reseller portal in the Mollie Dashboard.

   * - ``timestamp``

       .. type:: timestamp
          :required: true

     - The current time in `Unix time <https://en.wikipedia.org/wiki/Unix_time>`_.

   * - ``signature``

       .. type:: string
          :required: true

     - The signature of the request, see **Creating the Signature** below.

Creating the signature
----------------------
You must sign every API-request with the **secret key** that belongs to your profile key. For this purpose, we use a
SHA1-HMAC, or Hash-based Message Authentication Code with SHA1 as the hashing algorithm.

For a key, you use the secret key from the Reseller Portal. You must chose 'SHA1' as the algorithm.
The signature is therefore always 40 characters long, for instance: ``6a018490f38ddc1571ab4cd9cd41f5e700c09ce2``.

Many programming languages feature a standard implementation of the HMAC algorithm. See for instance ``hash_hmac()`` for
PHP or the ``HMAC.hexdigest()`` method for Python.

Example (PHP)
^^^^^^^^^^^^^
.. code-block:: php
   :linenos:

    <?php
    $path = "https://www.mollie.com/api/reseller/v1/bankaccounts";
    $queryString = http_build_query($params, '', '&');
    $signature = hash_hmac(
        'sha1',
        '/' . trim($path, '/') . '?' . $queryString,
        strtoupper($profile_key)
    );
