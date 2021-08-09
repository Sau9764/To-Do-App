import express, { Request, Response } from "express"

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../models")

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const router = express.Router()

// sign-up user
router.post("/sign-up", async (req : Request, res: Response) => {
    try{
        // Search isExist()
        let user = await db.User.findOne({where: {username: req.body.username}})
        if(user === null){
            const passwordHash = await bcrypt.hashSync(req.body.password, 10)
            let userAdded = await db.User.create({username: req.body.username, password: passwordHash})
            if(userAdded !== null) res.send(userAdded)
            else res.send("Something wen't wrong")
        }else{
            res.send("User Already Exist");
        }
    }catch(err){
        res.send("Error: " + err)
    }
})

// validate User
router.post("/login", async (req: Request, res: Response) => {
    try {
        let user = await db.User.findOne({where: {username: req.body.username}})
        if(user !== null){
            if(bcrypt.compareSync(req.body.password, user.password)){
                let token = jwt.sign({user: user}, config.ACCESS_SECRET, {expiresIn: '5m'})
                res.send({id_token: token})
            }else{
                res.send("Incorrect Password")
            }
        } else{
            res.send("User Not Exist")
        }
    }catch(err){
        res.send("Error : " + err)
    }  
})

module.exports = router