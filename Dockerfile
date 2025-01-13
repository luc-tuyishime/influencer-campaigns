FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

ENV NODE_ENV=production

EXPOSE ${PORT}

CMD ["npm", "run", "start:prod"]
