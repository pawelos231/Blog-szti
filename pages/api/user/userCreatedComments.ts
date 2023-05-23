import { authMiddleware } from "../middleware/authMiddleware";
import {CreatedCommentsDB } from "@server/db/comments";

export default authMiddleware( async function Handler(req, res){
    const userEmail = req.user.Email
    const {result, error} = await CreatedCommentsDB(userEmail)
    
    if(error){
        console.warn(error)
        res.status(500).json("coś poszło nie tak w fethowaniu polikowanych komentarzy")
        return 
    }
    res.status(200).json(result)
})