import express, { Request, Response, NextFunction } from "express"
import { Todo } from "../interfaces"

const db = require("../models")

const router = express.Router()

// get All todo List
router.get("/all", async (req: Request, res: Response) => {
    let todos = await db.Todo.findAll()
    res.send(todos)
})

// get By ID
router.get("/find/:id", async (req: Request, res: Response) => {
    let todo = await db.Todo.findOne({ where: {id: req.params.id }})
    if(todo !== null) res.send(todo)
    else res.send("User Not Found")
})

// Inserting new Route
router.post("/new", async (req: Request, res: Response) => {
    let todo = await db.Todo.create({ text: req.body.text })
    if(todo !== null) res.send(todo)
    else res.send("Something wen't wrong")
})

// delete todo
router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        await db.Todo.destroy({ where: {id: req.params.id }})
        res.send("Success")
    }catch(err) {
        res.send("Something wen't wrong")
    }
})

// Update 
router.put("/edit", async (req: Request, res: Response) => {
    try {
        await db.Todo.update({text: req.body.text}, {where: {id: req.body.id }})
        res.send("success")
    }catch(err){
        res.send("Somethong wen't wrong")
    }
})

module.exports = router