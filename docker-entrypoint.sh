#! /bin/sh

set -e

# Note that the Postgres image will attempt to create the database if
# given the POSTGRES_DB environment variable.
# echo "⏱  Creating database..."
# npx sequelize db:create
# echo "✅ Done."

echo "⏱  Migrating database..."
npx sequelize db:migrate
echo "✅ Done."

# Uncomment the following if you'd like the database to always be seeded.
# echo "⏱  Seeding database..."
# npx sequelize db:seed:all
# echo "✅ Done."

exec "$@"
