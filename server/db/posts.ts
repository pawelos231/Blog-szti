import clientPromise from "./mongo";
const BlogPosts = require("@server/models/BlogPosts")
const CommentOnPost = require("@server/models/CommentModel")
require("../cache/index")
interface Response {
    posts?: any;
    post?: any
    response?: any
    error?: string;
    specificPosts?: any
    likedUserPosts?: any
}



export const getAllPosts = async (): Promise<Response> => {
    try{
      
      await clientPromise()
      
      const result: any = await BlogPosts.find({})
      return {posts: result}  
    } catch(error){
        return {error: 'Failed to fetch posts'}
    } 
}

export const getPostsByUser = async(Email: string) => {
    try{
        await clientPromise()
        
        const result: any = await BlogPosts.find({ UserEmail: Email }).cache()
        return {specificPosts: result}  
      } catch(error){
          return {error: 'Failed to fetch posts'}
      } 
}

export const getLikedUserPosts = async(Name: string) => {
    try{
        await clientPromise()
        
        const result: any = await BlogPosts.find({ WhoLiked: Name }).cache()
        return {likedUserPosts: result}  
      } catch(error){
          return {error: 'Failed to fetch posts'}
      } 
}

export const getPostById = async (id: string): Promise<Response> => {
    try{
        await clientPromise()
      
      const result: any = await BlogPosts.findById(id)
      return {post: result}  
    } catch(error){
        return {error: 'Failed to fetch posts'}
    } 
}

export const likePost = async (arrOfLikes: string[], valueToPass: number, itemId: string): Promise<Response> => {
    try{
        await clientPromise()
        
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


export const GetAllComments = async (postId: string) => {
    try{
      await clientPromise()
      const result: any = await CommentOnPost.find({ PostId: postId }).cache()
      return {comments: result}  
    } catch(error){
        return {error: 'Failed to fetch Comments'}
    } 
}