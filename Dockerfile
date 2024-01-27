FROM public.ecr.aws/docker/library/node:16.14.0-slim 
WORKDIR /app

# COPY package.json .
# COPY package-lock.json .

COPY . .

# ARG BUILD_ENV=test

RUN yarn install
RUN yarn build 

EXPOSE 3000
CMD ["yarn", "start"]

# docker build -t wachiradu/test:nestjs-v1 .