<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install

$ yarn install

$ npm run build

$ yarn build
```

## Running the app

```bash
# development
$ npm run start

$ yarn start

# watch mode
$ npm run start:dev

$ yarn start:dev

# production mode
$ npm run start:prod

$ yarn start:prod
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

## Dockerfile

```
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
```

----------------------------

docker build -t wachiradu/cache:webtrade-v1 . --build-arg BUILD_ENV=test

```
FROM public.ecr.aws/docker/library/node:20.9.0-bullseye-slim
WORKDIR /app
COPY package.json .
ARG BUILD_ENV=test
RUN yarn install
```

docker build -t wachiradu/cache:webtrade-v2 . --build-arg BUILD_ENV=dev

```
FROM docker.io/wachiradu/cache:webtrade-v1 AS builder
COPY . .
RUN yarn build:${BUILD_ENV}
FROM public.ecr.aws/nginx/nginx:1.25.3
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
----------------------------


docker build -t wachiradu/cache:webtrade-v2 . --build-arg BUILD_ENV=uat

docker run -it --name www1 -p 8001:80  wachiradu/cache:webtrade-v2

docker run -it --name www1 -p 8001:80  -d wachiradu/cache:webtrade-v2
docker build -t wachiradu/test:nestjs-v1 .

docker run -it --name www1 -p 8001:3000 wachiradu/test:nestjs-v1

## nginx config

```
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
```

docker build -t test:dev0.1 . --build-arg BUILD_ENV=test
docker.io/library/test:dev0.1

docker build -t test:dev0.2 . -f Dockerfile-2.txt
