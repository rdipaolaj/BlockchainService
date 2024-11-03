# Etapa de construcción: usa node:18-bullseye para construir la aplicación
FROM node:18-bullseye as builder

# Instalar Rust, Cargo y libudev (si son necesarios para tu proyecto)
RUN apt-get update && apt-get install -y curl libudev1 && \
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
    export PATH="$HOME/.cargo/bin:$PATH"

# Crear el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias usando `npm ci` para un entorno de construcción más confiable
RUN npm ci

# Copiar el resto de los archivos al directorio de trabajo
COPY . .

# Temporal: listar archivos en /app/src para depuración y asegurar que todo se copia correctamente
RUN ls -R /app/src

# Ejecutar la compilación de TypeScript a JavaScript
RUN npm run build

# Etapa final: crear una imagen ligera solo con lo necesario para ejecutar el código
FROM node:18-slim

# Configuración de entorno de trabajo
WORKDIR /app

# Instalar las dependencias necesarias para ejecutar el SDK de IOTA
RUN apt-get update && apt-get install -y libudev1 libc6 && rm -rf /var/lib/apt/lists/*

# Copiar dependencias de producción desde la etapa de construcción
COPY --from=builder /app/node_modules ./node_modules

# Copiar los archivos de construcción al directorio de trabajo
COPY --from=builder /app/dist ./dist

# Configuración de entorno
ENV NODE_ENV=production

# Exponer el puerto 5000
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]
