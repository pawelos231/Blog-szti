import { NextApiRequest, NextApiResponse } from "next";
import { verify } from '@server/helpers/validateToken'
import { likePost } from "@server/db/posts";
import { authMiddleware } from "../middleware/authMiddleware";

interface LikedPosts {
    flag: number;
    ValueToPass: number;
    itemId: string;
    WhoLiked: Array<string>;
}

const checkIfToAdd = (flag: number, name: string, whoLiked: string[]): string[] => {
    if (flag === 1) {

        if (!whoLiked.find((item: string) => item === name)) {
            return [...whoLiked, name]
        }

        return whoLiked
    }

    else if (flag === -1) {

        const newArr: string[] = whoLiked.filter((item: string) => item !== name)

        if (newArr.length === 0) {
            return []
        }

        return newArr
    }

    else {
        console.log("niepoprawne dane")
        return []
    }

}
export default authMiddleware(async function handler(req, res) {

    const {flag, WhoLiked, itemId, ValueToPass}: LikedPosts = JSON.parse(req.body)

    const Name = req.user.Name
    const newLikedArr: string[] = checkIfToAdd(flag, Name, WhoLiked)
    const {result, error} = await likePost(newLikedArr, ValueToPass, itemId)

    if (flag === 1) {
        res.status(200).json({ text: "pomyślnie dodano like'a", Name })
    }

    else if (flag === -1) {
        res.status(200).json({ text: "pomyślnie odlikowano", Name })
    }

    else {
        res.status(500).json({ text: error})
    }

})