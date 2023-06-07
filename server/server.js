require("dotenv").config()

const express = require("express")
const morgan= require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const bodyParser = require("body-parser")
const dbConnection = require("./models/mongodb")
const authRouter = require("./routes/authRoutes")
const todoRouter = require("./routes/todoRoutes")

const app = express()

app.use(cors({origin: "http://localhost:3000"}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))

app.use("/auth", authRouter)
app.use("/todos", todoRouter)

const startServer = async () => {
    try {
        const port = process.env.PORT
        await dbConnection()
        app.listen(port, () => console.log(`Server running on port ${port}`))
    } catch (error) {
        console.log(`There is an error: ${error.message}`);
    }
}

startServer()