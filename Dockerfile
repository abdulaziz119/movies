FROM node:lts-alpine3.19 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm cache clear --force
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:lts-alpine3.19

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

CMD ["node", "dist/app.js"]