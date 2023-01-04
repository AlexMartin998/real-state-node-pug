FROM node:18-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm i -g pnpm

RUN pnpm install

CMD [ "pnpm", "start"]

