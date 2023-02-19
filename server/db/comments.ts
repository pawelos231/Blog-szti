import clientPromise from "./mongo";
const CommentOnPost = require("@server/models/CommentModel")


export const GetAllComments = async (postId: string) => {
    try{
      await clientPromise()
      const result: any = await CommentOnPost.find({ PostId: postId })
      return {comments: result}  
    } catch(error){
        return {error: 'Failed to fetch Comments'}
    } 
}