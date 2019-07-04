
FROM node:10

RUN npm i -g typescript ts-node nodemon

WORKDIR /var/www/app
ADD package.json /var/www/app
ADD yarn.lock /var/www/app
RUN yarn install

ADD . /var/www/app

EXPOSE 3000

#CMD ["docker/start.sh"]