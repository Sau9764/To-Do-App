import express, { Request, Response, NextFunction } from "express"
import { any } from "sequelize/types/lib/operators"
const jwt = require("jsonwebtoken")
const db = require("../models")

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const router = express.Router()

interface Todo {id: number, text: string, [key: string]: any}
interface User { username: string, password:string, [key: string]: any }

// get All todo List
router.get("/all", authToken, (req: Request, res: Response) => {
    db.Todo.findAll().then((todos: Todo[]) => res.send(todos))
})

// get By ID
router.get("/find/:id", authToken, (req: Request, res: Response) => {
    db.Todo.findAll({ 
        where: { id: req.params.id }
    }).then((todo: Todo) => res.send(todo))
})

// Inserting new Route
router.post("/new", authToken, (req: Request, res: Response) => {
    db.Todo.create({
        text: req.body.text
    }).then((submittedTodo: Todo) => res.send(submittedTodo))
})

// delete todo
router.delete('/delete/:id', authToken, (req: Request, res: Response) => {
    db.Todo.destroy({
        where: { id: req.params.id }
    }).then(() => res.send("Success"))
})

// Update 
router.put("/edit", authToken, (req: Request, res: Response) => {
    db.Todo.update(
        { text: req.body.text }, 
        { where:{ id: req.body.id }
    }).then(() => res.send("Success"))
})

// middleware to verify the token
function authToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'] // bearer
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        res.send("Token not found")
    }else{
        jwt.verify(token, config.ACCESS_SECRET, (err: any, user: User) => {
            if(err) return res.send('Incorrect Token' + err)
            next()
        })
    }
}

module.exports = router