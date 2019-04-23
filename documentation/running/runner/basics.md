---
layout: layout-pane.njk
title: The basics
section: Overview
---

A service is made up of a service [instance](/glossary#instance) and at least one page instance.


## Service

You configure the details of the service by editing the [service instance](/configuration/service).

Example service instance

```
{
  "_id": "service",
  "_type": "service",
  "name": "Interact with government in some way",
  "phase": "beta",
  "phaseText": "This is an example service"
}
```

A service must have one and only one service instance.

The service instance must be stored at `service.json` in the service's [`metadata` directory](storage#service-data).

<!--
Every service must have a start page and the user’s journey through the service is defined as a sequence of steps, each of which is a reference to a page.
-->



## Pages

A [page](/page) instance is the data representation of a document to be displayed to a user.

Example page instance

```
{
  "_id": "pageFoo",
  "_type": "page.form",
  "url": "/foo",
  "heading": "Dummy foo page",
  "components": [{
    "_id": "pageFoo--bar",
    "_type": "text",
    "name": "bar",
    "label": "What is your favourite bar?"
  }]
}
```

This example defines a page that would be served in response to a request to '/foo', has the heading 'Dummy foo page' and contain one a text input control named 'bar' and labelled 'What is your favourite bar?'.

Each page must be defined in its own json file stored in the service's [`metadata` directory](storage#service-data).

Pages are rendered using the template that corresponds to the page type used.

Pages can be standalone or form part of the [flow](flow) (the user’s journey through the service).


[Pages](/page) can include [components](/components) <!-- and [patterns](/patterns) --> which can be added to the page‘s `components` property.

[Read more about pages and see available page types](/page)


## Components

Components are renderable blocks that can be used within a page.

Example component instance

```
{
  "_id": "bar",
  "_type": "text",
  "name": "bar",
  "label": "What is your favourite bar?"
}
```

This example defines a component that would be rendered as a text input control named 'bar' and labelled 'What is your favourite bar?'.

The example is defined as a [discrete instance](/glossary#nested-and-discrete-instances) which enables the component to be reused. Discrete instances must be stored in the service's [`metadata` directory](storage#service-data).

More often though, components are defined as [nested instances](/glossary#nested-and-discrete-instances) as shown in the page instance example above.


Components come in the following basic categories

- content
- form controls
- grouping other components <!-- (ie. components and patterns) -->

[Read more about components and see available component types](/component)


<!--

## Patterns

Patterns are higher-order components (and usually composed from other components) that provide best practice design solutions for specific user-focused tasks.

> eg. A National Insurance field as opposed to a standard text field

Patterns can be used anywhere components can be.

[Read more about patterns and see available pattern types](/pattern)


## Blocks

Pages, components and patterns are all blocks.

A block is a data object that can be rendered with a template corresponding to the block’s type.

The block is the fundamental data type in Form Builder from which all others are made, providing baseline properties.

[Read more about blocks](block)

-->

<!--
## Definitions

Definitions are base schemas that other schemas can be made from.

[Read more about definitions](/definition)
-->