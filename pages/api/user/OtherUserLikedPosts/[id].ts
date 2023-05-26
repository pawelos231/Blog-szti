import { getLikedUserPosts, CountLikedPostssDB } from "@server/db/posts";
import { paginateMiddleware } from "@pages/api/middleware/paginate";

export default paginateMiddleware(async function Handler(req, res) {
    try {
        const {id} = req.query;
        const skipValue = Number(req.skipValue);
        const PAGE_SIZE = Number(req.PAGE_SIZE);
    
        const [postsObj, countObj] = await Promise.all([
          getLikedUserPosts(String(id), PAGE_SIZE, skipValue),
          CountLikedPostssDB(String(id))
        ]);
    
        const posts = postsObj.result;
        const count = countObj.result;
    
        if (postsObj.error || countObj.error) {
          console.warn(postsObj.error || countObj.error);
          res.status(500).json("error with route: userCreatedComments");
          return;
        }
        return res.status(200).json({ posts, count });
      } catch (error) {
        console.error(error);
        res.status(500).json("An error occurred");
      }
    
})