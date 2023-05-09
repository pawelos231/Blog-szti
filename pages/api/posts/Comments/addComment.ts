import { IPostComment } from "@interfaces/PostsInterface";
import { authMiddleware} from "@pages/api/middleware/authMiddleware";
import { CreateCommentDB } from "@server/db/comments";


export default authMiddleware(async function Handler(req, res) {


    const CommentObjectForFront: IPostComment = {
        ...JSON.parse(req.body),
        UserId: req.user.Email as string,
        UserName: req.user.Name as string
    }

    const {result, error} = await CreateCommentDB(CommentObjectForFront)

    if(error ){
        console.log(error)
        return res.status(500).json(error)
    }
    
    return res.status(200).json(result)
})