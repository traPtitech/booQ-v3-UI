FROM node:24-alpine AS build
  RUN apk add --update --no-cache openjdk11-jre-headless
  WORKDIR /app

  RUN corepack enable pnpm

  COPY package.json pnpm-lock.yaml ./
  RUN pnpm install --frozen-lockfile

  COPY ./scripts ./scripts
  RUN pnpm gen-api

  COPY . .
  RUN NODE_ENV=production pnpm build