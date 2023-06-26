import { getPostsByUser } from "@server/db/posts";
import { authMiddleware } from "../middleware/authMiddleware";
import { paginateMiddleware } from "../middleware/paginate";
import { CountCreatedPostssDB } from "@server/db/posts";
import { IAuthPag } from "../middleware/types";

export default authMiddleware<IAuthPag>(
  paginateMiddleware(async function Handler(req, res) {
    try {
      const userEmail = String(req.user.Email);
      const skipValue = Number(req.skipValue);
      const PAGE_SIZE = Number(req.PAGE_SIZE);

      const [postsObj, countObj] = await Promise.all([
        getPostsByUser(userEmail, PAGE_SIZE, skipValue),
        CountCreatedPostssDB(userEmail),
      ]);

      const posts = postsObj.result;
      const count = countObj.result;

      if (postsObj.error || countObj.error) {
        console.warn(postsObj.error || countObj.error);
        return res
          .status(500)
          .json(`error with route: ${postsObj.error || countObj.error}`);
      }

      return res.status(200).json({ posts, count });
    } catch (error) {
      console.error(error);
      res.status(500).json("An error occurred");
    }
  })
);
