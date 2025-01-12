FROM node:18.20.2-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@10.5.0

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start:prod" ]
