# 4. Microservice authentication

Date: 2019-10-30

## Status

✅ Accepted

## Context

There are currently 3 different ways that microservices talk to each other in the form builder platform JWT, JWE and API keys.

Consistency can benefit the service by keeping a minimum of protection across all endpoints and help developers better understand the system.

**Constraints**:

- Backend services should not be allowed to make arbitrary calls with each other without the authorisation of a `runner` form submission.
- The `runner` should be the only service able to authorise new submissions.

## Decision

JWT supports the use of tokens that are signed with a private key and verified with a public key.
The frontend `runner` applications possess the private key needed to sign a JWT token.
A token is in the header in every request.

Backend applications can then use the preexisting `token API` to get the public key of that service and use it to verify the JWT tokens signature. 
JWT verification allows for all backend APIs to check the origin of a request is a currently active form.

Applications can use the token given to them from a running form to make new requests to sibling APIs on its behalf.
Therefore APIs do not possess private keys (which would allow them to make arbitrary calls)

User data continues using its own layer of protection using encrypted user tokens however this is now incorporated into JWT in the `sub` (subject) claim.

## Consequences

- Arbitrary requests between APIs are not permitted, something that was possible before

- Future permission restrictions can make use of JWTs claim headers (for example token expiry)

- The requested data is not inside the JWT token and are therefore are not signed
