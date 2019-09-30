# Integrating Form Builder with 3rd Party Applications

Any form hosted with the Form Builder can integrate easily with 3rd party applications
by taking advantage of the [JSON output](../submitting/submitting.md) option.

See the [HMCTS Complaints Adapter](https://github.com/ministryofjustice/hmcts-complaints-formbuilder-adapter)
for an example of an application that consumes this JSON output and generates cases
in a 3rd Party CMS system.

## Requirements

There are a few requirements for setting up and then using the JSON output:

### 1. Config vars

Your form needs to be configured in Publisher to enable the JSON output feature. You must set both:

a. `SERVICE_OUTPUT_JSON_ENDPOINT` which is the external endpoint you want JSON sent to.

b. `SERVICE_OUTPUT_JSON_KEY` which is the 16 byte shared secret used for encryption.

### 2. Encryption & Decryption

The JSON output is sent as an encrypted payload, you will need to decrypt it to use it.
Images are also attached as URLs and stored encryted.

## JSON Payload

The JSON payload is of the shape:

```
  {
    'serviceSlug': 'my-form',
    'submissionId': '1e937616-dd0b-4bc3-8c67-40e4ffd54f78',
    'submissionAnswers': {
      'first_name': 'Jim',
      'last_name': 'Morrison',
      'email_address': 'test@test.com',
      'other_input_name': 'answer'
    }
  }
```

The key in the `submissionAnswers` hash is the `Input_name` that is set on your form
field either in the editor or in the JSON.

## Encrypted Body

The JSON payload is encrypted with [JSON Web Encryption](https://openid.net/specs/draft-jones-json-web-encryption-02.html).
You can decrypt the payload using the shared secret key that you set as the
`SERVICE_OUTPUT_JSON_KEY`. For an example of this see the
[HMCTS Complaints Adapter](https://github.com/ministryofjustice/hmcts-complaints-formbuilder-adapter)

## Encrypted Files
### Optics

Files sent to 3rd party integrations are encrypted at rest and in transit within the Form Builder infrastructure. Decryption only happens within the [Custom Adapter](https://github.com/ministryofjustice/hmcts-complaints-formbuilder-adapter) which sits outside of the infrastructure that we own.

On submission, the custom adapter will request publicly accessible URLs from the [User Filestore](https://github.com/ministryofjustice/fb-user-filestore) for each file. The User Filestore will fetch the files from S3 (previously uploaded as part of any submission), decrypt them, re-encrypt them with unique randomly generated encryption keys, and upload them to a new bucket.

Once uploaded to the new bucket, the [Presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObject.html) for the files along with the encryption keys will be sent over to the adapter.

The adapter will persist the URL and encryption keys for up to 7 days. The adapter will then expose an endpoint for the 3rd party to retrieve these files.

On requesting this endpoint, the adapter will fetch the file from S3 (using the pre-signed URL), decrypt the file and serve it.

*The S3 presigned URLs have an expiration time 900 seconds (15 minutes).*
