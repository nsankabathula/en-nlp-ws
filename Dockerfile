FROM node:9.11.1

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8000

CMD ["npm", "start"]

