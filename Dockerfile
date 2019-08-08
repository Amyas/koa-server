FROM node

WORKDIR /app

ADD ./package.json /app/

RUN npm install --registry=https://registry.npm.taobao.org

ADD . /app

EXPOSE 3744

ENV NODE_ENV production

CMD npm start