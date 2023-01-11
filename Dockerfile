FROM node:lts

WORKDIR /app
COPY . .

RUN npm install --production
CMD ["npm", "run", "start:prod"]
