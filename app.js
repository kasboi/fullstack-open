//It's important that dotenv gets imported before the note model is imported. This ensures that the environment variables from the .env file are available globally before the code from the other modules is imported.
const notesRouter = require("./controllers/notes")
const config = require("./utils/config")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()

mongoose.set("strictQuery", false)

const url = config.MONGODB_URI

logger.info("connecting to", url)

mongoose
    .connect(url)
    .then(() => logger.info("connected to MongoDB"))
    .catch((error) => {
        logger.error("error connecting to MongoDB:", error.message)
    })


// Allow express to serve static files from the dist folder
app.use(express.static("dist"))
// Enable cors
app.use(cors())
// Allow express to parse JSON
app.use(express.json())
// Request Logger middleware
app.use(middleware.reqLogger)

app.use("/api/notes", notesRouter)

// Route handler for handling unknown endpoints
app.use(middleware.unknownEndpoint)

// this has to be the last loaded middleware. Middleware for handling errors
app.use(middleware.errorHandler)

module.exports = app