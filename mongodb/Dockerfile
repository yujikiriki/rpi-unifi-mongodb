FROM multiarch/qemu-user-static:aarch64 as qemu

FROM arm64v8/debian:stretch-slim
LABEL maintainer="Yuji Kiriki <yujikiriki@protonmail.com>"

COPY --from=qemu /usr/bin/qemu-aarch64-static /usr/bin/qemu-aarch64-static

RUN groupadd -r mongodb && useradd -r -g mongodb mongodb

RUN apt-get update && apt-get install -y --no-install-recommends \
      wget \
      ca-certificates \
      dirmngr \
      jq \
      numactl \
      procps \
      mongodb \   
    && rm -rf /var/lib/apt/lists/* \
 	&& rm -rf /var/lib/mongodb 
 	# && mv /etc/mongod.conf /etc/mongod.conf.orig

RUN mkdir /docker-entrypoint-initdb.d 

RUN mkdir -p /data/db /data/configdb \
	&& chown -R mongodb:mongodb /data/db /data/configdb

VOLUME /data/db /data/configdb

COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 27017
CMD ["mongod"]
