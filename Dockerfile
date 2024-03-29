FROM node:19-alpine as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . . 

RUN npm run build 

CMD ["node", "build/src/index.js"]