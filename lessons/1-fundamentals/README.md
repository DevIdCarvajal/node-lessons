# 0. Primeros pasos con Python

## Índice

[0. Prerrequisitos](#0-prerrequisitos)  
[1. Nuestra primera aplicación JavaScript: "Hola Mundo"](#1-nuestra-primera-aplicación-javaScript-"hola-mundo")  
[2. Instalar paquetes](#2-instalar-paquetes)

## 0. Prerrequisitos

- Visual Studio Code: [https://code.visualstudio.com/](https://code.visualstudio.com/)
- Node.js: [https://nodejs.org/es/](https://nodejs.org/es/)
- Git: [https://git-scm.com/download/](https://git-scm.com/download/)

## 1. Nuestra primera aplicación JavaScript: "Hola Mundo"

1. Crear un fichero hello.js
2. Añadir estas dos líneas:

    ```
    const msg = "Hello World"
    console.log(msg)
    ```

3. Ejecutar fichero en la terminal:

    ```
    node hello.js
    ```

## 2. Instalar paquetes

1. Antes de nada, la primera vez se debe inicializar el proyecto Node (esto crea un fichero package.json que, entre otras cosas, gestiona las dependencias del proyecto con otros paquetes de npm):

    ```
    npm init -y
    ```

    Nota: La opción -y sirve para crear un package.json con unos valores por defecto.

2. Buscar y elegir el paquete en npm (u otras fuentes). Si es un paquete local, normalmente la instalación será de este modo:

    ```
    npm install moment
    ```

Esto genera una carpeta node_modules/ en el proyecto con el paquete instalado y a su vez todas sus dependencias, con las versiones definidas en el package.json, empleando para ello versionado semántico (semver).

Esto ayuda a que cuando un proyecto se comparte o distribuye (por ejemplo, mediante GitHub u otros medios), solo se incluya el código fuente original y no la carpeta node_modules/ completa. Para ello, se usa simplemente:

```
npm install
```

Si se desea instalar solamente "en desarrollo", entonces hay que añadir la opción --save-dev:

```
npm install mocha --save-dev
```

Si es un paquete global, que afecta a todo el sistema operativo, se añade la opción -g:

```
npm install -g nodemon
```

También se pueden ejecutar algunos paquetes sin instalarlos:

```
npx live-server
```
