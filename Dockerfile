FROM node:alpine

COPY . /opt/illumination

WORKDIR /opt/illumination

RUN npm install

CMD npm start
