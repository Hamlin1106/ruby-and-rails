# Stage 1: Rubyをビルドするためのベースイメージ
FROM ruby:3.3.4-slim-bullseye AS ruby-build

# 必要なパッケージをインストール
RUN apt-get update && \
    apt-get install -y build-essential libffi-dev libgmp-dev zlib1g-dev libyaml-dev


#FROM node:20.11-alpine
FROM node:20-bullseye-slim

#RUN apk update && apk add bash
RUN apt-get update && \
    apt-get install -y bash build-essential libffi-dev libgmp-dev zlib1g libyaml-dev


# ruby-buildステージからビルド済みのRubyをコピー
COPY --from=ruby-build /usr/local /usr/local
# Bundlerをインストール
RUN gem install bundler

WORKDIR /app/

# GemfileとGemfile.lockをコピーして、bundle installを実行
COPY Gemfile Gemfile.lock ./
RUN bundle install

# COPY ./package.json ./
# RUN npm install
# Copy package.json and pnpm-lock.yaml
COPY pnpm-lock.yaml package.json ./
# Install app dependencies using PNPM
RUN npm install -g pnpm
# Install dependencies
RUN pnpm i 
# Copy the application code 
#COPY . .

# # Build the TypeScript code
# RUN pnpm run build
# # Start the application
# CMD ["pnpm", "start"]
