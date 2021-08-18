import express, { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

const db = require('./models')
const apiRoutes = require('./routes/apiRoutes.js')
const authRoutes = require('./routes/authRoutes.js')
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/config/config.json')[env]

const app = express()
const PORT = process.env.port || 5000
const host = process.env.host || 'localhost'

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Routes
app.use('/auth', authRoutes)
app.use(authToken)
app.use('/api', apiRoutes)

// middleware to verify the token
function authToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'] // bearer
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null){
      return res.status(400).send({msg: 'Token not found'}) // Bad Request
  }else{
      jwt.verify(token, process.env.ACCESS_SECRET || '', (err: any) => {
          if(err) return res.status(401).send({msg: `Incorrect Token ${err}`}) // unauthorized
          next()
      })
  }
}

async function createConnection(){
  try {
    // connect
    await db.sequelize.authenticate()  
    console.log('\nConnection has been established successfully.\n')
    // Sync 
    await db.sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Listening on http://${host}:${PORT}`)
    })
  }catch(err) {
    console.log('\nUnable to connect to the database:', err)
  }
}

createConnection()
.then()
.catch((err) => {
  console.log('Server not started')
})