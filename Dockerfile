FROM node:12.10.0

# Updates packages and install curl and jq.
RUN apt-get update && apt-get install -y jq curl

# Creates and modifies directory for Filebeat logs.
# RUN mkdir /var/log/docket-api
# RUN chmod 0700 /var/log/docket-api
# RUN chown node:node /var/log/docket-api

# Installs and runs Filebeat.
# RUN curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.2.1-linux-x86_64.tar.gz
# RUN tar xzvf filebeat-7.2.1-linux-x86_64.tar.gz
# WORKDIR /filebeat-7.2.1-linux-x86_64
# COPY ./filebeat.yml .
# RUN sudo chown root filebeat.yml
# RUN ./filebeat setup
# RUN ./filebeat -e &

WORKDIR /docket/docket-api

# NB: .dockerignore influences what gets copied
COPY . .

# A free-to-use tool that scans container images for package vulnerabilities.
# See https://github.com/aquasecurity/microscanner
# ADD https://get.aquasec.com/microscanner /
# RUN chmod +x /microscanner
# RUN /microscanner N2JlNzQzY2VmNmM1

# Installs dependencies.
RUN npm ci

# Copies and registers healthcheck script.
COPY docker-healthcheck /usr/local/bin/
HEALTHCHECK --interval=60s --timeout=10s --retries=3 CMD docker-healthcheck
