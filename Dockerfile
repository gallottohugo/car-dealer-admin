FROM node:lts

WORKDIR /app
COPY . .

RUN npx prisma generate

RUN npm install --production
CMD ["npm", "run", "start:prod"]
