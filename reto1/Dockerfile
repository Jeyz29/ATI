FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

ENV TZ=America/Caracas 

RUN apt-get update && \
    apt-get install -y apache2 tzdata && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY . /var/www/html/


EXPOSE 80

CMD ["apache2ctl", "-D", "FOREGROUND"]