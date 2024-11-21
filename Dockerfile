# Usa una imagen base oficial de Node.js
FROM node:20.17.0

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Compila el código TypeScript a JavaScript
#RUN tsc

RUN npx tsc


# Expone el puerto en el que tu aplicación va a correr
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "start"]