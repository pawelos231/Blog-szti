import { NextApiRequest, NextApiResponse } from "next";
import {verify} from '../../../server/helpers/validateToken'
import mongoose from "mongoose";
import {VerifiedToken} from "../../../interfaces/Token"
const BlogPosts = require("../../../server/models/BlogPosts")

interface LikedPosts {
    flag: number;
    ValueToPass: number;
    itemId: string;
    WhoLiked: Array<string>;
  }

  type ResponseData = {
    text: string
  }

const checkIfToAdd = (flag: number, name: string, whoLiked: string[]): string[] => 
{
    if(flag === 1){
        if(!whoLiked.find((item: string) => item == name)){
            const newArray: string[] = [...whoLiked, name]
            return newArray
        }
        return whoLiked
    }

    else if(flag === -1) {
        const newArr: string[] = whoLiked.filter((item: string) => item !== name)

        if(newArr.length === 0)
        {
            return []
        }
        return newArr
    } 

    else 
    {
        console.log("niepoprawne dane")
        return []
    }

}
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>){
    
    const dataFromReq: LikedPosts = JSON.parse(req.body)
    await mongoose.connect(process.env.DATABASE_URL)
    
    const token: string = String(req.headers["authorization"])
    if(token == "null"){
        console.log("niezalogowany")
        res.status(401).send({text: "NOT authenticated"}) 
        return
    }

    let decodedData: VerifiedToken = await verify(token, process.env.ACCESS_TOKEN_SECRET)

    const NewArrComp: string[] = checkIfToAdd(dataFromReq.flag, decodedData.Name, dataFromReq.WhoLiked)

    await BlogPosts.updateOne({
        _id: dataFromReq.itemId
    },{
        $set: {
            Likes: dataFromReq.ValueToPass,
            WhoLiked: NewArrComp
        }
    })

    
    if(dataFromReq.flag === 1)
    {
        res.status(200).json({text: "pomyślnie dodano like'a"})
    }

    else if(dataFromReq.flag === -1)
    {
        res.status(200).json({text: "pomyślnie odlikowano"})
    }
    
    else
    {
        res.status(200).json({text: "coś się wysypało"})
    }
    
}