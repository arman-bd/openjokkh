FROM node:20

WORKDIR /usr/src/app

COPY ../package*.json ./

RUN npm install

COPY ../src ./src
COPY ../tsconfig.json ./
COPY ../ormconfig.js ./

EXPOSE 8080
CMD ["ts-node", "src/api/app.ts"]
