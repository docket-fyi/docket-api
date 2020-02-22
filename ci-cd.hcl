# See https://www.vaultproject.io/guides/identity/authentication/

path "auth/approle/login" {
  capabilities = ["create", "read"]
}

path "kv/*" {
  capabilities = ["read"]
}
