FROM multiarch/qemu-user-static:aarch64 as qemu

FROM arm64v8/debian:buster-slim
LABEL maintainer="Yuji Kiriki <yujikiriki@protonmail.com>"

COPY --from=qemu /usr/bin/qemu-aarch64-static /usr/bin/qemu-aarch64-static

RUN apt-get update && apt-get install -y --no-install-recommends \
      wget \
      ca-certificates \
      gnupg \
      dirmngr \
      unzip \
      procps \
    && rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/AdoptOpenJDK/openjdk8-binaries/releases/download/jdk8u242-b08/OpenJDK8U-jdk_aarch64_linux_hotspot_jdk8u242-b08.tar.gz && \
      tar -zxvf OpenJDK8U-jdk_aarch64_linux_hotspot_jdk8u242-b08.tar.gz && \
      ln -s /jdk8u242-b08/bin/java /usr/bin/java && \
      rm OpenJDK8U-jdk_aarch64_linux_hotspot_jdk8u242-b08.tar.gz && \
      echo $(java -version)

RUN mkdir -p /usr/share/man/man1 && \
      mkdir -p /tmp/build && \
      cd /tmp/build && \
      wget http://dl-origin.ubnt.com/unifi/5.13.10-202b4c03d0/UniFi.unix.zip && \
      unzip -q UniFi.unix.zip -d /usr/lib/ && \
      mv /usr/lib/UniFi /usr/lib/unifi && \
      rm -rf /var/lib/apt/lists/* && \
      rm -rf /tmp/build

RUN ln -s /var/lib/unifi /usr/lib/unifi/data
WORKDIR /var/lib/unifi
ENV JAVA_OPTS -Xmx512M

COPY system.properties /var/lib/unifi/system.properties
COPY entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 8080/tcp 8443/tcp 8843/tcp 8880/tcp 3478/udp
CMD ["start"]
