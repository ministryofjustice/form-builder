## formbuilder-publisher-{platformEnv} namespace

### fb-publisher-web-{platformEnv} pod
- Rails
- *public-facing website for editing service data*
- In-bound
  - access controlled by `Auth0`
  - credentials stored in `fb-publisher-app-secrets-{platformEnv}`
- Out-bound
  - read/write to `publisher-rds-instance` to update services
  - write to `publisher-elasticache` (via resque)

### fb-publisher-workers-{platformEnv} pod
- Resque
- *internal queue/job manager for deploying services*
- Out-bound
  - read `publisher-rds-instance`
  - read/write to `publisher-elasticache`
  - write service token secrets to `formbuilder-services-{platformEnv}-{deploymentEnv}` namespaces
  - create deployments in `formbuilder-services-{platformEnv}-{deploymentEnv}` namespaces

### publisher-rds-instance module
- Postgres
- *Services data*
- In-bound
  - `url` with username/password from `rds-instance-formbuilder-publisher-{platformEnv}`
  - access only allowed to `fb-publisher-web` and `fb-publisher-workers`

### publisher-elasticache module
- Redis
- *Service deployment jobs*
- In-bound
  - `primary_endpoint_address` and `auth_token` from `elasticache-formbuilder-publisher-{platformEnv}`
  - access only allowed to `fb-publisher-web` and `fb-publisher-workers`


## formbuilder-platform-{platformEnv}-{deploymentEnv} namespace

### fb-service-token-cache-{platformEnv}-{deploymentEnv} pod
- Rails
- *internal API to get service tokens*
- In-bound
  - ingress rule allows access only to pods in same namespace labelled `fb-service-token-cache-access: "true"`
    - fb-user-datastore-api
    - fb-user-filestore-api
    - fb-submitter-api (except that's not true)
- Out-bound
  - read service token secrets in `formbuilder-services-{platformEnv}-{deploymentEnv}` namespace
  - read/write to `service-token-cache-elasticache`

### service-token-cache-elasticache module
- Redis
- *Service tokens*
- In-bound
  - `primary_endpoint_address` and `auth_token` from `elasticache-formbuilder-service-token-cache-{platformEnv}-{deploymentEnv}`
  - access only allowed to `fb-service-token-cache-{platformEnv}-{deploymentEnv}`
- Storage
  - all data stored against service_slug key, as-is

### fb-user-datastore-api-{platformEnv}-{deploymentEnv} pod
- Rails
- *internal API to get/set user data*
- In-bound
  - ingress rules allow access only to pods in `formbuilder-services-{platformEnv}-{deploymentEnv}` namespace
  - all ingress must be
    - for a specific user and service  
      `/service/:serviceSlug/user/:userId`
    - accompanied with a JSON Web Token
      - signed with that service's service token
      - containing an iat timestamp
- API
  - GET `/service/:serviceSlug/user/:userId`
  - POST `/service/:serviceSlug/user/:userId`
    - Body 
      ```json
      {
        "payload": "{payload_encrypted_with_user_token}"
      }
      ```
- Out-bound
  - read from `fb-service-token-cache-{platformEnv}-{deploymentEnv}` for service tokens
  - read/write to `user-datastore-rds-instance` to update user data
- Storage
  - all data stored against user_id key, pre-encrypted

### user-datastore-rds-instance module
- Postgres
- *User data*
- In-bound
  - `url` with username/password from `rds-instance-formbuilder-user-datastore-{platformEnv}-{deploymentEnv}`
  - access only allowed to `fb-user-datastore-api-{platformEnv}-{deploymentEnv}`


### fb-submitter-api-{platformEnv}-{deploymentEnv}
- Rails
- *Submissions*
- In-bound
  - ingress rules allow access only to pods in `formbuilder-services-{platformEnv}-{deploymentEnv}` namespace
- Out-bound
  - read from `fb-service-token-cache-{platformEnv}-{deploymentEnv}` for service tokens
  - read/write `submitter-rds-instance`
  - write to `publisher-elasticache`

### fb-submitter-workers-{platformEnv}-{deploymentEnv}
- *internal queue/job manager for submissions*
- In-bound
- Out-bound
  - read `submitter-rds-instance`
  - read/write to `publisher-elasticache`
  - access individual service output API in `formbuilder-services-{platformEnv}-{deploymentEnv}` namespace
  - create deployments in `formbuilder-services-{platformEnv}-{deploymentEnv}` namespaces

### submitter-rds-instance module
- Postgres
- *Submissions data*
- In-bound
  - `url` with username/password from `rds-instance-formbuilder-submitter-{platformEnv}-{deploymentEnv}`
  - access only allowed to `fb-submitter-api` and `fb-submitter-workers`

### submitter-elasticache module
- Redis
- *Submissions jobs*
- In-bound
  - `primary_endpoint_address` and `auth_token` from `elasticache-formbuilder-submitter-{platformEnv}-{deploymentEnv}`
  - access only allowed to `fb-submitter-api` and `fb-submitter-workers`

## formbuilder-services-{platformEnv}-{deploymentEnv}

- ServiceAccounts
  - `fb-publisher-workers-{platformEnv}` in `formbuilder-publisher-{platformEnv}`namespace - allows deployments
  - `formbuilder-service-token-cache-{platformEnv}-{deploymentEnv}` in `formbuilder-platform-{platformEnv}-{deploymentEnv}` namespace - allows service tokens to be read
- In-bound
  - citizen
    - WHAT DOES THE COOKIE LOOK LIKE?
- Out-bound
  - read/write to `fb-user-datastore-api-{platformEnv}-{deploymentEnv}`
  - write to `fb-user-filestore-api-{platformEnv}-{deploymentEnv}`
  - write to `fb-submitter-api-{platformEnv}-{deploymentEnv}`



Additionally all publisher and platform apps are rails app which have a secret_key_base