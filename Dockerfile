# https://hackernoon.com/using-yarn-with-docker-c116ad289d56#.ubp7difny

FROM node:7.2

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN mkdir -p /usr/src/app

ADD package.json yarn.lock node_modules ./
RUN ["/bin/bash", "-c", "/root/.yarn/bin/yarn", "install", "--pure-lockfile"]

ADD . ./
