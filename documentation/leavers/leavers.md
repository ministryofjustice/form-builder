# Leavers

When a member leaves the team, we need to ensure that access to Form Builder secrets and infrastructure is revoked.

## Application Secret Repositories

For each of the encrypted application secret repositories, the GPG public key of the leaving member will need to be removed from the source code.

Please see the [Secrets](../secrets/secrets.md) documentation for more information.

## Central Password Manager

*Getting a Lastpass team account is work in progress, as MOJ have run out of licences*

Please speak to one of the technical architects about this.

## NPM

Remove user from `ministryofjustice` organisation.

## Complete the MOJ leavers form

This is the final step that will remove a user from the rest of the services at MOJ.

[Leavers form](https://moj-leavers-form-production.apps.cloud-platform-live-0.k8s.integration.dsd.io/)
