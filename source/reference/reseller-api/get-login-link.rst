Get login link
==============

.. api-name:: Reseller API
   :version: 1

.. endpoint::
   :method: GET
   :url: https://www.mollie.com/api/reseller/v1/get-login-link

.. note:: This API is only for `partners <https://www.mollie.com/partners>`_.

This method allows you to obtain a special link, with which a merchant can be directly logged in.

You are to redirect the merchant to the log-in link. It will log the merchant in, if he wasn't already. In all other
cases, the merchant who was already logged in will remain logged in.

When the customer has not yet accepted Mollie's conditions they must first do so before being redirected.

Parameters
----------
Make sure to add the :ref:`obligatory parameters <secret-keys>` always. Besides that, add the following
parameters:

.. list-table::
   :widths: auto

   * - ``username``

       .. type:: string
          :required: true

     - The username of the account you would like to disconnect.

   * - ``password``

       .. type:: string
          :required: true

     - The password of the account you would like to disconnect.

   * - ``partner_id_customer``

       .. type:: string
          :required: false

     - 	The partner ID of the account you would like to disconnect. It can be used instead of the parameters username
        and password.

   * - ``redirect_URL``

       .. type:: URL
          :required: false

     - 	The URL a merchant must be redirected to after logging in. This must be a URL in the www.mollie.com domain.

Response
--------
.. code-block:: http
   :linenos:

   HTTP/1.1 200 OK
   Content-Type: application/xml; charset=utf-8

   <?xml version="1.0" encoding="UTF-8"?>
    <response>
        <success>true</success>
        <resultcode>10</resultcode>
        <resultmessage>Redirect the customer to the following url.</resultmessage>
        <redirect_url>https://www.mollie.com/login/oneTimeLogin/4299193/008788d1a618c3aff51acd57ca82661c?redirect_url=%2Fbeheer%2Fbetaalmethodes%2F</redirect_url>
    </response>
