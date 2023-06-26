import { getLikedUserPosts, CountLikedPostssDB } from "@server/db/posts";
import { authMiddleware } from "../middleware/authMiddleware";
import { paginateMiddleware } from "../middleware/paginate";
import { IAuthPag } from "../middleware/types";

export default authMiddleware<IAuthPag>(
  paginateMiddleware(async function Handler(req, res) {
    try {
      const Name = String(req.user.Name);
      const skipValue = Number(req.skipValue);
      const PAGE_SIZE = Number(req.PAGE_SIZE);

      const [postsObj, countObj] = await Promise.all([
        getLikedUserPosts(Name, PAGE_SIZE, skipValue),
        CountLikedPostssDB(Name),
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
);
