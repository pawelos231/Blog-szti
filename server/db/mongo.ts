import { MongoClient } from 'mongodb'
const URI: string = process.env.DATABASE_URL
const options = {}

if (!URI) {
    console.log(URI)
  }

let client: MongoClient = new MongoClient(URI, options)
let clientPromise: any

if(process.env.NODE_ENV !== "production") {
    if(!global._mongoClientPromise){
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    clientPromise = client.connect()
}

export default clientPromise
    
    