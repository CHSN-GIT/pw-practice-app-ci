# cargamos la imagen de playwright equivalente a la de nuestro proyecto
FROM mcr.microsoft.com/playwright:v1.59.1-noble

#creamos la carpeta donde ejecutaremos el test y le indicamos que será su home
RUN mkdir /app
WORKDIR /app
			
# Copia tus archivos de prueba y dependencias del proyecto
COPY . /app/
			
# Instala las dependencias de tu proyecto (Node.js, Python, etc.)
RUN npm install --force

# Instala playwright y los navegadores necesarios para los test
RUN npx playwright install

