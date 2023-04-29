import { NextApiRequest, NextApiResponse } from "next";
import { verify } from '@server/helpers/validateToken'
import { likePost } from "@server/db/posts";

interface LikedPosts {
    flag: number;
    ValueToPass: number;
    itemId: string;
    WhoLiked: Array<string>;
}

type ResponseData = {
    text: string
    Name: string
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
export default async function handler(req: NextApiRequest, res: NextApiResponse<Partial<ResponseData>>) {

    const {flag, WhoLiked, itemId, ValueToPass}: LikedPosts = JSON.parse(req.body)

    const token: string = String(req.headers["authorization"])

    if (token == "null") {
        console.log("niezalogowany")
        res.status(401).send({ text: "NOT authenticated" })
        return
    }

    const {Name}: any = await verify(token, process.env.ACCESS_TOKEN_SECRET)
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

}