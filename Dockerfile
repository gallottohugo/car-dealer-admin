# Build application
ARG NODE_IMAGE=node:16.17.0-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init ca-certificates
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node:node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node . .

FROM dependencies AS migrations
RUN npx prisma migrate deploy

FROM dependencies AS build
RUN npm run build


FROM base AS production
ENV NODE_ENV=production
ENV PORT=3000
COPY --chown=node:node --from=build /home/node/app/dist .
CMD ["node", "dist/app.js"]
