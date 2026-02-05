const mongoose=require('mongoose')


async function connectToMongodb(){
   await mongoose.connect("mongodb+srv://kabinshermalimbu_db_user:kabin123@cluster0.t5szwzn.mongodb.net/?appName=Cluster0")
   console.log ( "Database connected successfully")
}


module.exports =connectToMongodb