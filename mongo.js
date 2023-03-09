require("dotenv").config()
const mongoose = require('mongoose')

const url = process.env.DB_URL

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  important: true,
})

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({}).then(res => {
  res.forEach(note => console.log(note))
  mongoose.connection.close()
})