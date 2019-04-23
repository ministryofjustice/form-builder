# Submitting user data

Once a user’s data has been collected and the user has confirmed that the data is correct, urls representing the required output of the data and any uploaded files are sent to the submitter api


## Default output

### Send copy to user

In order to send a copy to the user, there must be an email address to send to:

- If a value has been defined in the service configuration for `emailInputNameUser`, the value entered for the control with that name is used as the user’s email address
- Otherwise, if a control named `email` exists, the value for that is used

#### Outputs
- Email message
  - `/api/submitter/email/user`
- PDF output
  - `/api/submitter/pdf/default/:submissionId.pdf`

### Send application to service team via email

In order to send the data to the service team, there must be an email address to send to. This address is set through the Publisher as a config param `SERVICE_OUTPUT_EMAIL`

#### Outputs
- Email message
  - `/api/submitter/email/team`
- PDF output
  - `/api/submitter/pdf/default/:submissionId.pdf`
- JSON (TODO)
- CSV (TODO)


## Output specification

In future, it will be possible to define alternative outputs

TODO: output specification


## Form Builder Submitter

The [Submitter](https://github.com/ministryofjustice/fb-submitter) is an app that provides an API and workers for dealing with a form’s submissions.


## Submitter API

- [Submitter API](submitter--api.md)

