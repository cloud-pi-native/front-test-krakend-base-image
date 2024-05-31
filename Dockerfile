FROM node:16-slim

USER nobody

WORKDIR /app

COPY server.js package.json ./

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]

