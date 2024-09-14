FROM node:alpine AS build
RUN corepack enable
WORKDIR /project
COPY ./pnpm-lock.yaml ./package.json .
RUN pnpm fetch
COPY . .
RUN pnpm i --frozen-lockfile --offline
RUN pnpm build
RUN pnpm prune --prod

FROM node:alpine AS run
USER node
WORKDIR /app
COPY --from=build /project/node_modules /app/node_modules
COPY --from=build /project/build /app/build
COPY ./public /app/public
COPY ./package.json ./package.json
CMD [ "npm", "start" ]
