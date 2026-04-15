# ETAPA 1: Build de Angular

FROM node:24-bookworm-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --configuration production


# ETAPA 2: Servidor Nginx
FROM nginx:stable-alpine


COPY --from=build /app/dist/frontend-app/browser /usr/share/nginx/html

RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]