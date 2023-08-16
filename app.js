const notesRouter = require("./controllers/notes")
// Import .env secrets indirectly and conveniently i.e. instead of process.ENV in every file bla bla
const config = require("./utils/config")
// Basically posh console (.log & .error)
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

// All requests to this endpoint is handled by the 'notesRouter' controller
app.use("/api/notes", notesRouter)

// Route handler for handling unknown endpoints
app.use(middleware.unknownEndpoint)

// this has to be the last loaded middleware. Middleware for handling errors
app.use(middleware.errorHandler)

module.exports = app