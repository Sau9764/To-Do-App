
import express from 'express'

const db = require("./models")
const apiRoutes = require("./routes/apiRoutes.js")
const authRoutes = require("./routes/authRoutes.js")
const app = express()

const PORT = process.env.port || 8080

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use("/api", apiRoutes)
app.use("/auth", authRoutes)

db.sequelize
  .authenticate()
  .then(function(err: any) {
    console.log('Connection has been established successfully.')
  }, function (err: any) {
    console.log('Unable to connect to the database:', err)
  })


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`)
    })
})