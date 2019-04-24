# Concepts and glossary

- [JSON and JSON Schema](#json-and-json-schema)
  - [JSON](#json)
  - [JSON data types](#json-data-types)
  - [JSON document](#json-document)
  - [JSON object](#json-object)
  - [JSON Schema](#json-schema)
- [Form Builder concepts](#form-builder-concepts)
  - [Schema](#schema)
  - [Instance](#instance)
  - [Specification](#specification)
  - [Block](#block)
  - [Configuration](#configuration)
  - [Definition](#definition)
  - [Environment](#environment)
- [Form Builder types](#form-builder-types)
  - [Service](#service)
  - [Page](#page)
  - [Component](#component)
  - [Pattern](#pattern)



## JSON and JSON Schema

Since JSON Schema is written in JSON itself and there are many loosely overlapping bits of terminology (objects, documents, data, values, schemas, definitions, specifications, fragments...), the following defines how and what terms are used relating to Form Builder.

### JSON

[JSON (JavaScript Object Notation)](https://json.org/) is a lightweight data interchange format.


### JSON data types

[JSON](#json) supports the following data types:

- string
- number
- boolean
- null
- object
- array


### JSON document

An occurrence of [JSON](#json) data. It can be of any [JSON data type](#json-data-type).


### JSON object

A [JSON document](#json-document) which is an object - ie. a collection of name/value pairs.


### JSON Schema

[JSON Schema](https://json-schema.org/) is a JSON-based declarative format for describing the structure of JSON data.


[Understanding JSON Schema](https://spacetelescope.github.io/understanding-json-schema)


## Form Builder concepts


### Schema

A schema is a [JSON object](#json-object) that defines a [JSON document](#json-document) conforming to the [JSON Schema](#json-schema) format.


*eg. The [Start page](/page/pageStart) schema defines the data namespace of the service’s Start page [instance](#instance)*

Schemas allow for the creation and validation of [instances](#instance) as well as for providing instructions for user interfaces with which to edit such instances and validating and transmission of data entered by the user.

Schemas can be thought of as the blueprints for the data that represent the service.

Other examples of Form Builder schemas

- [Service](/configuration/service) schema
- [Radios](/component/radios) schema

Schemas fall into 4 categories

1. [Block](#block) schemas define block instances used by the service.
2. [Behaviour](#behaviour) schemas define configuration instances used by the service
2. [Configuration](#configuration) schemas  define configuration instances used by the service
3. [Definition](#definition) schemas provide the means to define other schemas.

<!--
Block schemas can be be divided into the following generic types

- [Page](#page) schemas
- [Component](#component) schemas
- [Pattern](#pattern) schemas
-->



<!-- <details class="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Summary
    </span>
  </summary>
  <div class="govuk-details__text">
  Text
  </div>
</details> -->


### Instance

An instance is a [JSON document](#json-document) that has a structure defined by a particular [schema](#schema).

*eg. A [Start page](/page/pageStart) instance defines the block of the service’s Start page*

All instances must have

- `_id`
  a unique identifier for the instance
- `_type`
  the name of the schema the instance is an instance of

####  Instance types

A collection of instances make up the representation of a [service](#service).

Other examples of Form Builder instances

- [Service](#service) instance
- [Radios](/component/radios) instance

References to instances can be generic

- [Block](#block) instance
- [Page](#page) instance
- [Component](#component) instance
- [Pattern](#pattern) instance


#### Nested and discrete instances

Instances can be nested or discrete 


- Discrete instance

  An instance that is [stored](runner/storage#service-data) as a separate individual file <!-- stand-alone -->

  All instances can be discrete.

- Nested instance

  An instance that exists as the value of a property of another instance

  Only component instances can be nested.

<!-- #### Life-cycle of an instance

- Edit-time instance
- Publish-time instance
- Run-time instance
- Request-time instance
- Submit-time instance -->


<!--
The word instance is usually used to denote an instance that is a [JSON object](#json-object).
Other data type instances can only exist as a property of another instance
-->


### Specification

A specification is a collection of files containing:

- a [schema](#schema)
- valid and invalid example [instances](#instance) for testing the schema
- any transformation rules
- documentation

A specification of a block also includes:

- a template
- template tests

Specifications are grouped together into a specifications module.

<!-- A specification can also be referred to as a specification bundle. -->

### Block

A block instance is any [instance](#instance) that defines the rendering of block 

It covers the following [types](#form-builder-types):

- Page
- Component
- Pattern

Block instances are any [instances](#instance) of these types.

Block schemas are any [schemas](#schema) of these types.

All block schemas must have a corresponding template.

The block definition schema is a [definition](#definition) schema used by all the block schemas.

### Configuration instance

A [configuration](/configuration) instance is any instance that defines properties such as:

- the service name and phase
- service ownership and feedback details
- feature flags in use
- any additional specifications used

### Definition

A [definition](/definition) schema is a base schema that is used to make other schemas.

Definitions are not used to create [instances](#instance).


### Environment

An [environment](/process/environment) is any computer system, physical or virtual, where a service can be run.



## Form Builder types

### Service

The service instance is a [configuration instance](#configuration) that sets the basic details of the service.

- name
- phase

[Read about service](/configuration/service)

### Page

A [page](/page) instance is the data representation of a document to be displayed to a user. 

### Component

A [component](/component) instance is the data representation of an item that can be added to a page

Components come in 3 forms:

- control

A control component blocks a form control for a user to enter information
- content

A content component blocks non-form content
- grouping

A grouping component blocks a group of components / blocks

### Pattern

A [pattern](/pattern) is a best practice design solution for a specific user-focused task.

Patterns come in 2 forms:

- page patterns

  A page pattern can be used anywhere a [page](#page) can be used
- component pattern

  A component pattern can be used anywhere a [component](#component) can be used

  It can contain other components and/or component patterns.
