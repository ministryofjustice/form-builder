# form-builder
Jumping-off point for all the related form-builder repos

## Specifications

### [fb-specification](https://github.com/ministryofjustice/fb-specification)

Form Builder JSON Schema Specifications (and associated nunjucks macros)

uses

- fb-utils-node
- eslint-config-fb

### [fb-documentation](https://github.com/ministryofjustice/fb-documentation)

Form Builder documentation

uses

- fb-nunjucks-helpers

## Editor

## Publisher

UI - [fb-publisher](https://github.com/ministryofjustice/fb-publisher)

Service build/deploy PoC scripts - [fb-publisher-scripts](https://github.com/ministryofjustice/fb-publisher-scripts)

Deployment & infrastructure provisioning of the Publisher app - [fb-publisher-deploy](https://github.com/ministryofjustice/fb-publisher-deploy)

## Runner

### [fb-runner-node](https://github.com/ministryofjustice/fb-runner-node)

Form Builder Runner (Node version)

uses

- fb-specification
- fb-nunjucks-helpers
- fb-runtime-node
- fb-utils-node
- eslint-config-fb

### [fb-runtime-node](https://github.com/ministryofjustice/fb-runtime-node)

Transforms edit-time Form Builder service instances into run-time ones

uses

- fb-specification
- fb-utils-node
- eslint-config-fb

## Utilties

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
