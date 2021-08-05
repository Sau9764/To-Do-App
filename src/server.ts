
import express from 'express'

const db = require("./models")
const apiRoutes = require("./routes/apiRoutes.js")

const app = express()

const PORT = process.env.port || 8081

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api", apiRoutes)


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