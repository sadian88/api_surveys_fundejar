# Dockerfile para la API NestJS
FROM node:20-alpine AS build

# Establecer directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación (NestJS build)
RUN npm run build

# --- Etapa de producción ---
FROM node:20-alpine

WORKDIR /usr/src/app

# Copiar dependencias de producción y la carpeta dist del paso anterior
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Exponer el puerto que usa NestJS (por defecto 3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]
