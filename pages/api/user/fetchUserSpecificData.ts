import {getPostsByUser} from '@server/db/posts'
import { authMiddleware } from '../middleware/authMiddleware'
import { paginateMiddleware } from '../middleware/paginate'
import { CountCreatedPostssDB } from '@server/db/posts'

export default authMiddleware(paginateMiddleware(async function Handler(req, res) {
    const userEmail: string = String(req.user.Email)
    const skipValue = Number(req.skipValue)
    const PAGE_SIZE  = Number(req.PAGE_SIZE)    

    const posts = await getPostsByUser(userEmail, PAGE_SIZE, skipValue)
    const count = await CountCreatedPostssDB(userEmail)
    
    Promise.all([posts, count]).then(values => {
        
        const postsObj = values[0]
        const countObj = values[1]

        const posts = postsObj.result
        const count = countObj.result

        if(postsObj.error || countObj.error){
            console.warn(postsObj.error || countObj.error)
            res.status(500).json("error with route: userCreatedComments")
            return
        }

        return res.status(200).json({posts, count})
    })
    
}))