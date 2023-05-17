import { IPost } from '@interfaces/PostsInterface';
import { authMiddleware } from '../middleware/authMiddleware';
import { CreatePost } from '@server/db/posts';


export default authMiddleware(async function handler(req, res) {
 
  const parsedData: IPost = {...JSON.parse(req.body), Username: req.user.Name, UserEmail: req.user.Email }
  console.log(parsedData)
   const {result, error} = await CreatePost(parsedData)
   
  if(error) {
    console.log(error)
    return res.status(500).json(error)
  }

  res.status(200).json({ message: 'udało się dodać post' })
})

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '20mb' 
      }
  }
}