import express, { Request, Response, NextFunction } from 'express'
import {User, Todo} from '../interfaces'

const db = require('../models')
const router = express.Router()

// get All todo List
router.get('/all', async (req: Request, res: Response) => {
    try{
        let todos: Todo[] = await db.Todo.findAll()
        if(todos === null){
            return res.status(204).send({msg: 'No Records Found'}) // No content
        }
        res.status(200).send({data: todos}) // send Data
    }catch(err){
        res.status(503).send({msg: `Somethong wen't wrong : ${err}`}) // Service Unavaliable
    }
})

// get By ID
router.get('/find/:id', async (req: Request, res: Response) => {
    try{
        let todo: Todo = await db.Todo.findOne({ where: {id: req.params.id }})
        if(todo !== null) res.status(200).send({data: todo}) // Sent data
        else res.status(204).send({msg: 'User Not Found'}) // No content
    }catch(err){
        res.status(503).send({msg: `Somethong wen't wrong : ${err}`}) // Service Unavaliable
    }
})

// Inserting new Route
router.post('/new', async (req: Request, res: Response) => {
    try{
        let todo: Todo = await db.Todo.create({ text: req.body.text })
        if(todo !== null) res.status(200).send({msg: "User Added Successfully"}) // Data sent
        else res.status(400).send({msg: 'User not created.'}) // Bad request
    }catch(err){
        res.status(503).send({msg: `Somethong wen't wrong : ${err}`}) // Service Unavaliable
    }
})

// delete todo
router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        await db.Todo.destroy({ where: {id: req.params.id }})
        res.status(200).send({msg: 'Successfully deleted'})
    }catch(err) {
        res.status(503).send({msg: `Somethong wen't wrong : ${err}`}) // Service Unavaliable
    }
})

// Update 
router.put('/edit', async (req: Request, res: Response) => {
    try {
        await db.Todo.update({text: req.body.text}, {where: {id: req.body.id }})
        res.status(200).send({msg: 'successfully Edited'})
    }catch(err){
        res.status(503).send({msg: `Somethong wen't wrong : ${err}`}) // Service Unavaliable
    }
})

module.exports = router