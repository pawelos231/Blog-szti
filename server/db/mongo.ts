import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'
const URI: string = process.env.DATABASE_URL

if (!URI) throw new Error("add DATABASE_URL to .env file")

let clientPromise: any


if(!global._mongoClientPromise){
    global._mongoClientPromise = mongoose.connect(URI)
}
clientPromise = global._mongoClientPromise

export default clientPromise
    
    