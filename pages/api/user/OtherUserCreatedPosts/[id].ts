import { getPostsByUser } from "@server/db/posts";

export default async function Handler(req, res) {
    const {id} = req.query
    const {result, error} = await getPostsByUser(String(id))
 
    if(error) {
        console.log(error)
    }

    res.status(200).json(result)
}