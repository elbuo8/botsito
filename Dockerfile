FROM node:7.4-alpine
MAINTAINER @elbuo8
LABEL name="preceptor"

RUN mkdir /app
WORKDIR /app

RUN npm i -g yarn

COPY package.json yarn.lock /app/
RUN yarn install --production

COPY . /app

EXPOSE 8080
CMD ["npm", "start"]
