import { NextApiResponse, NextApiRequest } from "next"
export default function Handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(401).send({data: "NOT authenticated"}) 
}