// create dataLayer
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

// set „denied" as default for both ad and analytics storage,
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 2000, // milliseconds to wait for update
});

// Enable ads data redaction by default [optional]
gtag('set', 'ads_data_redaction', true);
