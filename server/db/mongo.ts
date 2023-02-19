import mongoose from 'mongoose'

const MONGODB_URI = process.env.DATABASE_URL

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  )
}
const connection: any = {}
async function dbConnect() {
    /* check if we have connection to our databse*/
    if (connection.isConnected) {
      return
    }
  
    /* connecting to our database */
    const db = await mongoose.connect(MONGODB_URI)
  
    connection.isConnected = db.connections[0].readyState
  }

export default dbConnect
    
    