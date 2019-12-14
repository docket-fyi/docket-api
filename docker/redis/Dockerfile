FROM redis:5.0.3
COPY docker-healthcheck-redis /usr/local/bin/
COPY ./redis.conf /usr/local/etc/redis/redis.conf
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
# RUN /microscanner N2JlNzQzY2VmNmM1
HEALTHCHECK CMD docker-healthcheck-redis
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
