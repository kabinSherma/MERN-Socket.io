const express = require('express')
const app = express()
// requireing socket.io
const {Server} =require('socket.io')






// http request
const  server= app.listen(5000,()=>{
    console.log("Server start in port 5000")
})




// instance of socket
const io = new Server (server )

// connection  is key word

io.on("connection",(socket)=>{
    console.log("Someone has connected")
    socket.on("sendData",(data)=>{
        if(data){
            io.to(socket.id).emit("response", " Thank You ! Your data have been recived")
        }
    })

})
