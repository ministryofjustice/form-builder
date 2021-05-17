# 9. Editor Online

Date: 2021-05-04

## Status

Accepted

## Context

Part of MoJ Online’s toolkit is the Editor. This software allows a user (form owner) to build and test a form. The Editor is actually made up of several pieces of software, but mainly: the Editor and the Console Application.

The Console Application is an electron application which has 3 functions:
* Installs the Editor
* Runs the Editor (previews the form using the runner)
* Creates a github repository

The Editor does not interact with any of the services instead it produces a collection of files which is finally stored into Github. A link to Github is then used by the Publisher to obtain the files and create the form online.

Currently the editor application is managed in the electron console application, each time either you edit a form or create a form the console will start a web server on an unused port and open the editor in the hosts browser. Therefore you could have more than one form editing at the same time. This application is only available for Macs and is signed, notarised and stapled by Apple to run.

It was decided to redesign the Editor to be more self service and to this end the method of storing the form metadata was changed - see [ADR-00?](0007-replacing-the-storage.md).

## Decision

After evaluating the different options and including the direction of the product, it was decided to rebuild the editor using Ruby on Rails and custom javascript for the front end.


## Consequences
* The editor and runner need to develop features that the desktop editor, publisher and runner already have. This is acceptable, as the editor design has changed enough to make the rewriting the editor, combining the publisher and a new runner all using the new meta-data schema the same amount of effort.
* The Form meta-data will not be compatible with between editors/runners. We have 14 forms live in production and a task in the backlog to look at migrating these forms to the new self service editor/publisher.
