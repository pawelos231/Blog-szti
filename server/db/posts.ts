import clientPromise from "./mongo";
import { IPost } from "@interfaces/PostsInterface";
import { ResponseWrapper } from "./interfaces/ResponseInterface";
const BlogPosts = require("@server/models/BlogPosts")


type Posts = Array<IPost>



export const getAllPosts = async (): ResponseWrapper<Posts> => {
    try{
      
      await clientPromise()
      
      const result: Posts = await BlogPosts.find({})
      return {result}  
    } catch(error){
        return {error: 'Failed to fetch posts', result: undefined}
    } 
}

export const getPostsByUser = async(Email: string): ResponseWrapper<Posts> => {

    try{
        await clientPromise()
        const result: Posts = await BlogPosts.find({ UserEmail: Email })
        return {result}  
      } catch(error){
          return {error: 'Failed to fetch posts by user', result: undefined}
      } 

}

export const getLikedUserPosts = async(Name: string): ResponseWrapper<Posts> => {

    try{
        await clientPromise()
        
        const result: Posts = await BlogPosts.find({ WhoLiked: Name }).cache()
        return {result}  
      } catch(error){
          return {error: 'Failed to fetch posts liked', result: undefined}
      } 

}

export const getPostById = async (id: string):  ResponseWrapper<IPost>=> {

    try{
        await clientPromise()
      
      const result: IPost = await BlogPosts.findById(id)
      return {result}  
    } catch(error){
        return {error: 'Failed to fetch posts', result: undefined}
    } 

}

export const likePost = async (arrOfLikes: string[], valueToPass: number, itemId: string):  ResponseWrapper<string>=> {

    try{
        await clientPromise()
        
        await BlogPosts.updateOne({
            _id: itemId
        }, {
            $set: {
                Likes: valueToPass,
                WhoLiked: arrOfLikes
            }
        })
        return {result: "successufully liked post"}  
      } catch(error){
          return {error: 'Failed to add like', result: undefined}
    } 

}


