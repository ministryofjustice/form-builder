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
      'other_input_name': 'answer'
      'attachments': [
        {
          url: 'example.com/1',
          encryption_key: 'bar1',
          encryption_iv: 'baz1',
          mimetype: 'application/pdf',
          filename: 'form1.pdf'
        }, {
          url: 'example.com/2',
          encryption_key: 'bar2',
          encryption_iv: 'baz2',
          mimetype: 'application/pdf',
          filename: 'form2.pdf'
        }
      ]
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

### Attachment payload

Attachments are sent in the JSON payload as an `attachments` array. Each attachment
object has the following data:

- `url` which is the url to the encrypted file data. This expires after 15 minutes.
- `encryption_key` which is the key needed to decrypt the file.
- `encryption_iv` which is the initialisation vector needed to decrypt the file.
- `mimetype` which is the mimetype of the file.
- `filename` which is the user generated name of the file.

### Decrypting Files

Files are encrypted using the `AES-256-CBC` protocol. You need both the `encryption_key` and
`encryption_iv` to decrypt the file. These values are unique per file. You can see an example
of decryption in the
[HMCTS Complaints Adapter](https://github.com/ministryofjustice/hmcts-complaints-formbuilder-adapter/blob/master/app/controllers/attachments_controller.rb#L4).

### Links Expire

Please note that the urls to the encrypted files expire 15 minutes after being
generated. You cannot re-request new URLs so you will need to retrieve the file
within this timeframe.
