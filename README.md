# Docket API

[![Build Status](https://travis-ci.org/docket-fyi/docket-api.svg?branch=develop)](https://travis-ci.org/docket-fyi/docket-api)
[![Test Coverage](https://api.codeclimate.com/v1/badges/be2ba1df06beee8af83c/test_coverage)](https://codeclimate.com/github/docket-fyi/docket-api/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/be2ba1df06beee8af83c/maintainability)](https://codeclimate.com/github/docket-fyi/docket-api/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/docket-fyi/docket-api/badge.svg?branch=develop)](https://coveralls.io/github/docket-fyi/docket-api?branch=develop)
[![David DM](https://david-dm.org/docket-fyi/docket-api.svg)](https://david-dm.org)
[![Known Vulnerabilities](https://snyk.io/test/github/docket-fyi/docket-api/badge.svg)](https://snyk.io/test/github/docket-fyi/docket-api)
[![Greenkeeper badge](https://badges.greenkeeper.io/docket-fyi/docket-api.svg)](https://greenkeeper.io/)
[![CircleCI](https://circleci.com/gh/docket-fyi/docket-api/tree/develop.svg?style=svg)](https://circleci.com/gh/docket-fyi/docket-api/tree/develop)

## Google

### References

1. https://developers.google.com/calendar/v3/reference/
1. https://apis-nodejs.firebaseapp.com/calendar/index.html

## Microsoft

### References

1. https://docs.microsoft.com/en-us/outlook/rest/node-tutorial
1. https://apps.dev.microsoft.com
1. https://docs.microsoft.com/en-us/azure/active-directory/develop/authentication-scenarios
1. https://docs.microsoft.com/en-us/graph/api/resources/calendar?view=graph-rest-1.0

## Stripe

### References

1. https://stripe.com/docs/api

## Vault

### References

1. https://www.linode.com/docs/applications/configuration-management/use-hashicorp-vault-for-secret-management/
1. http://taswar.zeytinsoft.com/using-hashicorp-vault-for-nodejs-application-to-store-secrets/
1. https://github.com/kr1sp1n/node-vault/tree/c1d91b9973c0f02256112bed02cf8c4c7c5d5a31

### Setup

```
# Bring up the Vault container
docker-compose -f docker-compose.local.yml -f docker-compose.yml up -d docket-vault

# Shell into the Vault container
docker exec -it $(docker ps -q -f "name=docket-vault") sh

# Initialize and unseal Vault
VAULT_ADDR=http://127.0.0.1:8200 vault operator init -key-shares=1 -key-threshold=1
VAULT_ADDR=http://127.0.0.1:8200 vault operator unseal
VAULT_ADDR=http://127.0.0.1:8200 vault login

# Enable the userpass auth method and create a user
VAULT_ADDR=http://127.0.0.1:8200 vault auth enable userpass
VAULT_ADDR=http://127.0.0.1:8200 vault write auth/userpass/users/john.goldsmith password=Abc123123!

# Enable the KV v1 secrets engine
VAULT_ADDR=http://127.0.0.1:8200 vault secrets enable -version=1 kv

# Enable the approle secrets engine
# See https://www.vaultproject.io/docs/auth/approle.html
VAULT_ADDR=http://127.0.0.1:8200 vault auth enable approle

# Create a new role
VAULT_ADDR=http://127.0.0.1:8200 vault write auth/approle/role/docket-api secret_id_ttl=10m token_num_uses=10 token_ttl=20m token_max_ttl=30m secret_id_num_uses=40
VAULT_ADDR=http://127.0.0.1:8200 vault write auth/approle/role/docket-api bind_secret_id=false secret_id_bound_cidrs=127.0.0.1/24

# Get the role ID
VAULT_ADDR=http://127.0.0.1:8200 vault read auth/approle/role/docket-api/role-id

# Create a token
VAULT_ADDR=http://127.0.0.1:8200 vault token create -orphan=true -policy=default -role=test

# Wrap role secret ID
VAULT_ADDR=http://127.0.0.1:8200 vault write -f -wrap-ttl=60s auth/approle/role/docket-api/secret-id
```

## Elasticsearch

### References

1. https://blog.logrocket.com/full-text-search-with-node-js-and-elasticsearch-on-docker/
1. https://elasticsearch-cheatsheet.jolicode.com/
1. https://www.sitepoint.com/search-engine-node-elasticsearch/
1. https://www.compose.com/articles/getting-started-with-elasticsearch-and-node/

## Competitors

1. [Memento](https://www.getmemento.ca/)
1. [Any.do](https://www.any.do/reminders/)
1. [Todoist](https://todoist.com)
1. [iOS Reminders]()
