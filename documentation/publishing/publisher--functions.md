# FB Publisher functionality

##  Deployment functions

### Build service
- Build a docker image for the given service, push it to the service container repository (SCR)
  - Inputs
    - Runner app image id:tag
    - Service JSON git repo:commit
    - Service config / env vars
    - SCR URL
    - SCR creds
  - Outputs
    - Tagged docker image ID for the service

### Deploy a new service
- Deploy a built service docker image:tag from the service container repository to the Hosting
- Configure routing of URL to the service
  - Inputs
    - Service image id:tag
  - Outputs
    - A running service

### Deploy a specific (newer/older) version of an existing service
- Deploy a built service docker image:tag from the service container repository to the Hosting
- Manage smooth transition between previous version and newly-deployed version
  - Inputs
    - Service image id:tag
  - Outputs
    - A running service

### Un-deploy a service
- Stop the service URL routing to the running service
- Show a holding page (optionally) with a custom message
- Stop the service running
  - Inputs
    - Service identifier
    - (optional) holding page message
  - Outputs
    - (optional) a custom holding page
			
### Apply environment variables to a service
- Restart the service with updated environment variables
  - Inputs
    - Environment variables & values
  - Outputs
    - Restarted service container(s) with new environment variables

## Admin functions

### Build runner image 
- Build a new version of the runner app image
  - Inputs
    - Runner app github repo:commit
    - Runner app tag to apply
    - SCR URL
    - SCR creds
  - Outputs
    - Tagged docker image ID for the service

## Hosting functions

- Routing of URLs to services
- Monitoring of services
- Provisioning underlying resources
- Allocating permissions / roles to services & resources
- Service discovery (for backing services e.g. - data storage)
- Autoscaling up & down in response to load
- Restarting failed services
- Not restarting explicitly-stopped services
