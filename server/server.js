import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { readdirSync } from "fs"

const morgan = require("morgan")
require("dotenv").config()

const app = express()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Failed ==> ", err))

app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
)

// load all routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)))

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on port: ${port}`))
