FROM node:14-alpine
ADD . /appDir
WORKDIR /appDir
COPY package*.json ./
RUN npm cache clean --force && rm -rf node_modules && npm install
CMD ["npm", "start"]
EXPOSE 8080
