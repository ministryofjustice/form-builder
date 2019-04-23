---
layout: layout-pane.njk
title: Components
---

Components are reusable parts of the user interface that have been made to support a variety of applications.

They can be broken down into several categories.

## Controls

Form control components allow a user to provide information.

These components essentially map one-to-one to components described in the GOV.UK Design System.

- [Checkboxes](/component/checkboxes)
- [Date](/component/date)
- [Number](/component/number)
- [Radios](/component/radios)
- [Select](/component/select)
- [Text](/component/text)
- [Textarea](/component/textarea)

NB. File upload is currently not supported.


## Content

These components output content and  essentially map one-to-one to components described in the GOV.UK Design System.

- [Details](/component/details) - progressively disclose content
- [Table](/component/table) - display tabular data
- [Warning text](/component/warningText) - alert a user to consequences of an action

Additionally, arbitrary content can be added to a page using

- [Content](/component/content) - arbitrary content

## Grouping

Grouping components provide a way of grouping other components together.

- [Fieldset](/component/fieldset) - group controls (and optionally content) semantically
- [Section](/component/section) - group content semantically
- [Group](/component/group) - grouped any components without any semantic intent

Read about [semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)

## Options

Option components provide the option items for components such as [radios](/component/radios), [checkboxes](/component/checkboxes) and [select](/component/select).

They cannot and must not be used in other contexts.

## Properties to be explained

- name
- namespace
- namespaceProtect

*TODO: flesh this out and link to namespace stuff*