# Imagen base oficial de Node.js 24 (versión ligera Debian)
FROM node:24-bookworm-slim

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero los archivos de dependencias
COPY package*.json ./

# Instalamos solo las dependencias de producción
RUN npm install --omit=dev

# Copiamos el resto del código fuente
COPY . .

# Exponemos el puerto que usa Express
EXPOSE 3000

# Comando para arrancar el servidor
CMD ["node", "index.js"]