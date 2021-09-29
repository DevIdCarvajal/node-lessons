# Ejercicios de Node

## 1. Mi primer servidor

Se pide:

1. Crear un repositorio en GitHub que se llame myFirstNodeServer
2. Clonarlo localmente
3. Inicializar un proyecto Node
4. Instalar el paquete moment
5. Implementar un servidor web local por el puerto 8080 que sea capaz de:
    - Cuando le pidan algo a la raíz ( "/" ), devolver el texto HTML:

        ```
        <h1>¡Ya sé Node!</h1>
        ```
    
    - Cuando le pidan algo a "/hw", devolver el texto HTML:

        ```
        <p style="color: orange">Happy Halloween!</p>
        ```
    
    - Cuando le pidan algo a "/myjson", devolver el objeto:

        ```
        { "nombre": "Espagueti", "apellido": "Volador" }
        ```
    
    - Cuando le pidan algo a "/timenow", devolver la hora actual del servidor.

    - Si le piden cualquier otra cosa, devolver un 404 con el mensaje:

        ```
        Estos no son los androides que buscas
        ```
    