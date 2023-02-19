import mongoose from 'mongoose'



const MONGODB_URI = process.env.DATABASE_URL

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  )
}
const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    bufferMaxEntries: 0,
    useFindAndModify: true,
    useCreateIndex: true
  }

async function dbConnect (): Promise<any> {
    if(process.env.NODE_ENV !== "production") {
        let cached: any = global.mongoose

        if (!cached) {
          cached = global.mongoose = { conn: null, promise: null }
        }
        if (cached.conn) {
            return cached.conn
          }
        
          if (!cached.promise) {
            cached.promise = mongoose.connect(MONGODB_URI, OPTIONS).then((mongoose) => {
              return mongoose
            })
          }
          cached.conn = await cached.promise
          return cached.conn
    } else {
       if(mongoose.connections[0].readyState) {
            console.log("connected already")
       } else {
            mongoose.connect(MONGODB_URI, OPTIONS, ()=> {
                console.log("your db is connected now")
            })
       }
    }
    
  }

export default dbConnect
    
    