FROM node:10.1.0

RUN mkdir -p /app
WORKDIR /app

ADD package.json /app/package.json
RUN yarn
ADD src/. /app/src
ADD public/. /app/public

EXPOSE 5000

CMD CHOKIDAR_USEPOLLING=true yarn start