# Crea un contenedor temporal
docker create --name temp-container angular-lib-17

# Copia la carpeta 'dist' del contenedor al host
docker cp temp-container:/dist ./dist/ds-ng-17

# Elimina el contenedor temporal
docker rm temp-container
