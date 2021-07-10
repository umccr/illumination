FROM node:14-alpine

COPY . /opt/illumination

WORKDIR /opt/illumination

RUN npm install

CMD npm start
