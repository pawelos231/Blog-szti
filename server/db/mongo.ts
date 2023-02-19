import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'
const URI: string = process.env.DATABASE_URL
const options = {}

if (!URI) throw new Error("add DATABASE_URL to .env file")

let clientPromise: any

if(process.env.NODE_ENV !== "production") {
    if(!global._mongoClientPromise){
        global._mongoClientPromise = mongoose.connect(URI)
    }
    clientPromise = global._mongoClientPromise
} else {
    clientPromise = mongoose.connect(URI)
}
export default clientPromise
    
    