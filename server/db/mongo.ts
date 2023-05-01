import mongoose from 'mongoose'

const MONGODB_URI = process.env.DATABASE_URL
const ENV_VAR_NOT_FOUND = 'Please define the MONGODB_URI environment variable inside .env'

if (!MONGODB_URI) {
  throw new Error(ENV_VAR_NOT_FOUND)
}

async function dbConnect(): Promise<void> {
    if (mongoose.connections[0].readyState) {
      console.log("juz jestem połączony")
      return
    }
  
     await mongoose.connect(MONGODB_URI)

  }

export default dbConnect
    
    