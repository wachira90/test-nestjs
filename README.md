<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


FROM node:20.9.0-bullseye-slim AS builder
WORKDIR /app
COPY package.json .
ARG BUILD_ENV=test
RUN npm install
COPY . .
RUN npm run build:${BUILD_ENV}
FROM nginx:1.25.1
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/app-deploy
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


----------------------------

docker build -t wachiradu/cache:webtrade-v1 . --build-arg BUILD_ENV=test


FROM public.ecr.aws/docker/library/node:20.9.0-bullseye-slim
WORKDIR /app
COPY package.json .
ARG BUILD_ENV=test
RUN yarn install




docker build -t wachiradu/cache:webtrade-v2 . --build-arg BUILD_ENV=dev

FROM docker.io/wachiradu/cache:webtrade-v1 AS builder
COPY . .
RUN yarn build:${BUILD_ENV}
FROM public.ecr.aws/nginx/nginx:1.25.3
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

----------------------------


docker build -t wachiradu/cache:webtrade-v2 . --build-arg BUILD_ENV=uat

docker run -it --name www1 -p 8001:80  wachiradu/cache:webtrade-v2

docker run -it --name www1 -p 8001:80  -d wachiradu/cache:webtrade-v2
docker build -t wachiradu/test:nestjs-v1 .

docker run -it --name www1 -p 8001:3000 wachiradu/test:nestjs-v1

events {
}
http {
    server {
        listen 80;
        listen [::]:80;
        root /usr/share/app;
        include /etc/nginx/mime.types;
        index index.html;
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}

docker build -t test:dev0.1 . --build-arg BUILD_ENV=test
docker.io/library/test:dev0.1

docker build -t test:dev0.2 . -f Dockerfile-2.txt
