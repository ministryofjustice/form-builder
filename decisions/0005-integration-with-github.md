# 5 Integration with Github

Date: 2020-03-02

## Status

✅ Accepted

## Context

The decision to use Github, and git itself, as the versioning system for the forms was not recorded at the time so this is in place of that.

The Form Builder platform needs a place to store the JSON metadata that the editor generates. This metadata is used by the Runner Node's in order to create the forms upon deployment.

## Decision

The main reasons for choosing git and Github:

- Transparency. All the forms are published in the open for the public to see.
- Versioning. Git itself is a versioning tool and Github provides a user friendly view into that.
- Collaboration. Github provided a built in approach to collaboration that was felt to be necessary for the future users of the editor.
- It was low effort to integrate on the premise that the initial users of the editor would be either developers or those with some background of git.

## Consequences

- The users of the editor will require an understanding of git and Github.
