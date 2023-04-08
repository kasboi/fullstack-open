const notesRouter = require('express').Router()
const Note = require("../models/note")

notesRouter.get("/", (req, res) => {
  // res.json(notes)
  Note.find({}).then((notes) => res.json(notes))
})

notesRouter.get("/:id", async (req, res, next) => {
  try {
      const note = await Note.findById(req.params.id)
      if (note) {
          res.json(note)
      } else {
          res.status(404).end()
      }
  } catch (error) {
      // console.log(error)
      // res.status(400).send({ error: "malformmated id" })
      next(error)
  }
})

notesRouter.post("/", (req, res, next) => {
  const body = req.body

  if (body.content == undefined) {
      res.status(404).send({ error: "content missing" })
  }
  const note = new Note({
      content: body.content,
      important: body.important,
  })

  note.save()
      .then((item) => res.json(item))
      .catch((error) => next(error))
})

// Route handler for removing a note
notesRouter.delete("/:id", (req, res) => {
  const { id } = req.params
  Note.findByIdAndRemove(id)
      .then((result) => {
          res.status(204).end()
      })
      .catch((error) => next(error))
})

notesRouter.put("/:id", (req, res, next) => {
  const { content, important } = req.body

  const note = {
      content,
      important,
  }

  Note.findByIdAndUpdate(req.params.id, note, {
      new: true,
      runValidators: true,
      context: "query",
  })
      .then((updatedNote) => {
          res.json(updatedNote)
      })
      .catch((error) => next(error))
})

module.exports = notesRouter