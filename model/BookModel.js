const mongoose = require('mongoose')
const schema = mongoose.Schema

const bookSchema = new schema ({
    bookName:String,
    bookPrice:Number
})

const Book = mongoose.model("Book",bookSchema)
module.exports= Book