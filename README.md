# form-builder
Jumping-off point for all the related form-builder repos

## Specifications and components

### [fb-specification](https://github.com/ministryofjustice/fb-specification)

Form Builder JSON Schema Specifications

uses

- fb-utils-node
- eslint-config-fb

### [fb-components-core](https://github.com/ministryofjustice/fb-components-core)

Form Builder core component schemas and associated nunjucks macros

uses

- fb-specification

<!--
### [fb-documentation](https://github.com/ministryofjustice/fb-documentation)

Form Builder documentation **(Currently broken)**

uses

- fb-nunjucks-helpers
-->

## Editor

### [fb-editor-node](https://github.com/ministryofjustice/fb-editor-node)

Form Builder Editor

uses

- fb-runner-node

### [fb-editor-electron](https://github.com/ministryofjustice/fb-editor-electron)

Application that installs the Form Builder Editor locally (along with all its dependencies) and provides a dashboard to create forms and run the editor.

### [fb-user-guide](https://github.com/ministryofjustice/fb-user-guide)

Form Builder User Guide

## Publisher

UI - [fb-publisher](https://github.com/ministryofjustice/fb-publisher)

Service build/deploy PoC scripts - [fb-publisher-scripts](https://github.com/ministryofjustice/fb-publisher-scripts)

Deployment & infrastructure provisioning of the Publisher app - [fb-publisher-deploy](https://github.com/ministryofjustice/fb-publisher-deploy)

Deployed on the Cloud Platform in these environments:

[Dev](http://fb-publisher-dev.apps.cloud-platform-live-0.k8s.integration.dsd.io)

[Staging](http://fb-publisher-staging.apps.cloud-platform-live-0.k8s.integration.dsd.io)

Both of the above should be able to deploy services into dev or staging.
There is no 'production' yet!

## Runner

### [fb-runner-node](https://github.com/ministryofjustice/fb-runner-node)

Form Builder Runner (Node version)

uses

- fb-user-datastore-client-node
- fb-submitter-client-node
- fb-specification
- fb-nunjucks-helpers
- fb-runtime-node
- fb-utils-node
- eslint-config-fb

## Microservice clients

### [fb-user-datastore-client-node](https://github.com/ministryofjustice/fb-user-datastore-client-node)

User Datastore client

uses

- fb-jwt-client-node

### [fb-submitter-client-node](https://github.com/ministryofjustice/fb-submitter-client-node)

Submitter client

uses

- fb-jwt-client-node

### [fb-jwt-client-node](https://github.com/ministryofjustice/fb-jwt-client-node)

Base client for making JSON Web Token-backed requests


## User Datastore

### [fb-user-datastore](https://github.com/ministryofjustice/fb-user-datastore)

Stores encrypted data entered by users on the Runner servces. Provides a simple
Get / Post JSON API to achieve that.


## Submitter

### [fb-submitter](https://github.com/ministryofjustice/fb-submitter)

Once a user on a Runner service has completed their journey, clicking the final Submit button will result in the service sending a request to the Submitter - which asynchronously retrieves the user's information and sends it to where it needs to go. Provides a simple Get / Post JSON API to achieve that.

## Utilities

### [fb-runtime-node](https://github.com/ministryofjustice/fb-runtime-node)

Transforms edit-time Form Builder service instances into run-time ones

uses

- fb-specification
- fb-utils-node
- eslint-config-fb

### [fb-nunjucks-helpers](https://github.com/ministryofjustice/fb-nunjucks-helpers)

Form Builder Nunjucks helper methods

uses

- eslint-config-fb

### [fb-utils-node](https://github.com/ministryofjustice/fb-utils-node)

Form Builder utility methods

uses

- eslint-config-fb

### [eslint-config-fb](https://github.com/ministryofjustice/eslint-config-fb)

Standard eslint config for Form Builder projects


## Service repos

### [fb-example-service](https://github.com/ministryofjustice/fb-example-service)

Example service

### [fb-service-starter](https://github.com/ministryofjustice/fb-service-starter)

Base service to duplicate
