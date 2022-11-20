import { NextApiResponse, NextApiRequest } from "next"
export default function Handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("TEST")
    res.status(401).send({data: "NOT authenticated"}) 
}