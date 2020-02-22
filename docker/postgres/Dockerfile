FROM postgres:11.5

# Copies and registers healthcheck script.
COPY docker-healthcheck-postgres /usr/local/bin/
HEALTHCHECK CMD docker-healthcheck-postgres

# Updates packages and install curl.
RUN apt-get update && apt-get install -y curl

# Copies additional initialization scripts to the image.
# See https://github.com/docker-library/docs/tree/master/postgres#initialization-scripts
COPY docker-entrypoint-initdb.d /docker-entrypoint-initdb.d

# RUN mkdir /var/log/postgresql
RUN chmod 0700 /var/log/postgresql
RUN chown postgres:postgres /var/log/postgresql

# Installs and runs Filebeat.
# RUN curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.5.2-linux-x86_64.tar.gz
# RUN tar xzvf filebeat-7.5.2-linux-x86_64.tar.gz
# WORKDIR /filebeat-7.5.2-linux-x86_64
# COPY ./filebeat.yml .
# RUN ./filebeat modules enable postgresql
# # Changes file & directory owner because Postgres initialization scripts
# # (e.g., 01-filebeat.sh) are run as the postgres user, but the unzipped
# # files & directories are owned by the root user.
# # See https://github.com/docker-library/docs/tree/master/postgres#initialization-scripts
# RUN chown -R postgres:postgres *

# A free-to-use tool that scans container images for package vulnerabilities.
# See https://github.com/aquasecurity/microscanner
# ADD https://get.aquasec.com/microscanner /
# RUN chmod +x /microscanner
# RUN /microscanner N2JlNzQzY2VmNmM1
