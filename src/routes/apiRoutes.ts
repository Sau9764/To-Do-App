import express, { Request, Response, NextFunction } from "express"

const db = require("../models")

const router = express.Router()

// get All todo List
router.get("/all", async (req: Request, res: Response) => {
    try{
        let todos = await db.Todo.findAll()
        if(todos === null){
            return res.send("No Records Found")
        }
        res.send(todos)
    }catch(err){
        res.send("Somethong wen't wrong : " + err)
    }
})

// get By ID
router.get("/find/:id", async (req: Request, res: Response) => {
    try{
        let todo = await db.Todo.findOne({ where: {id: req.params.id }})
        if(todo !== null) res.send(todo)
        else res.send("User Not Found")
    }catch(err){
        res.send("Somethong wen't wrong : " + err)
    }
})

// Inserting new Route
router.post("/new", async (req: Request, res: Response) => {
    try{
        let todo = await db.Todo.create({ text: req.body.text })
        if(todo !== null) res.send(todo)
        else res.send("Record Not Found")
    }catch(err){
        res.send("Somethong wen't wrong : " + err)
    }
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