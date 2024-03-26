File uploads
============

Occasionally you may need to upload a file as part of an API call. This guide will help you understand how to do file
uploads with Mollie APIs.

Overview
--------

File uploads are handled the same way as browsers handle uploading files through forms, for example when using the
``<input type="file" />`` form element. The request body should be encoded using the ``multipart/form-data`` form
encoding method. This allows both files and regular data to be sent in fields in a single request.

Each value is sent as a block of data ("body part"), with a user agent-defined delimiter ("boundary") separating each
part. The field names are given in the ``Content-Disposition`` header of each part. The file will be one of the
blocks of data. Additionally, the other fields you want to send will make up the other blocks of data.

The API documentation will specify in which field the file has to go.

Example multipart HTTP request
------------------------------

This example shows what the HTTP request looks like when uploading a file in the ``file`` field to the Organization
documents endpoint:

.. code-block:: none
   :linenos:

   POST /v2/organizations/me/documents HTTP/1.1
   Host: api.mollie.com
   Authorization: Bearer access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM
   Content-Type: multipart/form-data;boundary="boundary"

   --boundary
   Content-Disposition: form-data; name="documentType"

   proof-of-ownership
   --boundary
   Content-Disposition: form-data; name="file"; filename="organization-chart.pdf"

   %PDF...
   --boundary--


Note that the file contents do not have to be encoded.

Example
-------
.. code-block-selector::
   .. code-block:: bash
      :linenos:

      curl https://api.mollie.com/v2/organizations/me/documents \
         -H "Authorization: Bearer access_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
         -F "documentType=proof-of-ownership" \
         -F "file=@organization-chart.pdf"
