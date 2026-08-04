FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist/open ./dist/open
COPY --from=build /app/node_modules ./node_modules
EXPOSE 4000
CMD ["node", "dist/open/server/server.mjs"]
