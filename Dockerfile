# Base image
FROM node:18.20.2-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install npm 10.5.0
RUN npm install -g npm@10.5.0

# Install dependencies
RUN npm install --force

# Bundle app source
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3001

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]
