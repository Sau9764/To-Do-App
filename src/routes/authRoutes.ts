import express, { Request, Response } from "express"
import { Model } from "sequelize/types"
import { any } from "sequelize/types/lib/operators"

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../models")

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const router = express.Router()

interface User { username: string, password:string }

// sign-up user
router.post("/sign-up", (req : Request, res: Response) => {
    const passwordHash = bcrypt.hashSync(req.body.password, 10)
    db.User.create({
        username: req.body.username,
        password: passwordHash
    }).then((submittedUser: User) => {
        res.send(submittedUser)
    })
})

// validate User
router.post("/login", (req: Request, res: Response) => {
    db.User.findAll({
        where: { username: req.body.username }
    }).then((user: User[]) => {
        if(bcrypt.compareSync(req.body.password, user[0].password)){
            const token = jwt.sign({user: user}, config.ACCESS_SECRET, {expiresIn: '5m'})
            res.send({id_token: token})
        }else{
            res.send("Failure")
        }
    })
})

module.exports = router