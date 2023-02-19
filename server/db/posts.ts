import clientPromise from "./mongo";
const BlogPosts = require("@server/models/BlogPosts")
let client;
let db

interface Response {
    posts?: any;
    post?: any
    response?: any
    error?: string;
    specificPosts?: any
    likedUserPosts?: any
}

const init = async (): Promise<void> => {
    if(db) {
        return
    }
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


export const getAllPosts = async (): Promise<Response> => {
    try{
      if(!db){
        console.log("must await")
        await init()
      }
      
      const result: any = await BlogPosts.find({})
      return {posts: result}  
    } catch(error){
        return {error: 'Failed to fetch posts'}
    } 
}

export const getPostsByUser = async(Email: string) => {
    try{
        if(!db) await init()
        
        const result: any = await BlogPosts.find({ UserEmail: Email })
        return {specificPosts: result}  
      } catch(error){
          return {error: 'Failed to fetch posts'}
      } 
}

export const getLikedUserPosts = async(Name: string) => {
    try{
        if(!db) await init()
        
        const result: any = await BlogPosts.find({ WhoLiked: Name })
        console.log(result)
        return {likedUserPosts: result}  
      } catch(error){
          return {error: 'Failed to fetch posts'}
      } 
}

export const getPostById = async (id: string): Promise<Response> => {
    try{
      if(!db) await init()
      
      const result: any = await BlogPosts.findById(id)
      return {post: result}  
    } catch(error){
        return {error: 'Failed to fetch posts'}
    } 
}

export const likePost = async (arrOfLikes: string[], valueToPass: number, itemId: string): Promise<Response> => {
    try{
        if(!db) await init()
        
        const result: any = await BlogPosts.updateOne({
            _id: itemId
        }, {
            $set: {
                Likes: valueToPass,
                WhoLiked: arrOfLikes
            }
        })
        return {response: result}  
      } catch(error){
          return {error: 'Failed to add like'}
    } 
}