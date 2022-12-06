import { NextApiRequest, NextApiResponse } from "next";
import mongoose from 'mongoose'

export default async function Handler(req: NextApiRequest, res: NextApiResponse){
    await mongoose.connect(process.env.DATABASE_URL)
    
    const token: string = String(req.headers["authorization"])

    if(token == "null"){
        console.log("niezalogowany")
        res.status(401).send({text: "NOT authenticated"}) 
        return
    }

    console.log(req.body)
    res.status(200).json({text: "połączenie działą"})
}