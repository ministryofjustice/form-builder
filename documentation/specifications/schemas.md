# Form Builder Schemas


Form Builder schemas are [JSON Schema](http://json-schema.org/) documents.

The schemas must have the following properties

- `$id`

  String

  eg. the start page
  
  `http://gov.uk/schema/v1.0.0/page/start`

  Unique identifier for the schema conforming to the pattern ``http://gov.uk/schema/${schemaVersion}/[${schemaNamespace}/]${schemaType}/${schemaName}` where

    - `schemaVersion`

      is the semantic version of all the schemas in use, following the pattern X.X.X, eg, 0.0.2 - the version is coupled to the version of @govuk-frontend in use.
    - `schemaNamespace` (optional)

      states the namespace the schema is in. If there is no namespace, the schema is a core schema.
    - `schemaType`

      states whether the schema is a page, component, pattern or definition
    - `schemaName`

      is the `_name` of the schema 
- `_name`

  String

  The unique name of the schema, used to validate and render [block](block) instances.

  It is masde of the path to the schema (`[${schemaNamespace}/]${schemaType}/${schemaName}`) with the slashes substituted by periods

  ```
  page/start ---> page.start
  ```

Additionally they can also have

- `category`

  Array.&lt;String&gt;

  Categories that the schema should match

## Schema location

is comprised of the path to the schema (`[${schemaNamespace}/]${schemaType}/${schemaName}`) suffixed with `${_name}.schema.json`.

eg. the start page

`page/start/page.start.schema.json`


    http://gov.uk/schema/${schemaVersion}/[${schemaNamespace}/]${schemaType}/${schemaName}`

    -->

    `${schemaNamespace}/]${schemaType}/${schemaName}/[${schemaNamespace}.]${schemaType}.${schemaName}.schema.json`

This location is relative to its `specifications` directory.