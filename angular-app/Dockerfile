FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
RUN npm rebuild node-sass
RUN npm install -g @angular/cli
COPY . /usr/src/app/
EXPOSE 4200 49153
CMD ["npm","start"]