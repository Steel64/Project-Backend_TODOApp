import express, { Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()
//puerto de desarrollo
const PORT = process.env.PORT

//primer endpoint (la funcion callBack se ejecuta cuando se hace una peticion)
app.get("/", (req : Request , resp : Response) => {
    resp.send("Endpoint raiz")
})

//Aplicacion se ejecute, escucha al puerto
app.listen(PORT, () => {
    console.log(`se inicio en servidor en puerto ${PORT}`)
})