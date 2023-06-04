FROM node:16-alpine
WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

COPY ./dist .dist

CMD ["npm", "run", "start:dev"]
