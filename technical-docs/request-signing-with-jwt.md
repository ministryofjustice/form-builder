# Signing requests with JWT

All requests must be signed using JSON Web Tokens (JWT) with the corresponding service’s service token.

Signing options should include the `iat` property to provide a time-limit and mitigate against replay attacks.

## POSTs
The token must be passed as a header called `x-access-token`

## GETs
The token must be passed as a query parameter `payload`

##  Check request correctly signed

- Get service token for service
  - Error if service token cannot be retrieved
    - code: `503`
    - name: `unavailable.server-token-error`
    - [service_code]
    - [message] 
- Decrypt and check JWT token
  - Error if the JWT token is not present
    - code: `401`
    - name: `unauthorised.access-token-missing`
  - Error if the JWT token has expired
    - code: `401`
    - name: `unauthorised.access-token-expired`
  - Error if the JWT token is not valid
    - code: `403`
    - name: `forbidden.access-token-invalid`