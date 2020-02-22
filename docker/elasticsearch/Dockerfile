FROM elasticsearch:7.5.2
COPY docker-healthcheck-elasticsearch /usr/local/bin/

# A free-to-use tool that scans container images for package vulnerabilities.
# See https://github.com/aquasecurity/microscanner
# ADD https://get.aquasec.com/microscanner /
# RUN chmod +x /microscanner
# RUN /microscanner N2JlNzQzY2VmNmM1

HEALTHCHECK CMD docker-healthcheck-elasticsearch
