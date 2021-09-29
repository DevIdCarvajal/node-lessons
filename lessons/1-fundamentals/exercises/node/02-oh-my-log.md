# Ejercicios de Node

## 2. Oh my log! (Un servidor que lo registra todo)

Se pide:

1. Subir al repositorio de GitHub creado en el ejercicio anterior el proyecto creado en dicho ejercicio:

    ```
    git add .
    git commit -m "Mi primer server"
    git push
    ```

2. Añadir al servidor la capacidad de servir un index.html

3. Añadir a mi servidor la capacidad de servir una imagen jpg

4. Cada vez que el servidor sirva algo, apuntarlo en un fichero que se llame requests.log, creado en la carpeta raíz del servidor (junto a server.js)

Ejemplo de fichero resultante:

```
29/09/2021 19:40:34 - /web
29/09/2021 19:41:42 - /timenow
```

Consejo: Para la manipulación de ficheros, se recomienda consultar el siguiente recurso:

[w3schools Node.js fs module](https://www.w3schools.com/nodejs/nodejs_filesystem.asp)