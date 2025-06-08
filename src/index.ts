import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { listaTODOs, TODO } from "./data"
import bodyParser from "body-parser"

dotenv.config()
const app = express()

//Configuracion del servidor HTTP para recibir peticiones
//por el payload (cuerpo) y convertirlos en objetos js/ts
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))

//puerto de desarrollo
const PORT = process.env.PORT

//primer endpoint (la funcion callBack se ejecuta cuando se hace una peticion)
app.get("/", (req : Request , resp : Response) => {
    resp.send("Endpoint raiz")
})

app.get("/todos", (req : Request , resp : Response)=> {
    const todos = listaTODOs
    resp.json(todos)
})

app.get("/todos/:id", (req : Request , resp : Response)=> {
    const id = req.params.id
    let todoEncontrado : TODO | null = null
    for(let todo of listaTODOs){
        if(todo.id.toString() == id){
            todoEncontrado = todo
            break;
        }
    }
    if(todoEncontrado == null){
        //Error: no se encontro
        resp.status(404).json({
            msg: "codigo incorrecto"
        })
    }
    resp.json(todoEncontrado)
})

app.post("/todos", (req : Request, resp : Response)=>{
    const todo = req.body
    const todos = listaTODOs
    //insertar todo en todos (forma de obtener id unico)
    todos.push({
        descripcion : todo.descripcion,
        id : new Date().getTime()
    })
    resp.json({
        msg : ""
    })
})

//Aplicacion se ejecute, escucha al puerto
app.listen(PORT, () => {
    console.log(`se inicio en servidor en puerto ${PORT}`)
})