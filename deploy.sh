#!/bin/bash

# The Cache-Control property sets the length of time that files should be cached in the Cloudfront Edge location _and_
# the user browser.
AWS_OPTIONS="--region ${AWS_REGION} --cache-control max-age=3600"

pip install awscli

# Set the credentials for the upload user
AWS_SECRET_ACCESS_KEY=${UPLOAD_AWS_SECRET_ACCESS_KEY}
AWS_ACCESS_KEY_ID=${UPLOAD_AWS_ACCESS_KEY_ID}

# Upload HTML files
aws s3 cp build/html s3://${AWS_BUCKET}/ --recursive ${AWS_OPTIONS} \
    --exclude ".buildinfo" \
    --exclude "contents" \
    --exclude "genindex" \
    --exclude "objects.inv" \
    --exclude "_sources/*" \
    --exclude "_images/*" \
    --exclude "_static/*" \
    --content-type "text/html"

# Upload static assets
aws s3 cp build/html/_images s3://${AWS_BUCKET}/_images/ --recursive ${AWS_OPTIONS}
aws s3 cp build/html/_static s3://${AWS_BUCKET}/_static/ --recursive ${AWS_OPTIONS}

# Upload static content to assets directory
aws s3 cp build/html/_images s3://${AWS_BUCKET}/assets/_images/ --recursive ${AWS_OPTIONS}
aws s3 cp build/html/_static s3://${AWS_BUCKET}/assets/_static/ --recursive ${AWS_OPTIONS}
