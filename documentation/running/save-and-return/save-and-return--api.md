# Save and return

NB. this is still a draft

## TOC

- [Error responses](#error-responses)
- [Signing requests](#signing-requests)

### Save (create return record)

- [Create email token for user to confirm email](#create-email-token-for-user-to-confirm-email)
- [Confirm user’s email](#confirm-users-email-address)
- [Create code for user to confirm mobile](#create-code-for-user-to-confirm-mobile)
- [Confirm user’s mobile](#confirm-users-mobile-address)
- [Create save and return record for user](#create-save-and-return-record-for-user)

### Return

- [Create magiclink for user](#create-magiclink-for-user)
- [Confirm user’s magiclink](#confirm-users-magiclink)
- [Confirm user’s signin code](#confirm-users-signin-code)

## Preface 

### Error responses

Error responses should be sent as JSON - see [Error responses](error-responses.md)

###  Signing requests

Requests should be signed with JWT - see [Signing requests with JWT](request-signing-with-jwt.md)

### Invalidating records



```
{
  ...
  invalid: superseded
}
```

## Save (setup return record)

### Create email token for user to confirm email

`POST /service/:service/savereturn/email/add`

Expected body

``` json
{
  "email": "<string>",
  "encrypted_email": "<string>",
  "[encrypted_passphrase]": "<string>",
  "encrypted_details": "<string>",
  "[duration]": "<number>",
  "link_template": "<string>",
  "[service_vars]": "<object>"
}
```

Expected response

``` json
{}
```

- create email token
- invalidate previous tokens
- store encrypted email details
- send email

#### Mark previous tokens as superseded

#### Generate email_token

UUID v4

#### Generate expiry_time

Current time + duration (minutes|hours?)


#### Create email token record

```
{
  type: "email_token",
  email_token,
  expiry_time,
  encrypted_email,
  [encrypted_passphrase],
  email_details
}
```

[![Title](images/return--setup--email-add.png)](images/return--setup--email-add.svg)

### Confirm user’s email address

`POST /service/:service/savereturn/email/confirm`

Expected body

``` json
{
  "email_token": "<string>",
  "[encrypted_passphrase]": "<string>"
}
```

Expected response

``` json
{
  "encrypted_details": "<string>"
}
```

- confirm email token validity
- return error codes
- mark email token used
- return encrypted email details

[![Title](images/return--setup--email-validation.png)](images/return--setup--email-validation.svg)


### Create code for user to confirm mobile

`POST /service/:service/savereturn/mobile/add`

Expected body

``` json
{
  "mobile": "<string>",
  "encrypted_email": "<string>",
  "encrypted_details": "<string>",
  "[duration]": "<number>"
}
```

Expected response

``` json
{}
```

- create code
- invalidate previous codes
- store encrypted 2fa details
- send sms

[![Title](images/return--setup--mobile-add.png)](images/return--setup--mobile-add.svg)

### Confirm user’s mobile

`POST /service/:service/savereturn/mobile/confirm`

Expected body

``` json
{
  "code": "<string>",
  "encrypted_email": "<string>"
}
```

Expected response

``` json
{
  "encrypted_details": "<string>"
}
```

- confirm code validity
- return error codes
- mark code used
- return encrypted 2fa details

[![Title](images/return--setup--mobile-validation.png)](images/return--setup--mobile-validation.svg)

### Create save and return record for user

`POST /service/:service/savereturn/create`

Expected body

``` json
{
  "encrypted_email": "<string>",
  "encrypted_details": "<string>"
}
```

Expected response

``` json
{}
```

- create savereturn details

[![Title](images/return--setup--create-record.png)](images/return--setup--create-record.svg)



## Return

### Create magiclink for user

`POST /service/:service/savereturn/signin/email`

Expected body

``` json
{
  "email": "<string>",
  "encrypted_email": "<string>",
  "[duration]": "<number>"
}
```

Expected response

``` json
{}
```

- create magiclink
- invalidate previous magiclinks
- store savereturn key (email)
- send email

[![Title](images/return--signin.png)](images/return--signin.svg)


### Confirm user’s magiclink

`POST /service/:service/savereturn/signin/magiclink`

Expected body

``` json
{
  "magiclink": "<string>"
}
```

Expected response

``` json
{
  "encrypted_details": "<string>"
}
```

- confirm magiclink validity
- return error codes
- return savereturn details

[![Title](images/return--signin--magiclink.png)](images/return--signin--magiclink.svg)

### Send user’s signin code

`POST /service/:service/savereturn/signin/code`

Expected body

``` json
{
  "mobile": "<string>",
  "encrypted_email": "<string>",
  "[duration]": "<number>"
}
```

Expected response

``` json
{}
```

- create signin code
- invalidate previous signin codes
- store savereturn key (email)
- send sms

[![Title](images/return--signin--code-send.png)](images/return--signin--code-send.svg)


### Confirm user’s signin code

`POST /service/:service/savereturn/signin/code/validate`

Expected body

``` json
{
  "code": "<string>",
  "encrypted_email": "<string>"
}
```

Expected response

``` json
{
  "encrypted_details": "<string>"
}
```

  - confirm siginin code validity
  - return error codes
  - mark signin code used
  - return savereturn details

[![Title](images/return--signin--code-validate.png)](images/return--signin--code-validate.svg)
