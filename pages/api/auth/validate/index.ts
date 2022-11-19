import { NextApiResponse, NextApiRequest } from "next"
export default function Handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).send({data: "siema"}) 
}