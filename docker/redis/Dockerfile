FROM redis:5.0.3
COPY docker-healthcheck-redis /usr/local/bin/
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
# RUN /microscanner N2JlNzQzY2VmNmM1
HEALTHCHECK CMD docker-healthcheck-redis
