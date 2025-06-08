## BACKEND

 - npm init -y
 - npm install express --save
 - npm install typescript dotenv ts-node nodemon @types/express @types/dotenv --save-dev
 - npx tsc --init
 - Crear el directorio de ubicacion de archivos ts (codigo fuente): /src
 - Crear el directorio de ubicacion de archivos js (codigo de salida): /dist
 - descomentar -> linea 30 de tsconfig.json -> asignar la ubicacion de codigo fuente (/src)
 - descomentar // -> linea 62 de tsconfig.json -> asigna direccion del resultado de typescript (/dist)
 - Crear un archivo index.ts en "/src", y usar el codigo base.
    - Se utiliza un PORT, almacenado en un archivo ".env" que contiene "PORT=5000" solo para uso dentro del proyecto.
    - Tambien se puede agregar una variable de entorno de windows, que funciona en todo el equipo.
    - Ambos funcionan como localhost.

```
    import express, { Request, Response } from "express"
    import dotenv from "dotenv"

    dotenv.config()
    const app = express()
    const PORT = process.env.PORT

    app.get("/", (req : Request , resp : Response) => {
        resp.send("Endpoint raiz")
    })

    app.listen(PORT, () => {
        console.log(`se inicio en servidor en puerto ${PORT}`)
    })
```
 - Finalmente utilizar los comandos o los comandos optimizados, como:
    - npm run start:dev ===> Ejecuta servidor web en modo desarrollador (solo para pruebas).
    - npm run build ===> Construye el servidor web y actualiza si hay cambios.
    - npm run start ===> Ejecuta el servidor web oficialmente.

 #### Optimizar comandos

 - En package.json, añadir:

    - linea 7: "build": "npx tsc",
    - linea 8: "start": "node ./dist/index.js",
    - linea 9: "start:dev": "nodemon ./src/index.ts" (solo para etapa de desarrollo)

## Documentacion Backend

### Endpoints

#### Obtener TODOs

 - Path : "/todos"
 - Metodo : GET
 - Input : -
 - Output :

json
 ```
 [
    {"id" : 1, "descripcion" : "desc de todo 1"},
    {"id" : 2, "descripcion" : "desc de todo 2"}
 ]
 ```

 #### Obtener TODO

 Por path parameter
 - Path : "/todos"
 - Metodo : GET
 - Input : "/:id" : Id del TODO
 - Output :

json
 ```
    {"id" : 1, "descripcion" : "desc de todo 1"}
 ```