import clientPromise from "./mongo";
const CommentOnPost = require("@server/models/CommentModel")
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

export const GetAllComments = async (postId: string) => {
    try{
      if(!db) await init()
      console.log("chuj")
      const result: any = await CommentOnPost.find({ PostId: postId })
      console.log(result)
      return {comments: result}  
    } catch(error){
        return {error: 'Failed to fetch posts'}
    } 
}