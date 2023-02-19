import mongoose from 'mongoose'



const MONGODB_URI = process.env.DATABASE_URL

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  )
}

let cached: any = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect (): Promise<any> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const OPTIONS = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: true,
      useCreateIndex: true
    }

    cached.promise = mongoose.connect(MONGODB_URI, OPTIONS).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
    
    