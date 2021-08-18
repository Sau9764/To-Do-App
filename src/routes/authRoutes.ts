import express, { Request, Response } from 'express'
import {User, Todo} from '../interfaces'
import dotenv from 'dotenv'

dotenv.config();

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models')

const router = express.Router()

// sign-up user
router.post('/sign-up', async (req : Request, res: Response) => {
    try{
        // Search isExist()
        let user = await db.User.findOne({where: {username: req.body.username}})
        if(user === null){
            const passwordHash = await bcrypt.hashSync(req.body.password, 10)
            let userAdded: User = await db.User.create({username: req.body.username, password: passwordHash})
            if(userAdded !== null) {
                res.status(201).send({msg: 'User addedd.', data: {'id':userAdded.id, 'username': userAdded.username}}) // Data save
            }
            else res.status(400).send({msg: 'Something wen\'t wrong'}) // Bad Request
        }else{
            res.status(400).send({msg: 'User Already Exist'}); // Bad Request
        }
    }catch(err){
        res.status(503).send({msg: `Error: ${err}`}) // Service Unavailable
    }
})

// 2nd Time validate
router.get('/callback', async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'] // bearer
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        res.status(400).send({msg: "Token not found"}) // Bad request
    }else{
        jwt.verify(token, process.env.ACCESS_SECRET, (err: any) => {
            if(err) return res.status(401).send({msg: 'Incorrect Token'})
            res.status(200).send({msg: 'Token Verified'})
        })
    }
})

// validate User
router.post('/login', async (req: Request, res: Response) => {
    try {
        let user: User = await db.User.findOne({where: {username: req.body.username}})
        if(user !== null){
            if(bcrypt.compareSync(req.body.password, user.password)){
                let token = jwt.sign({user: user}, process.env.ACCESS_SECRET, {expiresIn: '5m'})
                res.status(200).send({id_token: token}) // Data sent
            }else{
                res.status(400).send({msg: 'Incorrect Password'}) // Bad request
            }
        } else{
            res.status(400).send({msg: 'User Not Exist'}) // Bad request
        }
    }catch(err){
        res.status(503).send({msg: `Error: ${err}`}) // Service Unavailable
    }  
})

module.exports = router