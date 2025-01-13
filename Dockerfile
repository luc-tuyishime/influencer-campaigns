FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

EXPOSE ${PORT}

ENV MONGO_URL=${MONGO_URL} \
    JWT_SECRET=${JWT_SECRET} \
    JWT_EXPIRES_IN=${JWT_EXPIRES_IN} \
    NODE_ENV=${NODE_ENV} \
    PORT=${PORT}

CMD ["npm", "run", "start:prod"]
