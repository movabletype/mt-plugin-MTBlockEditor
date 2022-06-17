ARG NODE
FROM node:$NODE

RUN apt-get update \ 
    && apt-get install --no-install-recommends -y \
        libjson-perl libyaml-perl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
