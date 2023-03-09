const mongoose = require("mongoose")
require("dotenv").config()

mongoose.set('strictQuery', false)

const url = process.env.DB_URL

console.log('connecting to', url)

mongoose.connect(url)
  .then(res => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})
// I kid you not, this does not work using double-quotes i.e "toJson"
noteSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Note', noteSchema)