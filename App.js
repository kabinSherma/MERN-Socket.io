const express = require('express')
const app = express()
// requireing socket.io
const {Server} =require('socket.io')
const connectToMongodb = require('./Conection')
const Book = require('./model/BookModel')



// connection to database

connectToMongodb()

// http request
const  server= app.listen(5000,()=>{
    console.log("Server start in port 5000")
})




// instance of socket
const io = new Server (server )

// connection  is key word

io.on("connection",(socket)=>{
  console.log("A user Connected ")

  // adding book 


  socket.on("addBook", async(data)=>{
   try {
     if(data){
        const {bookName,bookPrice}=data
        const newBook = await Book.create({
            bookName,
            bookPrice
        })
        
        socket.emit("Response", {status:200,message:"Book added successfully",data:newBook })

    }

   }
   catch (error){

    socket.emit("Response", {status:500, message:"Something went wrong"})

   }
  })

  // get book

  socket.on("getBook", async()=>{
    try {
        const {bookId,bookName,bookPrice}=data
        const books = await Book.find()
        socket.emit("Response",{status:200, message:"Book fetched Sucessfully",data:books})

    }
    catch (error){
        socket.emit("Response", {status:500,message:"Something went error"})
    }
  })

  // update book

  socket.on("updateBook",async(data)=>{
    try {
        if(data){
            const {bookId}=data
            const updatedBook = await Book.findByIdAndUpdate(bookId,{
                bookName,
                bookPrice
            },{
                new : true
            })

            socket.emit("Response", {status:200,message:"Book Updated", data:updatedBook})

        }
    } catch (error) {
        socket.emit("Response", {status:500,message:"Something went wrong"})
    }
  })

//   delete book

  socket.on("deleteBook",async(data)=>{
    try {
        if(data){
            await Book.findByIdAndDelete(bookId)
        }
        socket.emit("Response",{status:200,message:"Book deleted "})
        
    } catch (error) {
        socekt.emit("Response", {status:500,message:"Something went wrong"})
        
    }
  })

})
