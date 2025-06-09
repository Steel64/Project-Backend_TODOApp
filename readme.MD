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

 - Instalar cors para evitar cruze de puertos y origines cruzados:
    - npm install cors --save
    - npm install @types/cors --save-dev

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

 ```json
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

 ```json
    {"id" : 1, "descripcion" : "desc de todo 1"}
 ```

#### Registrar TODO

 - Path : "/todos"
 - Metodo : POST
 - Input :

 ```json
{
    "descripcion" : "bla la la"
}
 ```
 - Output :

 ```json
 {
    "msg" : ""
 }
 ```

#### Modificar TODO

 - Path : "/todos"
 - Metodo : PUT
 - Input :

 ```json

Path parameter: /todos/2
{
    "descripcion" : "nuevo todo"
}
 ```

 - Output :

 ```json
{
    "msg" : ""
}
 ```

#### Eliminar TODO

 - Path : "/todos"
 - Metodo : DELETE
 - Input : 

Path Parameter: "/todos/2"

 - Output :

 ```json
{
    "msg" : ""
}
 ```

 - DELETE/GET: se envia por un path parameter o query parameter
 - POST: Se puede enviar desde el payload (cuerpo)

 - Conceptos
     - Usa GET cuando necesitas acceder a un recurso y a información relativa, no necesitas alterar o modificar el estado de esta información obtenida.
     - Usa POST cuando necesitas enviar cierta información al servidor. Ejemplo: de un formulario para guardar la información del formulario para su uso más adelante.
     - Usa HEAD cuando necesitas acceder a un recurso y recuperar solo las cabeceras de la respuesta, sin obtener ninguna información del recurso.
     - Usa PUT cuando necesitas reemplazar el estado de cierta información ya existente en el sistema.
     - Usa DELETE cuando necesitas borrar un recurso (relativo a la URI que envias) en el sistema.
     - Usa OPTIONS cuando necesitas saber que tipos de métodos de respuesta soporta el servidor. Se usa para el CORS.