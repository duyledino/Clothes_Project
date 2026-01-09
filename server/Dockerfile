# dockerfile server

from node:22-alpine

WORKDIR /app

copy package*.json ./

run npm install

copy . .

run npx prisma generate

expose 3500

cmd ["npm","run","server"]