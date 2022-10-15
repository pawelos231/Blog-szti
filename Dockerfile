#base image
FROM node:16-alpine

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY ./ ./

RUN npm install --force
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
#this file is currently udergoing some changes, it will work in the future