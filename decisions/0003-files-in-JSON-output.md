# 3. Files in JSON Output

Date: 2019-08-27

## Status

🤔 Proposed

## Context

When users submit forms created by Form Builder the data from the user needs to
be handed over to other systems for processing. This is fulfilled by the JSON
output generated. One category of data which can be present is that of files in
the form of documents, images and other files users may upload as part of their
form submission.

In order to hand over these files to other systems they need to be somehow
present in the JSON.

Considerations taken on board were security, ease of implementing and ease of
integration. We need to consider that the data is sent securely and should only
be accessible by the intended recipient. The solution should be cost effective
and therefore cheap to implement and maintain. Integrating systems should able
to receive files with ease therefore able to provide cost effective solutions.

We have discussed the pros and cons of 4 possible options:

1. Include files in JSON document as Base64 encoded strings

Pros:

- Super simple with a single POST of entire payload
- We can delete all data once submission has been handed over

Cons:

- Potentially a large POST body
- Files will be Base64 encoded which will increase size of payload and
processing
- Clients will have to decode file

2. Embed signed many use AWS S3 URL in JSON

This option is not possible as we encrypt files before they reach S3. Therefore
the client downloading the file would have to know the decryption key and
decrypt the file.

Pros:

- Lightweight JSON payload
- S3 deals with files

Cons:

- We must retain files for client to pick up
- Client must pick up file within 1 week (S3 constraint)
- We can only retain files for 28 days
- An Exposed link will lead to unencrypted files being available for download
- If client does not pick up data within 28 days the submission files will be
lost

3. Embed signed Form Builder URL.

This is similar to option 2. However, instead of embedding an S3 URL we can
embed a custom Form Builder generated URL that we have control over. This would
requires Form Builder to have an extra application to deal with this flow.

As the files on S3 are encrypted by form builder. This application will have to
proxy file upload and download, encrypting and decrypting files respectively.

Pros:

- Lightweight JSON payload
- S3 deals with files
- Finer grain control of tokens
- We are able to regenerate new tokens up to the maximum 28 day limit

Cons:

- We must retain files for client to pick up
- We can only retain files for 28 days
- An Exposed link will lead to unencrypted files being available for download
- If client does not pick up data within 28 days the submission files will be
lost
- Requires additional ingress
- Need another Form Builder Application to handle this flow
- Still constrained by S3 28 day limit

4. Multipart POST which includes JSON and files

Pros:

- No need to Base64 encode files
- We can delete all data once submission has been handed over

Cons:

- Potentially large POST request
- Need some sort of convention to tie multipart files to JSON representation

5. Decrypt S3 files after submission and embed signed S3 URL

This is option 2, but since the files in S3 are encrypted we decrypt the file
after submission. We then generate a signed S3 url which can be handed over to
another system.

Pros:

- Lightweight JSON payload
- S3 deals with files

Cons:

- We must retain files for client to pick up
- Client must pick up file within 1 week (S3 constraint)
- We can only retain files for 28 days
- An Exposed link will lead to unencrypted files being available for download
- If client does not pick up data within 28 days the submission files will be
lost
- Work needs to be done so post submission files are decrypted in S3 and
associated back to submission
- We will now be storing some files in S3 which are unencrypted

## Decision

Option 2 has been chosen as the mechanism for sharing files with other systems.

This create a lightweight JSON payload which reduces processing required by both
parties. Infrastructure and most implementation is mostly dealt with by S3 so
there is minimal work required by Form Builder to offer this solution.

The recipient is only required to accept a small JSON payload and can
asynchronously pickup the files at a later point in time. To prevent files
exposed, signed URLs should be short lived so if they were leaked the
information should no longer be accessible.

As a possible addition later, the client could sent back a different response
which would confirm receipt of the files allowing Form Builder to delete the
files shortly after.

If Form Builder needs fine grain access control option 3 could be an option in
the future to cater for this.

## Consequences

- Other systems can now easily integrate with form builder to further process
user submissions including files uploaded
- As signed S3 URLs are being generated if this information were to be leaked,
they would be able to access user files and lead back to form builder
