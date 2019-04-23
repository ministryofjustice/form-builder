# Repeatable pages and components

Lets a user add information about another instance of something the service is asking for.

eg.

- Add a child
- Add another transcript
- Add an address
- Add a phone number


## Repeatable controls

Individual inputs

## Repeatable groupings

## Repeatable pages

The following page types can have repeatable instances.

- [Single question page](/page/pageSingleQuestion)
- [Generic form page](/page/pageForm)

If the page has steps, the flow represented by those steps is also repeated.

## Repeatable component instances

The following components can have repeatable instances

- All individual control components
- [Fieldset](/component/fieldset)
- Group?? (why not?) - *indeed, otherwise what is the purpose of group, other than to group components for a pattern (really?)*

repeatable instances of such components are repeated on the same page.

## Requirement for namespace

The `namespace` property must be be set when `repeatable` is set.

[More about the `namespace` property](namespace)


## Properties for defining repeatable
- `repeatable`

  Whether the block is repeatable
- `repeatableMinimum`

  The minimum number of instances

  By default, 1
- `repeatableMaximum`

  The maximum number of instances
- `repeatableAdd`

  Custom text to use for any add button
- `repeatableDelete`

  Custom text to use for any delete button

## Additional repeatable-related properties
- `repeatableSummary`

  *TODO: could this not just be achieved by explicitly adding a summary page?*
- `repeatableAddLocation`

  *TODO: figure out how many pattern variants we might support - is it greater than 1?*



[See repeatable properties definition](/definition/repeatable)



<!--
Some services allow citizens to provide details of an arbitrary number of relevant entitiies, e.g. children. 

**What this could look like**
A syntax in the JSON schema that allows "add another/now I'm finished"
-->
<!--
If a question asks a citizen if they have a certain number of something, then a user journey is repeated as many times as required. E.g. A question asks how many children the user has then a the next x number of screens are repeated as many times as necessary (e.g. finding out details about all of the children).
-->