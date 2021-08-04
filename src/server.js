const express = require("express")
const db = require("./models")
const apiRoutes = require("./routes/apiRoutes.js")

const app = express()

const PORT = process.env.port || 8080

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api", apiRoutes)

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`)
    })
})