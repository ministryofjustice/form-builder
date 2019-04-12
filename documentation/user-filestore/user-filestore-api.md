# User Filestore

Preface

- [Error responses](#error-responses)
- [Signing requests](#signing-requests)
- [Checking additional requirements](#checking-additional-requirements)
- [Creating S3 key](#creating-s3-key)

API

- [Store file](#store-file)
- [Retrieve file](#retrieve-file)

The User Filestore is a service for storing files uploaded by users for the lifetime of their application.

It is comprised of an API service (Rails) and a storage service (Amazon S3).

The service:

- is transient

  Files are stored for the same length of time as the user's other data held in the User Datastore
  
  28 days by default

- is not for making files available either publicly or to final intended recipients

  Files can only be retrieved from storage through the API 

- is secure

  Files are stored encrypted so that files cannot be accessed if the collection is backed up/moved elsewhere

- controls access

  Files are stored using a key generated from a digest of the service, user id and file's fingerprint encrypted with the user's id/token digest 

  Files can only be retrieved when presented with all those pieces.

## Preface 

### Error responses

Error responses should be sent as JSON - see [Error responses](error-responses.md)

###  Signing requests

Requests should be signed with JWT - see [Signing requests with JWT](request-signing-with-jwt.md)

### Checking additional requirements

Requests should be checked for the presence of `encrypted_user_id_and_token` (as property for POST, x-header for GET)

- Error if `encrypted_user_id_and_token` property is not present
  - code: `403`
  - name: `forbidden.user-id-token-missing`

### Creating S3 key

- Create digest from service token + user id + file fingerprint
- Encrypt digest via AES-256 with the encrypted_user_id_and_token as key
- Generate hash of encrypted digest
- Key is /{service_slug}/{user_id}/{hashed_digest}

## Store file

`POST /service/{service_slug}/{user_id}`

```json
{
  "iat": "{timestamp}",
  "encrypted_user_id_and_token": "{userId+userToken encrypted via AES-256 with the serviceToken as the key}",
  "file": "{file as binary data}",
  "policy": {
    "allowed_types": [...],
    "max_size": {max_size bytes},
    "expires": "{duration}"
  }
}
```

###  A. As per "Check request correctly signed and meets requirements"

###  B. Check file

- Perform size check if `policy.max_size` is present
  - Error if file is too large
    - code: `400`
    - name: `invalid.too-large`
    - max_size: {max_size}
    - size: {file_size}
- Perform file type checks if `policy.allowed_types` is present
  - Error if file is wrong type
    - code: `400`
    - name: `invalid.type`
    - type: {file_type}
- Send to virus scanning service
  - Error if file contains virus
    - code: `400`
    - name: `invalid.virus`
    - virus_name: {virus_name}
- Check file can be opened
  - Error if file is password-protected
    - code: `400`
    - name: `invalid.password-protected`
  - Error if file is unopenable
    - code: `400`
    - name: `invalid.unopenable`

###  C. Store file

- Fingerprint file
- Create S3 key
- Encrypt file using `encrypted_user_id_and_token` as key
- Upload file to S3 key
  - Error if file cannot be stored
    - code: `503`
    - name: `unavailable.file-store-failed`
    - [service_code]
    - [message] (any additional info from S3 request)

### D. Return file storage details

```json
{
  "url": "/service/{service_slug}/{user_id}/{fingerprint}",
  "size": {file_size bytes},
  "type": "{file_type}",
  "date": "{unix_timestamp}"
}
```

- Status code if no file previously existed 
  - `201` (Created)

- Status code if a file previously existed 
  - `204` (No Content)

This information is stored in the User Datastore and is sent to the Submitter to retrieve the file.

[![User Filestore sequence](images/user-filestore--store.png)](images/user-filestore--store.svg)

## Retrieve file

`GET /service/{service_slug}/{user_id}/{fingerprint}`

`encrypted_user_id_and_token` must be sent as an x-header.

###  A. As per "Check request correctly signed and meets requirements"

###  B. Fetch file

- Create S3 key
- Fetch file
  - Error if file cannot be fetched
    - code: `503`
    - name: `unavailable.file-retrieval-failed`
    - [service_code]
    - [message] (any additional info from S3 request)
  - Error if file does not exist
    - code: `404`
    - name: `not-found`
- Decrypt file using `encrypted_user_id_and_token` as key

### C. Return file

```json
{
  "file": "{file as binary data}",
}
```

[![User Filestore sequence](images/user-filestore--retrieve.png)](images/user-filestore--retrieve.svg)

<!--
## Delete file

`DELETE /service/{service_slug}/{user_id}/{fingerprint}`

`encrypted_user_id_and_token` must be sent as an x-header.

###  A. As per "Check request correctly signed and meets requirements"

###  B. Delete file

- Create S3 key
- Delete file
  - Error if file cannot be deleted
    - code: `503`
    - name: `unavailable.file-deletion-failed`
    - [service_code]
    - [message] (any additional info from S3 request)

### C. Return status code `200`
-->



