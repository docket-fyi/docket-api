#!/bin/sh

set -e

# N.B.: The `jq` binary is provided via the Dockerfile.

NODE_ENV="${NODE_ENV:-development}"
API_VERSION="${API_VERSION:-v1}"
VAULT_API_VERSION="${VAULT_API_VERSION:-v1}"
VAULT_PROTOCOL="${VAULT_PROTOCOL:-http}"
VAULT_HOST="${VAULT_HOST:-docket-vault}"
VAULT_PORT="${VAULT_PORT:-8200}"
VAULT_SECRETS_ENGINE_PATH="${VAULT_SECRETS_ENGINE_PATH:-kv}"
VAULT_DATABASE_SECRETS_PATH="${VAULT_DATABASE_SECRETS_PATH:-postgres}"
# VAULT_WRAP_TOKEN="${VAULT_WRAP_TOKEN:-}" // required
# VAULT_APPROLE_ROLE_ID="${VAULT_APPROLE_ROLE_ID:-}" // required
# VAULT_APPROLE_ROLE_NAME="${VAULT_APPROLE_ROLE_NAME:-}" // CI system will need this and a restricted token

# Unwrap token that yields a secret ID for the app role.
VAULT_APPROLE_SECRET_ID=$( \
  curl \
    --silent \
    --header "X-Vault-Token: ${VAULT_WRAP_TOKEN}" \
    --request POST \
      "${VAULT_PROTOCOL}://${VAULT_HOST}:${VAULT_PORT}/${VAULT_API_VERSION}/sys/wrapping/unwrap" \
  | jq -r '.data.secret_id' \
)

# Login via AppRole to be issued a token.
VAULT_TOKEN=$( \
  curl \
    --silent \
    --data '{"role_id": "'$VAULT_APPROLE_ROLE_ID'", "secret_id": "'$VAULT_APPROLE_SECRET_ID'"}' \
    --request POST \
      "${VAULT_PROTOCOL}://${VAULT_HOST}:${VAULT_PORT}/${VAULT_API_VERSION}/auth/approle/login" \
  | jq -r '.auth.client_token' \
)

# Get the database secrets in order to configure Sequelize to run database tasks (see following steps).
DATABASE_VALUES=$(
  curl \
    --silent \
    --header "X-Vault-Token: ${VAULT_TOKEN}" \
    --request GET \
      "${VAULT_PROTOCOL}://${VAULT_HOST}:${VAULT_PORT}/${VAULT_API_VERSION}/${VAULT_SECRETS_ENGINE_PATH}/${NODE_ENV}/${VAULT_DATABASE_SECRETS_PATH}" \
  | jq '.data' \
)

# Extract the individual, unquoted keys from the JSON object.
# See https://github.com/stedolan/jq/issues/354#issuecomment-43147898
# regarding the (undocumented) `// empty` syntax.
DB_PROTOCOL=$(echo $DATABASE_VALUES | jq -r '.DB_PROTOCOL // empty')
DB_USERNAME=$(echo $DATABASE_VALUES | jq -r '.DB_USERNAME // empty')
DB_PASSWORD=$(echo $DATABASE_VALUES | jq -r '.DB_PASSWORD // empty')
DB_HOST=$(echo $DATABASE_VALUES | jq -r '.DB_HOST // empty')
DB_PORT=$(echo $DATABASE_VALUES | jq -r '.DB_PORT // empty')
DB_NAME=$(echo $DATABASE_VALUES | jq -r '.DB_NAME // empty')

echo "Seeding database..."
VAULT_TOKEN=$VAULT_TOKEN npx sequelize db:seed:all \
  --seeders-path "$(pwd)/src/${API_VERSION}/seeders" \
  --url "${DB_PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
echo "Done seeding database."

exit 0
