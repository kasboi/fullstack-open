//It's important that dotenv gets imported before the note model is imported. This ensures that the environment variables from the .env file are available globally before the code from the other modules is imported.
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const Note = require('./models/note')

const app = express()

// Enable cors
app.use(cors())
// Allow express to parse JSON
app.use(express.json())
// Allow express to serve static files from the dist folder
app.use(express.static("dist"))

const notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: false,
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false,
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true,
    },
]

const reqLogger = (req, res, next) => {
    console.log("Method:", req.method)
    console.log("Path:  ", req.path)
    console.log("Body:  ", req.body)
    console.log("---")
    // Call the next middleware
    next()
}

app.use(reqLogger)

app.get("/", (req, res) => {
    res.send("<h1>Hello Champ!</h1>")
})

app.get("/api/notes", (req, res) => {
    // res.json(notes)
    Note.find({}).then((notes) => res.json(notes))
})

app.get("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find((item) => item.id === id)
    if (note) {
        res.json(note)
    } else {
        res.status(404).send({ some: "json" })
    }
})

app.post("/api/notes", (req, res) => {
    const body = req.body

    if(body.content == undefined){
        res.status(404).send({error: "content missing"})
    }
    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    note.save().then(item => res.json(item))
})

app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params
    notes.filter((item) => item.id !== Number(id))

    res.status(204).end()
})

app.use((req, res) => {
    res.status(404).send({ error: "Cannot find the requested resource" })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
