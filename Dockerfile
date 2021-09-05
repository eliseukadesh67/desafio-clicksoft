FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package.json yarn.* ./

COPY . /home/node/app/

RUN yarn

EXPOSE 3333

CMD ["yarn","dev"]
