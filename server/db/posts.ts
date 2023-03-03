import clientPromise from "./mongo";
import { CommentsOnPost, SinglePostFromDatabase } from "@interfaces/PostsInterface";
import {deleteAllRedisValues} from '@server/cache/cache'
const BlogPosts = require("@server/models/BlogPosts")
const CommentOnPost = require("@server/models/CommentModel")
require("../cache/index")

type Posts = Array<SinglePostFromDatabase>
type Post = SinglePostFromDatabase
type Comments = Array<CommentsOnPost>

interface GenericResponse<T> {
    result: T
    error? : string
}

type ResponseWrapper<T> = Promise<GenericResponse<T>> 

export const getAllPosts = async (): ResponseWrapper<Posts> => {
    try{
      
      await clientPromise()
      
      const result: Posts = await BlogPosts.find({}).cache()
      return {result}  
    } catch(error){
        return {error: 'Failed to fetch posts', result: undefined}
    } 
}

export const getPostsByUser = async(Email: string): ResponseWrapper<Posts> => {

    try{
        await clientPromise()
        const result: any = await BlogPosts.find({ UserEmail: Email }).cache()
        return {result}  
      } catch(error){
          return {error: 'Failed to fetch posts by user', result: undefined}
      } 

}

export const getLikedUserPosts = async(Name: string): ResponseWrapper<Posts> => {

    try{
        await clientPromise()
        
        const result: any = await BlogPosts.find({ WhoLiked: Name }).cache()
        return {result}  
      } catch(error){
          return {error: 'Failed to fetch posts liked', result: undefined}
      } 

}

export const getPostById = async (id: string):  ResponseWrapper<Post>=> {

    try{
        await clientPromise()
      
      const result: Post = await BlogPosts.findById(id)
      return {result}  
    } catch(error){
        return {error: 'Failed to fetch posts', result: undefined}
    } 

}

export const likePost = async (arrOfLikes: string[], valueToPass: number, itemId: string):  ResponseWrapper<string>=> {

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
        return {result}  
      } catch(error){
          return {error: 'Failed to add like', result: undefined}
    } 

}


export const GetAllComments = async (postId: string):  ResponseWrapper<Comments>  => {
    try
    {
      await clientPromise()

      const result: Comments = await CommentOnPost.find({ PostId: postId }).cache()
      return {result}  
      
    } catch(error)
    {
        return {error: 'Failed to fetch Comments', result: undefined}
    } 
}

export const createComment = async (postId: string): Promise<void> => {
    
}