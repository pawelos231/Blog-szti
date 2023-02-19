import clientPromise from "./mongo";
const BlogPosts = require("@server/models/BlogPosts")
let client;
let db

const init = async (): Promise<void> => {
    if(db) return
    try{
        client = await clientPromise
        db = await client.db()
    } catch(error: any){
        throw new Error('failed to establish connection to database')
    }
}

(async() => {
    await init()
})()

export const getAllPosts = async () => {
    try{
      if(!db) await init()
      
      const result: any = await BlogPosts.find({})
      return {posts: result}  
    } catch(error){
        return {error: 'Failed to fetch posts'}
    } 
}