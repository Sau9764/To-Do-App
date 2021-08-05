import express, { Request, Response } from "express"
import { any } from "sequelize/types/lib/operators"

const db = require("../models")

const router = express.Router()

// get All todo List
router.get("/all", (req: Request, res: Response) => {
    db.Todo.findAll().then((todos: any[]) => res.send(todos))
})

// get By ID
router.get("/find/:id", (req: Request, res: Response) => {
    db.Todo.findAll({
        where: {
            id: req.params.id
        }
    }).then((todo: any) => res.send(todo))
})

// Inserting new Route
router.post("/new", (req: Request, res: Response) => {
    db.Todo.create({
        text: req.body.text
    }).then((submittedTodo: any) => res.send(submittedTodo))
})

// delete todo
router.delete('/delete/:id', (req: Request, res: Response) => {
    db.Todo.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send("Success"))
})

// Update 
router.put("/edit", (req: Request, res: Response) => {
    db.Todo.update(
        {
            text: req.body.text
        }, 
        {
            where:{ id: req.body.id }
        }
    ).then(() => res.send("Success"))
})

module.exports = router