# Stage 1: Builder (compilación)
FROM node:22-alpine AS builder
WORKDIR /app

RUN node -v
RUN npm -v

# 1. Instalar dependencias (incluyendo devDependencies)
COPY package*.json ./
RUN npm ci --include=dev


# 2. Copiar fuentes y compilar
COPY . .
RUN npm run build
RUN ls -la /app/dist && cat /app/npm-debug.log || true

# Stage 2: Runtime (imagen final optimizada)
FROM node:22-alpine
WORKDIR /app

# 3. Copiar solo lo necesario desde el stage builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# 4. Variables de entorno y limpieza
ENV NODE_ENV=production
ENV AWS_LAMBDA=false

# 5. Ejecutar la aplicación compilada
CMD ["node", "./dist/app.js"]