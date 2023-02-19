import mongoose from 'mongoose'

const MONGODB_URI = process.env.DATABASE_URL

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  )
}

async function dbConnect (){
 
    if(mongoose.connections[0].readyState) {
        return mongoose.connections[0]
    } else {
         return mongoose.connect(MONGODB_URI, ()=> {
             console.log("your db is connected now")
        })
    }
    
  }

export default dbConnect
    
    