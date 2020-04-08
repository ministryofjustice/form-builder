# 6 Reduce the number of emails per submission

Date: 2020-04-08

## Status

✅ Accepted

## Context

Form Builder sends one email per file uploaded for each application. For those forms that allow multiple files to be uploaded this generates a lot of email noise for both form owners and the applicants. This can result in additional work to sift these emails or even create unforced errors in workflows that are manual in nature.

The use of AWS SES as the email service means that there is a 10MB upper limit on the size of each email that is sent.

Options discussed:

1. Attach as many files as possible to a single email up to the 10MB limit.

2. Hard cap limit on 10MB in total accross _all_ the files uploaded per form.

3. Admin interface for form owners to log in and retrieve file uploads per submission.

4. Email a link to the form owner allowing the ability to download all attachments in one go.

## Decision

We feel that it is reasonable to reduce the number of emails that recipients of each submission get to the absolute minimum.

Option 1 is the one which is the most reasonable solution at this time. It requires the least amount of code change and does not change the architecture or increase the threat surface of Form Builder.

## Consequences

Recipients will receive less emails for each Form Builder submission. For the vast majority of forms this will only be a single email with multiple attachments, however the ability to send more than one remains.

This change will be reflected across all forms that use Form Builder.
