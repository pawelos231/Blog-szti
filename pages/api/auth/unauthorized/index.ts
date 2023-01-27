import { NextApiResponse, NextApiRequest } from "next"
export default function Handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(401).send({ text: "NOT authenticated" })
}