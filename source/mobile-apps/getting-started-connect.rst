Getting started with Mollie Connect in your App
===============================================

*Mollie Connect* makes it possible to login and authorize directly from your app. Make sure to keep the security risks
in mind while integrating Mollie Connect. For iOS example we only show Swift snippets while for Android we show both
Java and Kotlin snippets.

.. note:: The code examples provided here are for illustrative purposes only and Mollie does not yet offer support on them.

Step 1: Create an OAuth App
---------------------------
The first step is to `register your app in your Dashboard <https://www.mollie.com/dashboard/developers/applications>`_.
You will need to provide an App Name, description, and Redirect URL. The Redirect URL can be a custom App Scheme to redirect
back to your App immediately. To make this possible you should specify this in your App's manifest. In the following examples
we want to use ``mollie-app://authorize`` as Redirect URL.

Step 2: Configure your app to accept the Redirect URL
-----------------------------------------------------
Since we specified the custom URL scheme iOS or Android should know that the URL scheme belongs to your App.

See :ref:`apps-configure-redirect-url` on how to configure your app.

Step 3: Create a server-side script for storing OAuth Access tokens
-------------------------------------------------------------------
For security reasons you don't want the Client Secret inside your app. Anyone who retrieves this secret can masquerade
as your app. The same applies to OAuth Access tokens.

Therefor you should create a script on your server where you can send the authentication code (what you get from the
OAuth authorize screen). The script should convert authentication token to an OAuth Access Token and link the token
with the device and user session. Your back end should then perform the API calls to the Mollie API on behalf of the
user of your app.  

Make sure the script cannot be called by anyone else or by untrusted installations of your app.

Step 4: Let your App open the authorization page
------------------------------------------------
Let's assume that you put a login button in your app that needs to open the Mollie OAuth flow. Add the following code to
your button's action.

.. warning:: Generate a random string for the ``state`` parameter. Checking this parameter on return will prevent CSRF
             attacks. Any responese where the ``state`` parameter does not match your initial value should be discarded.

iOS
^^^
.. code-block:: swift
      :linenos:

      @IBAction func loginButtonClicked() {
            let authorizeLink = "https://www.mollie.com/oauth2/authorize?client_id=xxx&state=xxx&scope=payments.read&response_type=code&approval_prompt=auto";
            UIApplication.shared.open(NSURL(string: authorizeLink)! as URL)
      }

Android (Java)
^^^^^^^^^^^^^^
.. code-block:: java
      :linenos:

      private void onClick(View v) {
            String authorizeLink = "https://www.mollie.com/oauth2/authorize?client_id=xxx&state=xxx&scope=payments.read&response_type=code&approval_prompt=auto";
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(authorizeLink));
            startActivity(browserIntent);
      }

Android (Kotlin)
^^^^^^^^^^^^^^^^
.. code-block:: kotlin
      :linenos:

      button.setOnClickListener {
            val browserIntent = Intent(android.content.Intent.ACTION_VIEW)
            String authorizeLink = "https://www.mollie.com/oauth2/authorize?client_id=xxx&state=xxx&scope=payments.read&response_type=code&approval_prompt=auto"
            browserIntent.data = Uri.parse(authorizeLink)
            startActivity(browserIntent)
      }

Step 5: Handle the redirect
---------------------------
Either when the merchant accepts or denies the authorization, we'll return him/her to your app via the Redirect URL. You
should tell the App what to do with the data in the response.

iOS
^^^
Open your ``AppDelegate.swift`` file and add the ``application(_:open:options)`` method. Split out the host into an array
so you can access the data that we return. Your method should return ``true`` to let the device know that you can handle
the request.

.. code-block:: swift
      :linenos:

      func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
        if (url.host! == "authorize") {
            let queryItems = URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems
            let error = queryItems?.filter({$0.name == "error"}).first
            if (error?.value?.isEmpty)! {
                let code = queryItems?.filter({$0.name == "code"}).first
                let authenticationCode = error?.value!

                // Do stuff with the authenticationCode
            } else {
                // Do something with the deny
            }

            return true;
        }

        return false;
      }

Android
^^^^^^^
Open the class that you have specified in your ``AndroidManifest.xml`` as handler for the URL scheme. And should add the
handling code in the ``onCreate`` method.

**Java**

.. code-block:: java
      :linenos:

      public void onCreate(Bundle savedInstanceState)
      {
            super.onCreate(savedInstanceState);

            //...

            Intent intent = getIntent();
            if (Intent.ACTION_VIEW.equals(intent.getAction())) {
                  Uri uri = intent.getData();
                  String error = uri.getQueryParameter("error");

                  if (error !== null) {
                        String authenticationCode = uri.getQueryParameter("code");

                        // Do stuff with the authenticationCode
                  } else {
                        // Do something with deny
                  }
            }
      }

**Kotlin**

.. code-block:: kotlin
      :linenos:

      override fun onCreate(savedInstanceState: Bundle){
            super.onCreate(saveInstanceState)

            // ...

            val action: String? = intent?.action
            if (action === android.content.Intent.ACTION_VIEW) {
                  val data: Uri? = intent?.data
                  val error: String? = data.getQueryParameter("error")

                  if (error !== null) {
                        val authorizationCode = data.getQueryParameter("code")

                        // Do stuff with the authenticationCode
                  } else {
                        // Do something with deny
                  }
            }
      }
