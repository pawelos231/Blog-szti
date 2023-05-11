import { getLikedUserPosts } from "@server/db/posts";
export default async function Handler(req, res) {
    const {id} = req.query
    const {result, error} = await getLikedUserPosts(String(id))
 
    if(error) {
        console.log(error)
    }
    console.log(result)

    res.status(200).json(result)
}