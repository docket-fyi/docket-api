FROM vault:1.2.3
RUN apk add curl
COPY docker-healthcheck-vault /usr/local/bin/
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
# RUN /microscanner N2JlNzQzY2VmNmM1
HEALTHCHECK CMD docker-healthcheck-vault
