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
Use mutual TLS over HTTP (HTTPS) with serialised/signed JSON payloads. This would ensure
encrypted data in transit, which [satisfies MOJ standards](https://ministryofjustice.github.io/security-guidance/standards/cryptography/#cryptography).
Signing the payload with a pre-shared secret would ensure that payloads are not
tampered in transit as well as identifying sender. The adapter could further ensure
that payloads are only received from Form Builder using HTTP request info.

Overview:

Form Builder:
- Connects with adapter via HTTPS using a ruby library such as [Net:HTTP](https://ruby-doc.org/stdlib-2.6.3/libdoc/net/http/rdoc/Net/HTTP.html)
- Signs JSON payload using a shared secret and JWS protocol
- Sends as POST request

|
V

Adapter:
- Receives HTTPS POST request from Form Builder
- Validates JWS signature using shared secret
- Also verifies request header / origin to ensure it was sent from Form Builder (edited

## Consequences

Desired level of security is achieved with an easy implementation for users building
future adapters.

There is no additional application level encryption. TLS over HTTP is relied on for this.
