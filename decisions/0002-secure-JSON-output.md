# 2. Secure JSON Output

Date: 2019-08-22

## Status

✅ Accepted

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
- POST requests could be made to the receiver (adapter) from sources other than Form Builder,
  creating records in their systems that don't reflect user submissions.

Risks
- Reputational damage due to data breaches
- Security threats from modified payloads

Mistakes from the User
- Users could potentially enter an incorrect endpoint, which would deliver sensitive
data to an incorrect endpoint.
- Users could share security information accidentally, allowing malicious actors
to receive payloads.

## Proposed Decision

### TLS over HTTP
Use TLS over HTTP (HTTPS). This would ensure
encrypted data in transit, which [satisfies MOJ standards](https://ministryofjustice.github.io/security-guidance/standards/cryptography/#cryptography).
We came to the conclusion that mutual TLS doesn’t really bring any benefits and
involves way too much management overhead in this context, so agreed on normal
TLS + payload encryption with a pre-shared secret.

### Encrypted JSON Payload
Encryption of the payload is possible with JWE (JOSE toolkit). This would require
decryption at the other end. Payload encryption is preferred over TLS alone as TLS
is often terminated at the edge of a large network with communications travelling in the clear
inside that network. Given the sensitivity of the submitted data for some forms
and that it may need to be relied on in court, we need more confidence that only
the intended recipient can read the data and that other actors on that network
can’t impersonate FB by sending other requests to the endpoint.

### Shared Secret
The shared secret will be set as an ENV var in the publisher to be consumed by
the form's runner instance. The shared secret will be used to encrypt / decrypt
the payload. This shared secret would ideally be system generated rather than user
generated to ensure that it is appropriate for the encryption method we choose.

### Certificates vs Shared Secret
Both certificates and shared secrets can be used for signing and de-serialising the payload.
Given users may not be technical, a shared secret would be preferred as requiring users
to generate and upload certificates may be too much to ask.

### Validation of remote endpoint
The Form Builder system should validate the endpoint that is entered by the user.
At minimum this should be an HTTPS endpoint and `*.gov.uk`.


### Overview of Solution

Form Builder:
- Connects with adapter via HTTPS using a ruby library such as [Net:HTTP](https://ruby-doc.org/stdlib-2.6.3/libdoc/net/http/rdoc/Net/HTTP.html).
- Connection with TLS using `Net::HTTP` gem or similar.
- Encrypts JSON payload using a shared secret and JWE protocol.
- Sends as POST request.

Adapter:
- Receives HTTPS POST request from Form Builder.
- Decrypts JSON payload using shared secret.

## Consequences

Desired level of security is achieved with an easy implementation for users building
future adapters.
