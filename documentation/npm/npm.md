# NPM

You can publish manually to any registry, or automatically to the default NPM registry as the [Form Builder Team](https://www.npmjs.com/~form-builder-team) user.

## Manually publishing to NPM

You will need to be a member of the Ministry of Justice organisation on NPM. You can get access from the Digital Service Desk. (They're on Slack.)

Once you are a member of the organisation you can [publish from the command line](https://docs.npmjs.com/cli/publish).

## Automatically publishing to NPM as the Form Builder Team user

CircleCI is configured to publish to NPM when two conditions are met:

1. A change is made to master
2. The change has Git tag with the version number

The first condition is met whenever a PR is merged to master.

To meet the second condition, at the root of your package and on the branch you want to merge, at the command line execute:

```
npm version patch
git push
```

This will increment the version number in `package.json` and `package-lock.json` (for instance, from `1.0.1` to `1.0.2`), and it will create a Git tag with the same information. When the PR is merged CircleCI will checkout the package from Git, interrogate the tags, and publish the package to NPM. (It won't try to publish if the tag isn't present -- so if you need to make a change to master _without_ publishing, don't execute `npm version patch`.)

To simplify the process -- and any confusion about when to tag -- you can get a PR approved and execute these commands as the very last thing _before_ you merge.

You can also increment the minor or major versions with a similar command:

```
npm version minor
```
Or:
```
npm version major
```
Of course, [you can add tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) without changing the package version, but you should try to keep them syncronised.

### Creating and revoking the NPM Token

The Form Builder Team user is able to publish because CircleCI is configured with an environment variable containing a token from NPM. [You can revoke that token at any time](https://www.npmjs.com/settings/form-builder-team/tokens). 