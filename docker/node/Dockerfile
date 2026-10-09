FROM node:24.15.0

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]