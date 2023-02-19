import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'
const URI: string = process.env.DATABASE_URL
const options = {}

if (!URI) throw new Error("add DATABASE_URL to .env file")

let client: MongoClient = new MongoClient(URI, options)
let clientPromise: any

if(process.env.NODE_ENV !== "production") {
    if(!global._mongoClientPromise){
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    await mongoose.connect(URI)
    clientPromise = client.connect()
}


export default clientPromise
    
    