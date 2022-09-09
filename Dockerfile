FROM node:14

WORKDIR /opt/cafeteria-console-server

COPY . .

RUN npm ci

CMD ["npm", "start"]
