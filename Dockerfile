# Stage 1: Build the Angular app
FROM node:18 AS build

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copiar los archivos construidos de Angular al contenedor de Nginx
COPY --from=build /app/dist/frontend_challenge /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80
