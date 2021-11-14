FROM node:16-alpine

WORKDIR /usr/src/aTES
RUN mkdir apps

WORKDIR /usr/src/aTES/apps/sso-api
CMD yarn start:dev