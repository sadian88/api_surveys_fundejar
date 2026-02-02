# Dockerfile para la API NestJS
FROM node:20-alpine AS build

# Instalamos herramientas de construcción para dependencias nativas como bcrypt
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos todas las dependencias incluyendo devDependencies
RUN npm install

# Copiamos el resto del código
COPY . .

# Construimos la aplicación. 
# Importante: tsconfig.build.json debe excluir la carpeta 'src/app' de Angular
RUN npm run build

# --- Etapa de producción ---
FROM node:20-alpine

WORKDIR /usr/src/app

# Copiamos los archivos necesarios desde la etapa de construcción
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist

# Instalamos solo dependencias de producción para minimizar el tamaño
RUN npm install --omit=dev

# Exponemos el puerto
EXPOSE 3000

# Iniciamos la aplicación
CMD ["node", "dist/main.js"]
