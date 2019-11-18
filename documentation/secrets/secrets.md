# Managing secrets

Secrets required to run the applications are split into 3 categories.

- [Application](https://user-guide.cloud-platform.service.justice.gov.uk/tasks.html#application-secrets)
- [System](https://user-guide.cloud-platform.service.justice.gov.uk/tasks.html#system-secrets)
- [User](https://user-guide.cloud-platform.service.justice.gov.uk/tasks.html#user-secrets)

This guide is specifically about managing Application secrets with [git-crypt](https://github.com/AGWA/git-crypt).

## Creating new secrets

Create a new private Github repository. These repositories are application specific and follow a naming convention.

For example, an application named `foo-app` would have a corresponding private Github repository called `foo-app-deploy`.

Once this is done, you can proceed to set up git-crypt by following the [Cloud Platform guidance](https://user-guide.cloud-platform.service.justice.gov.uk/tasks.html#git-crypt).

## Getting access to existing secrets

To gain access to existing secrets, you will need to ensure your GPG public key is uploaded to a key server.

Once this has been done, ask a member of your team to add your key to the repository.

More detailed instructions can be found [here](https://user-guide.cloud-platform.service.justice.gov.uk/tasks.html#git-crypt-prerequisites).
