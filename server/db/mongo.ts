import mongoose from 'mongoose'

const MONGODB_URI = process.env.DATABASE_URL

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  )
}
async function dbConnect(): Promise<void> {
    /* check if we have connection to our databse*/
    if (mongoose.connections[0].readyState) {
      console.log("juz jestem połączony")
      return
    }
  
    /* connecting to our database */
     await mongoose.connect(MONGODB_URI)

  }

export default dbConnect
    
    