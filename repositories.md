# Form Builder repositories

- [Specifications and components](#specifications-and-components)
- [Editor](#editor)
- [Publisher](#publisher)
- [Runner](#runner)
  - [Microservice clients](#microservice-clients)
- Platform apps
  - [User Datastore](#user-datastore)
  - [User Filestore](#user-filestore)
  - [Submitter](#submitter)
- [MoJ Cloud Platform](#moj-cloud-platform)
- [Utitlies](#utilities)
- [Form repos](#form-repos)
- [Browser Automation Tests](#browser-automation-tests)

## Specifications and components

### [fb-specification](https://github.com/ministryofjustice/fb-specification)

Form Builder JSON Schema specification tools

uses

- fb-utils-node
- eslint-config-fb

### [fb-components-core](https://github.com/ministryofjustice/fb-components-core)

Form Builder core component schemas and associated nunjucks macros

uses

- govuk_frontend
- fb-specification

## Editor

### [fb-editor-node](https://github.com/ministryofjustice/fb-editor-node)

Form Builder Editor

uses

- fb-runner-node

### [fb-editor-console-electron](https://github.com/ministryofjustice/fb-editor-console-electron)

Application that installs the Form Builder Editor locally (along with all its dependencies) and provides a dashboard to create forms and run the editor.

### [fb-user-guide](https://github.com/ministryofjustice/fb-user-guide)

Form Builder User Guide

## Publisher

UI - [fb-publisher](https://github.com/ministryofjustice/fb-publisher)

Service build/deploy PoC scripts - [fb-publisher-scripts](https://github.com/ministryofjustice/fb-publisher-scripts)

Deployment & infrastructure provisioning of the Publisher app - [fb-publisher-deploy](https://github.com/ministryofjustice/fb-publisher-deploy)

Deployed on the Cloud Platform in these environments:

[Test](https://fb-publisher-test.apps.live-1.cloud-platform.service.justice.gov.uk)
[Integration](https://fb-publisher-integration.apps.live-1.cloud-platform.service.justice.gov.uk)
[Live](https://fb-publisher-live.apps.live-1.cloud-platform.service.justice.gov.uk)

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

### [fb-client](https://github.com/ministryofjustice/fb-client)

This includes:

- User Datastore client
- User Filestore client
- Submitter client

## User Datastore

### [fb-user-datastore](https://github.com/ministryofjustice/fb-user-datastore)

Stores encrypted data entered by users on the Runner forms.

Provides a simple GET/POST JSON API to achieve that.


## User Filestore

### [fb-user-filestore](https://github.com/ministryofjustice/fb-user-filestore)

Stores encrypted files uploaded by users to the Runner forms.

Provides a simple GET/POST JSON API to achieve that.


## Submitter

### [fb-submitter](https://github.com/ministryofjustice/fb-submitter)

Once a user on a Runner service has completed their journey, clicking the final Submit button will result in the service sending a request to the Submitter - which asynchronously retrieves the user's information and sends it to where it needs to go.

Provides a simple GET/POST JSON API to achieve that.

## MoJ Cloud Platform

### [cloud-platform-environments](https://github.com/ministryofjustice/cloud-platform-environments)

Cloud Platform Environments k8s and terraform configuration files

### [fb-cloud-platform-environments](https://github.com/ministryofjustice/fb-cloud-platform-environments)

Generates Cloud Platform Environments k8s and terraform config for Form Builder namespaces

## Utilities

### [fb-deploy-utils](https://github.com/ministryofjustice/fb-deploy-utils)

Utility scripts to aid deployment of Form Builder platform applications

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


## Form repos

### [fb-example-service](https://github.com/ministryofjustice/fb-example-service)

Example service

### [fb-service-starter](https://github.com/ministryofjustice/fb-service-starter)

Base service to duplicate

## Browser Automation Tests

### [fb-automated-tests](https://github.com/ministryofjustice/fb-automated-tests)

Browser automation tests using headless Chrome, which tests a particular form

uses

- eslint-config-fb
