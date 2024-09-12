FROM node:lts-alpine
WORKDIR /app
RUN npm install -g ts-node@9.1.1
RUN npm install -g db-migrate@0.11.13
COPY package.json .
COPY database.json .
COPY tsconfig.json .
RUN apk add tzdata && ln -s /usr/share/zoneinfo/Asia/Tashkent /etc/localtime
COPY . .
CMD [ "npm", "start" ]