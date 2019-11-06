FROM node:12.10.0-slim

WORKDIR /docket/docket-api

# Note that .dockerignore influences what gets copied
COPY . .

# A free-to-use tool that scans container images for package vulnerabilities.
# See https://github.com/aquasecurity/microscanner
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
RUN /microscanner N2JlNzQzY2VmNmM1

RUN npm ci
COPY docker-healthcheck /usr/local/bin/
HEALTHCHECK --interval=60s --timeout=10s --retries=3 CMD docker-healthcheck
