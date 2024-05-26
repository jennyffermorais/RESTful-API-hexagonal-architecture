FROM node:18-slim

RUN apt-get update && apt-get install -y nano

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV MYSQL_USER=jm_user \
    MYSQL_PASSWORD=jm_password \
    MYSQL_DATABASE=tech_challenge_BD \
    MYSQL_HOST=mysql-db \
    MYSQL_PORT=3306

EXPOSE 3000

CMD [ "npm", "start" ]
