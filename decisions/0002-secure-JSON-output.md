# 2. Secure JSON Output

Date: 2019-08-22

## Status

🤔 Proposed

## Context

We are working on a new feature of Form Builder where a form creator (user) can
opt to have submissions (citizen answers) sent as JSON to an endpoint of their choosing.
These endpoints can be any url, but will likely be CMS or case management systems.

The first use case of this is the HMCTS complaints form. This form requires an
integration to HMCTS' Optics system. We will be creating a custom adapter that receives
the JSON output from Form Builder, and then generates the complaint in Optics. This
adapter will live outside the Form Builder infrastructure. In the future, the hope
is that teams will create their own adapters in order to integrate Form Builder
with various external systems.

This ADR is regarding how to secure this JSON output from Form Builder to the
endpoint set by the user.

Threats
- Payload may be intercepted, exposing sensitive user answers.
- Payload may be modified in transit, with potentially damaging consequences.

Risks
- Reputational damage due to data breaches
- Security threats from modified payloads

Mistakes from the User
- Users could potentially enter an incorrect endpoint, which would deliver sensitive
data to an incorrect endpoint.
- Users could share security information accidentally, allowing malicious actors
to receive payloads.

## Proposed Decision

### Mutual TLS over HTTP
Use mutual TLS over HTTP (HTTPS). This would ensure
encrypted data in transit, which [satisfies MOJ standards](https://ministryofjustice.github.io/security-guidance/standards/cryptography/#cryptography).

### Signed JSON Payload
Signing the payload with a pre-shared secret would ensure that payloads are not
tampered in transit as well as identifying sender.

### Shared Secret
The shared secret will be set as an ENV var in the publisher to be consumed by
the form's runner instance. The shared secret will be used to sign / confirm
the payload.

### Encryption
Encryption of the payload is possible with JWE (JOSE toolkit). This would require
decryption at the other end. As TLS is used, it is hoped we can rely solely on TLS
encryption in transit.

### Certificates vs Shared Secret
Both certificates and shared secrets can be used for signing and de-serialising the payload.
Given users may not be technical, a shared secret would be preferred as requiring users
to generate and upload certificates may be too much to ask.


### Overview of Solution

Form Builder:
- Connects with adapter via HTTPS using a ruby library such as [Net:HTTP](https://ruby-doc.org/stdlib-2.6.3/libdoc/net/http/rdoc/Net/HTTP.html).
- Connection utlisises mutual TLS using `Net::HTTP verify_mode: OpenSSL::SSL::VERIFY_PEER`.
- Signs JSON payload using a shared secret and JWS protocol.
- Sends as POST request.

Adapter:
- Receives HTTPS POST request from Form Builder.
- Validates JWS signature using shared secret.
- Also verifies request header / origin to ensure it was sent from Form Builder.

## Consequences

Desired level of security is achieved with an easy implementation for users building
future adapters.

There is no additional application level encryption. TLS over HTTP is relied on for this.
