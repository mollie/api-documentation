'use strict';

exports.handler = (event, context, callback) => {
  const response = event.Records[0].cf.response;
  const request = event.Records[0].cf.request;
  const baseURI = 'https://docs.mollie.com';

  function redirectTo(path) {
    response.status = 302;
    response.statusDescription = 'Found';
    /* Drop the body, as it is not required for redirects */
    response.body = '';
    response.headers['location'] = [{ key: 'Location', value: baseURI + path }];
  }

  // Set new headers
  response.headers['strict-transport-security'] = [
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubdomains; preload' },
  ];
  response.headers['content-security-policy'] = [
    {
      key: 'Content-Security-Policy',
      value:
        "default-src 'self' assets.docs.mollie.com; img-src 'self' data: assets.docs.mollie.com https://images.ctfassets.net www.google-analytics.com https://www.gstatic.com https://www.googletagmanager.com; font-src cdn.mollie.com https://fonts.gstatic.com; script-src assets.docs.mollie.com https://www.googletagmanager.com www.google-analytics.com https://cdn.mxpnl.com 'sha256-FPgvfx+DeiJzmOHcDk2Iig1vKX6j8I0pKqPA7y33Xbc=' 'sha256-dSca7Fq9h/m8NPfsEIGN6QsOnwspkqCSOGFBGND+lps=' 'sha256-0M7Y8vfoB3jQRWrbd9UeLZorU2w32qynoWspDQn7U0g=' 'sha256-akWsBON1KU9NUSFengZbPuVOt+8KK3uSXcBP5Hc0sqQ=' 'sha256-nST9yaMPaU/xAS62+YWnvg5TxAXYYQm1Fn5Ybpu0AXM=' 'sha256-q/CGewBJOc0HL8ZusH9Fqnh2aZgLOH7lBvepoEVOrVw='; style-src assets.docs.mollie.com 'sha256-biLFinpqYMtWHmXfkA1BPeCY0/fNt46SAZ+BBk5YUog='; object-src 'none'; media-src 'none'; form-action 'none'; connect-src www.google-analytics.com https://api.mixpanel.com stats.g.doubleclick.net; report-uri https://mollie.report-uri.com/r/d/csp/enforce",
    },
  ];
  response.headers['x-content-type-options'] = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
  ];
  response.headers['x-frame-options'] = [{ key: 'X-Frame-Options', value: 'DENY' }];
  response.headers['x-xss-protection'] = [{ key: 'X-XSS-Protection', value: '1; mode=block' }];
  response.headers['referrer-policy'] = [{ key: 'Referrer-Policy', value: 'same-origin' }];
  response.headers['expect-ct'] = [
    {
      key: 'Expect-CT',
      value: 'max-age=0, report-uri="https://mollie.report-uri.com/r/d/ct/reportOnly"',
    },
  ];

  delete response.headers['server'];

  // Configure the URL redirects
  switch (request.uri.replace(/\/$/, '')) {
    case '/migrating-v1-to-v2':
      redirectTo('/payments/migrating-v1-to-v2');
      break;
    case '/guides/multicurrency':
      redirectTo('/payments/multicurrency');
      break;
    case '/guides/recurring':
      redirectTo('/payments/recurring');
      break;
    case '/guides/payment-status-changes':
      redirectTo('/payments/status-changes');
      break;
    case '/payments/webhooks':
      redirectTo('/guides/webhooks');
      break;
    case '/security':
      redirectTo('/guides/security');
      break;
    case '/reference/v2':
      redirectTo('/reference/v2/payments-api/create-payment');
      break;
    case '/reference/v1':
      redirectTo('/reference/v1/payments-api/create-payment');
      break;
    case '/reference/reseller-api/account-create':
      redirectTo('/reference/reseller-api/endpoints/account-create');
      break;
    case '/reference/reseller-api/account-claim':
      redirectTo('/reference/reseller-api/endpoints/account-claim');
      break;
    case '/reference/reseller-api/account-edit':
      redirectTo('/reference/reseller-api/endpoints/account-edit');
      break;
    case '/reference/reseller-api/account-valid':
      redirectTo('/reference/reseller-api/endpoints/account-valid');
      break;
    case '/reference/reseller-api/get-login-link':
      redirectTo('/reference/reseller-api/endpoints/get-login-link');
      break;
    case '/reference/reseller-api/disconnect-account':
      redirectTo('/reference/reseller-api/endpoints/disconnect-account');
      break;
    case '/reference/reseller-api/available-payment-methods':
      redirectTo('/reference/reseller-api/endpoints/available-payment-methods');
      break;
    case '/reference/reseller-api/bankaccounts':
      redirectTo('/reference/reseller-api/endpoints/bankaccounts');
      break;
    case '/reference/reseller-api/bankaccount-edit':
      redirectTo('/reference/reseller-api/endpoints/bankaccount-edit');
      break;
    case '/reference/reseller-api/profile-create':
      redirectTo('/reference/reseller-api/endpoints/profile-create');
      break;
    case '/reference/reseller-api/profiles':
      redirectTo('/reference/reseller-api/endpoints/profiles');
      break;
    case '/reference/reseller-api/set-fees':
      redirectTo('/reference/reseller-api/endpoints/set-fees');
      break;
  }

  // Return modified response
  callback(null, response);
};
