// Renders the Google Tag Manager script tag in all HTML files during the deploy step
const replace = require("replace-in-file");

async function run() {
  const changedFiles = await replace({
    files: "build/**/*[!.]",
    from: "<!-- GOOGLE_TAG_MANAGER -->",
    to: '<script type="text/javascript" src="/_static/gtm.js" async></script>'
  });

  if (!changedFiles.length) {
    throw new Error(
      "Google Tag Manager was not inserted in any file. Was `<!-- GOOGLE_TAG_MANAGER -->` removed from the main layout file?"
    );
  }

  return changedFiles.length;
}

run()
  .then(affectedFiles => console.log(`Wrote Google Tag Manger to ${affectedFiles} files.`))
  .catch(error => {
    console.error(error.message);
    return 1;
  });
