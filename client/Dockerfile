FROM node:latest

WORKDIR /app/
RUN npm install serve -g
COPY ./package.json ./
COPY . .
RUN npm install
RUN npm rebuild node-sass
RUN npm run build
CMD [ "serve", "-s", "build" ]