import mongoose from 'mongoose'

const MONGODB_URI = process.env.DATABASE_URL

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  )
}
async function dbConnect(): Promise<void> {
    if (mongoose.connections[0].readyState) {
      console.log("juz jestem połączony")
      return
    }
  
     await mongoose.connect(MONGODB_URI)

  }

export default dbConnect
    
    