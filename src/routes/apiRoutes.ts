import express, { Request, Response, NextFunction } from 'express'
import {User, Todo} from '../interfaces'

const db = require('../models')
const router = express.Router()

// get All todo List
router.get('/all', async (req: Request, res: Response) => {
    try{
        let todos: Todo[] = await db.Todos.findAll({where: {userId: req.body.userObj.id}})
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
        let todo: Todo = await db.Todos.findOne({ where: {id: req.params.id, userId: req.body.userObj.id }})
        if(todo === null) res.status(204).send({msg: 'Todo Not Found'}) // No content
        else res.status(200).send({data: todo}) // Sent data
    }catch(err){
        res.status(503).send({msg: `Somethong wen't wrong : ${err}`}) // Service Unavaliable
    }
})

// Inserting new Route
router.post('/new', async (req: Request, res: Response) => {
    try{
        let todo: Todo = await db.Todos.create({ text: req.body.text, userId: req.body.userObj.id })
        if(todo !== null) res.status(200).send({msg: "Todo Added Successfully"}) // Data sent
        else res.status(400).send({msg: 'Todo not created.'}) // Bad request
    }catch(err){
        res.status(503).send({msg: `Somethong wen't wrong : ${err}`}) // Service Unavaliable
    }
})

// delete todo
router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        await db.Todos.destroy({ where: {id: req.params.id, userId: req.body.userObj.id}})
        res.status(200).send({msg: 'Successfully deleted'})
    }catch(err) {
        res.status(503).send({msg: `Somethong wen't wrong : ${err}`}) // Service Unavaliable
    }
})

// Update 
router.put('/edit', async (req: Request, res: Response) => {
    try {
        await db.Todos.update({text: req.body.text}, {where: {id: req.body.id, userId: req.body.userObj.id}})
        res.status(200).send({msg: 'successfully Edited'})
    }catch(err){
        res.status(503).send({msg: `Somethong wen't wrong : ${err}`}) // Service Unavaliable
    }
})

module.exports = router