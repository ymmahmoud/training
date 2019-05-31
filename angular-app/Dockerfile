FROM node:lts
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
RUN mkdir -p /usr/src/app
RUN chown node /usr/src/app
USER node
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
RUN npm rebuild node-sass
RUN npm install -g @angular/cli
COPY . /usr/src/app/
EXPOSE 4200 49153
CMD ["npm","start"]