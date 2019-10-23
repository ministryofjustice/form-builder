# Form Updates

## Updating the Runner version with kubectl

Currently forms will not use the latest version of the [Runner](https://github.com/ministryofjustice/fb-runner-node) until they are manually re-deployed by the form owner.

This poses a challenge when rolling out new functionality or applying security patches.
The long term goal is to have all forms use the latest version of the Runner as soon as we release it.

For the time being, if all forms need to be updated to use the latest Runner code, this command can be run:

```bash
kubectl rollout restart deployments -n formbuilder-services-[env]
```

This will not update the actual form JSON (if a new release was pushed to Github), so there is no risk of publishing draft form features.

*env can be any of the 9 environments like test-dev*

## Viewing all Runner versions for a namespace

```bash
#!/bin/bash
current_env="test-dev"

pods=$(kubectl get --no-headers pods  -n formbuilder-services-$current_env -o custom-columns=:metadata.name)

for pod in $pods
do
    runner_version=$(kubectl exec $pod -n formbuilder-services-$current_env -- cat APP_SHA)
    result=$runner_version
    result+=" -> "
    result+=$(echo $pod)
    echo $result
done
```
