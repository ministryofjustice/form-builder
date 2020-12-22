# HMCTS Complaints Adapter

[HMCTS Complaints Adapter Repo](https://github.com/ministryofjustice/hmcts-complaints-formbuilder-adapter)

## API Endpoint and the Adapter

The HMCTS Complaints Adapter talks to a CMS called Optics. The Form Builder team helped HMCTS build and publish a form to complain about a court, this replaced a 3rd part. The platform only had emailing a PDF at the time so the new features were added.

### How it works

As the CMS the HMCTS team doesn't accept encrypted data via an API, or had a development team to help them, the Form Builder team constructed an adapter. It integrates in the following manner:

1. The Submitter encrypts the payload and sends it to the `SERVICE_OUTPUT_JSON_ENDPOINT`.

2. The Adapter decrypts the payload sends it onto Optics via a DelayedJob queue.

3. Once Optics receives the payload it creates a new case based on the submission details.

4. If Optics detects any download URLs in the payload it will make a request back to the Adapter to retreive the file.

5. Optics sends an email to the complainent with the case reference number.

6. The Adapter bypasses the User Filestore and retrieves any files directly from the S3 bucket via link which contains the required keys to decrypt the file before passing it back to Optics. The link to the file expires after 15 minutes, after which time it is no longer usable.

The Adapter sits outside of the Form Builder platform boundary as it was not originally part of the architectural design. This is why the Adapter has to first decrypt the payload.

Configuration secrets for the Optics endpoint etc can be found in the [deploy repo](https://github.com/ministryofjustice/hmcts-complaints-formbuilder-adapter-deploy) for the adapter.

### How to set up in the Publisher

In the configuration add the following items:

- SERVICE_OUTPUT_JSON_ENDPOINT
- SERVICE_OUTPUT_JSON_KEY

### Testing the end point

Add the SERVICE_OUTPUT_JSON_ENDPOINT to the configuration for the form. The endpoint is the fully qualified API endpoint for each environment. They can be found in the [deployment configuration](https://github.com/ministryofjustice/hmcts-complaints-formbuilder-adapter/blob/master/deploy/hmcts-complaints-formbuilder-adapter-chart/templates/deployment.yaml#L31) for the Adapter.

Add the SERVICE_OUTPUT_JSON_KEY which is used for encryption.

Go to https://formbuilder-base-adapter-test.apps.live-1.cloud-platform.service.justice.gov.uk/submission. The output will be displayed.

The adapter is live on the internet, do not add/use for real data. Do not use the same key in production or for testing other endpoints.

To check an actual submission it is best to contact the service owner for the complaints form and ask them to check in the Staging environment. Access to Optic is limited because of user licences.
