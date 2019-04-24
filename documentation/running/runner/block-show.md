---
layout: layout-pane.njk
title: Showing blocks
section: Overview
---

## Showing and hiding blocks

All output blocks (whether pages or components) can be hidden, or rather, suppressed or not rendered/displayed, by setting the `show` property either to false or to a [condition](logic) that evaluates to true.

```json
{
  "_id": "pagePlanet",
  "_type": "page.singlequestion",
  "url": "/planet",
  "components": [{
    "_id": "pagePlanet--planet",
    "_type": "text",
    "name": "planet",
    "label": "What is your favourite planet?"
  }],
  "show": {
    "identifier": "greeting",
    "operator": "is",
    "value": "Hello World",
    "negated": true
  }
}
```

This page will only be displayed if the value the user previously entered for `greeting` was ‘Hello World’.

```json
{
  "_id": "showExamplePage",
  "_type": "page.form",
  "url": "/showexample",
  "components": [{
    "_id": "showExampleGroup",
    "_type": "group",
    "items": [{
      "_id": "showExampleA",
      "_type": "text",
      "name": "show-example-a",
      "label": "Question A",
      "show": {
        "identifier": "foo",
        "operator": "is",
        "value": "yes"
      }
    },{
      "_id": "showExampleB",
      "_type": "text",
      "name": "show-example-b",
      "label": "Question B",
      "show": {
        "identifier": "bar",
        "operator": "is",
        "value": "yes"
      }
    }]
  }]
}
```

If the show conditions of blocks `showExampleA` and `showExampleB` both evaluate to false (ie. `foo` does not equal yes and `bar` does not equal no), then as none of its item components are to be rendered, the `showExampleGroup` block will not be rendered either. Furthermore, as the page itself only has `showExampleGroup` as a component, it too would not be displayed and the runner would redirect the user to the next page 


[Show definition](/definition/definitionConditionalBoolean)

