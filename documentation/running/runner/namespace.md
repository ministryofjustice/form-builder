---
layout: layout-pane.njk
title: Control names and namespaces
section: Overview
---

## Control names

All controls must have a name.

The name is used as the key/path to store the input in the user’s data against.

By default, control names are not namespaced.

## Namespace properties

- `namespace`

  The namespace/namespace to use for a control.

  It can be set on controls, checkbox items, fieldsets, groups and pages.

  It must be set if the block’s can have a `multiple` property and that property is set.
  
  Its value is propagated to any blocks contained within the block.
- `namespaceProtect`

  Whether or not to allow a block's name to be prefixed with any propagated `namespace` value


## Examples

In the following examples, properties other than `name`, `namespace`, `namespaceProtect`, `multiple` and `components` have been omitted for clarity.

```
{
  ...
  "name": "email"
}
=> name="email"
```

Default outcome when no namespace is set

```
{
  ...
  "name": "email",
  "namespace": "spouse"
}
=> name="spouse.email"
```

When the block’s namespace is set 

```
{
  ...
  "name": "email",
  "namespace": "child",
  "multiple": true
}
=> name="child[1]email"
(when child’s multipleInstanceCounter = 2)
```

When the block’s multiple is set

```
{
  ...
  "namespace": "father",
  "components": [
    {
      ...
      "name": "email"
    }
  ]
}
=> name="father.email"
```

When the block’s parent block has a namespace

```
{
  ...
  "namespace": "applicant",
  "components": [
    {
      ...
      "name": "email",
      "namespace": "home"
    }
  ]
}
=> name="applicant.home.email"
```

When the block’s namespace is set and the block’s parent block has a namespace too 

```
{
  ...
  "namespace": "proceedings",
  "components": [
    {
      ...
      "name": "email",
      "namespace": "defendant",
      "namespaceProtect" true
    }
  ]
}
=> name="defendant.email"
```

When the block’s parent block has a namespace, but the block’s namespaceProtect is set

The user-supplied data resulting from all these controls would be structured like this

```
{
  "email": "...",
  "spouse": {
    "email": "..."
  },
  child: [{
    ...
  }, {
    "email": "..."
  }],
  "father": {
    "email": "..."
  },
  "applicant": {
    "home": {
      "email": "..."
    }
  },
  "defendant": {
    "email": "..."
  }
}
```

