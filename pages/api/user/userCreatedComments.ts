import { authMiddleware } from "../middleware/authMiddleware";
import {CreatedCommentsDB } from "@server/db/comments";
import { paginateMiddleware } from "../middleware/paginate";

export default authMiddleware(paginateMiddleware(async function Handler(req, res){
    const userEmail = req.user.Email
    const skipValue = req.skipValue
    const PAGE_SIZE  = req.PAGE_SIZE
    console.log(req.user)
    const {result, error} = await CreatedCommentsDB(userEmail, Number(PAGE_SIZE), Number(skipValue))
    
    if(error){
        console.warn(error)
        res.status(500).json("coś poszło nie tak w fethowaniu polikowanych komentarzy")
        return 
    }
    res.status(200).json(result)
}))