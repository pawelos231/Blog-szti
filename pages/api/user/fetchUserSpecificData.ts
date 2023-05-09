import {getPostsByUser} from '@server/db/posts'
import { authMiddleware } from '../middleware/authMiddleware'

export default authMiddleware(async function Handler(req, res) {
    const {result, error} = await getPostsByUser(String(req.user.Email))
 
    if(error) {
        console.log(error)
    }
    res.status(200).json(result)
})