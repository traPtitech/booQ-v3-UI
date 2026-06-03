FROM node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293 as build
RUN apk add --update --no-cache openjdk11-jre-headless
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./scripts ./scripts
RUN npm run gen-api

COPY . .
RUN NODE_ENV=production npm run build


FROM caddy:2.4.3-alpine@sha256:84528d666c0c04cecbf4164f13c07dcf40626436788cd63a70c4b1dfbb4dec12
EXPOSE 80
COPY build/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /usr/share/caddy
