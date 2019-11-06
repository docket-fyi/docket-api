FROM elasticsearch:7.2.0
COPY docker-healthcheck-elasticsearch /usr/local/bin/
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
# RUN /microscanner N2JlNzQzY2VmNmM1
HEALTHCHECK CMD docker-healthcheck-elasticsearch
