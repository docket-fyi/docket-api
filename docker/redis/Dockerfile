FROM redis:5.0.7
COPY docker-healthcheck-redis /usr/local/bin/
COPY ./redis.conf /usr/local/etc/redis/redis.conf

# Installs and runs Filebeat.
# RUN curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.5.2-linux-x86_64.tar.gz
# RUN tar xzvf filebeat-7.5.2-linux-x86_64.tar.gz
# WORKDIR /filebeat-7.5.2-linux-x86_64
# COPY ./filebeat.yml .
# RUN ./filebeat modules enable redis

# A free-to-use tool that scans container images for package vulnerabilities.
# See https://github.com/aquasecurity/microscanner
# ADD https://get.aquasec.com/microscanner /
# RUN chmod +x /microscanner
# RUN /microscanner N2JlNzQzY2VmNmM1

HEALTHCHECK CMD docker-healthcheck-redis
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
