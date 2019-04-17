# Form Builder overview

## Technical approach

We build a digital form by representing it as data.

By creating this data using consistent definitions (the build-time “logical” representation), we can then generate the form using generic frontend components and backend components (the run-time “physical instantiation”) rather than through bespoke development.

This approach is sometimes known as metadata-driven design.

## Platform parts

There are 4 distinct parts of Form Builder.

TODO: IMG

- the [editor](../building-forms/editor/editor.md) creates the form’s data
- the [publisher](../publisher/publisher.md) deploys and manages the form
- the [runner](../runner/runner.md) renders the citizen-facing part of the service and collects users’ data
- the [submitter](../submitter/submitter.md) sends the information entered by users where the form creator specified
