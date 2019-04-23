---
layout: layout-pane.njk
title: Data storage
section: Overview
---

- [Service data](#service-data)
- [User data](#user-data)
- [Specifications data](#specifications-data)



### Service data

The representation of the service is stored as instances in the service repository’s `metadata` directory

Each instance should be stored using its `_id` property suffixed with '.json'.

```
_id  =>   ${_id}.json
```

For example

```
{
  "_id": "foo"
  ...
}
```

should be stored as `foo.json`

By convention, instances should be stored in a directory according to its type.

- configuration
- page
- component
- pattern

<pre>
${serviceRepository}
|  <b>package.json</b>
|
└─ metadata
   |
   └─ configuration
   |    <b>• service.json</b>
   |    • ${_id}.json
   |
   └─ page
   |    • ${_id}.json
   |
   └─ component
   |    • ${_id}.json
   |
   └─ pattern
        • ${_id}.json
</pre>

<details class="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Abou the convention
    </span>
  </summary>
  <div class="govuk-details__text">
  Technically the runner will load any json file in the `metadata` directory no matter where or how deeply nested it is located. However, the convention is used by the Editor and makes it easier to see at a glance what instances and type of instances a service is using.
  </div>
</details>

### User Data

User data comes in 2 flavours

- Namespace data

  the user’s answers to the questions asked by the service
- Files uploaded by the user


#### Namespace data

The user’s answers are stored as a [JSON document](/glossary#json-document), using the names of the controls as the properties to store the values against.

- Production environments

  All user data is encrypted and sent to and retrieved from a shared database via a secure connection.
  
  Each service has its own keys and namespace.

  These keys are configured in the [Publisher](/process/publisher).

  Read more about dynamoDb 

- Non-production environments

  The default storage mode is in-memory and is therefore non-persistent.

  There will be an option to enable persistent storage.

 #### Uploaded files

  - Production environments

    Files are stored on a secure AWS bucket

  - Non-production environments

    Files are stored in the `uploads` directory in the root of the runner app.


### Specifications data

Specifications are provided as modules

eg. https://github.com/ministryofjustice/fb-specification

Specifications are organised by schema type:

- configuration
- page
- component
- pattern

Individual specifications are created according to the following file hierarchy:

<pre>
${specificationsModulePath}
|
└─ specifications
   |
   └─ ${schemaNamespace}
      |
      └─ ${schemaType}
         |
         └─ ${schemaDirectories} (optional)
            |
            └─ $(schemaStub)
               |  • <b>${schemaName}.schema.json</b>
               |  • ${schemaName}.md (optional documentation)
               |
               └─ instances
               |  |
               |  └─ valid
               |  |    • ${schemaName}.${instanceName}.json (at least one)
               |  |    • ${schemaName}.${instanceName}.md (optional documentation of instance)
               |  |
               |  └─ invalid
               |       - ${schemaName}.${instanceName}.json (at least one)
               |       - ${schemaName}.${instanceName}.md (optional documentation of instance)
               |
               └─ template (required for blocks)
                  |
                  └─ nunjucks
                     |  - <i>${schemaName}.njk</i>
                     |
                     └─ tests
                          - {schemaName}.${testName}.unit.spec.js
                      
</pre>
