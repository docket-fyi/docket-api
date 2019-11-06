FROM postgres:11.5-alpine
COPY docker-healthcheck-postgres /usr/local/bin/
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
# RUN /microscanner N2JlNzQzY2VmNmM1
HEALTHCHECK CMD docker-healthcheck-postgres
