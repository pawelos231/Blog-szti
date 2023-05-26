import { authMiddleware } from "../middleware/authMiddleware";
import {CreatedCommentsDB, CountCreatedCommentsDB } from "@server/db/comments";
import { paginateMiddleware } from "../middleware/paginate";

export default authMiddleware(paginateMiddleware(async function Handler(req, res){
    const userEmail: string = req.user.Email
    const skipValue = Number(req.skipValue)
    const PAGE_SIZE  = Number(req.PAGE_SIZE)    

    const count = CountCreatedCommentsDB(userEmail)
    const createdUserComments = CreatedCommentsDB(userEmail, PAGE_SIZE, skipValue)

    Promise.all([count, createdUserComments]).then(values => {
        const countObj = values[0]
        const commentsObj = values[1]
        const comments = commentsObj.result
        const count = countObj.result

        if(commentsObj.error || countObj.error){
            console.warn(commentsObj.error || countObj.error)
            res.status(500).json("error with route: userCreatedComments")
            return
        }

        return res.status(200).json({comments, count})
    })

}))