import { MongoClient } from 'mongodb'
const URI: string = process.env.DATABASE_URL
const options = {}

if (!URI) throw new Error("add DATABASE_URL to .env file")

let client: MongoClient = new MongoClient(URI, options)
let clientPromise: any

if(!global._mongoClientPromise){
    global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise


export default clientPromise
    
    