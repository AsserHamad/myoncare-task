FROM node:latest

WORKDIR /app/
RUN npm install serve -g
COPY ./package.json ./
RUN yarn
COPY . .
RUN yarn build
CMD [ "serve", "-s", "build" ]