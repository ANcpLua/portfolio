# Angular 22 needs Node ^22.22.3 || ^24.15.0 || >=26. Railway's nixpacks only ships
# older patches (22.19 / 24.10), so build on the official node:24 image instead
# (latest 24.x, >= 24.15) for a Node version the Angular CLI accepts.
FROM node:24-slim@sha256:b31e7a42fdf8b8aa5f5ed477c72d694301273f1069c5a2f71d53c6482e99a2fc AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-slim@sha256:b31e7a42fdf8b8aa5f5ed477c72d694301273f1069c5a2f71d53c6482e99a2fc AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
# Railway injects PORT; server.ts reads process.env.PORT (falls back to 4000).
CMD ["node", "dist/portfolio/server/server.mjs"]
