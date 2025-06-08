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

app.use(express.static("assets"))

//puerto de desarrollo
const PORT = process.env.PORT

//primer endpoint (la funcion callBack se ejecuta cuando se hace una peticion)
app.get("/", (req : Request , resp : Response) => {
    resp.send("Endpoint raiz")
})

//endpoint para mostrar todos
app.get("/todos", (req : Request , resp : Response)=> {
    const todos = listaTODOs
    resp.json(todos)
})

//endpoint obtener todo, usando parameter con data en el backend (sin BD)
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

//endpoit para registrar todo en todos
app.post("/todos", (req : Request, resp : Response)=> {
    const todo = req.body
    const todos = listaTODOs

    //validar error de tipo, usar description en vex de descripcion
    if(todo.descripcion == undefined){
        resp.status(400).json({
            msg : "Debe enviar campo descripcion"
        })
    }

    //insertar todo en todos (forma de obtener id unico)
    // porabado en test
    todos.push({
        descripcion : todo.descripcion,
        id : new Date().getTime()
    })
    resp.json({
        msg : ""
    })
})

//
app.put("/todos/:id", (req : Request, resp : Response)=> {
    const todo = req.body
    const todoId = req.params.id
    const todos = listaTODOs

    if(todoId == undefined)
    {
        resp.status(400).json({
            msg : "Debe enviar un id como parte del path"
        })
        return
    }

    if(todo.descripcion == undefined)
    {
        resp.status(400).json({
            msg : "Debe enviar una descripcion"
        })
        return
    }

    for (let t of todos)
    {
        if(t.id.toString() == todoId){
            t.descripcion = todo.descripcion
            resp.json({
                msg : ""
            })
            return
        }
    }

    resp.status(400).json({
        msg : "No existe todo con ese id"
    })
    return
})

app.delete("/todos/:id", (req : Request, resp : Response) => {
    const todoId = req.params.id
    const todos = listaTODOs

    //forma de eliminar mas optima (usando paradigma funcional)
    const indiceAEliminar = listaTODOs.findIndex((t : TODO) => {
        return t.id.toString() == todoId
    })

    if(indiceAEliminar == -1){
        resp.status(400).json({
            msg : "No existe todo con ese id"
        })
        return
    }

    todos.splice(indiceAEliminar, 1)

    resp.json({
        msg : ""
    })
    
    //forma de eliminar menos optima (usando for)
    /*
    let indice = 0
    for (let t of todos)
    {
        if (t.id.toString() == todoId)
        {
            todos.splice(indice, 1)
            resp.json({
                msg : ""
            })
            return
        }
        indice++
    }
    resp.status(400).json({
        msg : "No existe todo con ese id"
    })
    */
})

//Aplicacion se ejecute, escucha al puerto
app.listen(PORT, () => {
    console.log(`se inicio en servidor en puerto ${PORT}`)
})