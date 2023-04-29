import { NextApiResponse, NextApiRequest } from "next";
import {setProfileDescritpion, getUserDataByEmail} from '@server/db/user'
import { verify } from "@server/helpers/validateToken";
import {GET, POST} from '@constants/reqMeth'
import { METHOD_NOT_ALLOWED } from "@constants/statusCodes";
import { authMiddleware } from "@pages/api/middleware/authMiddleware";

export default authMiddleware(async function Handler(req, res) {

  
   
    const METHOD: string = req.method

    try {
        switch(METHOD) {
            case GET: {
                const {result, error} = await getUserDataByEmail(req.user.Email)
                if(error){
                    console.log(error)
                    return
                }
                res.status(200).json(result)
                break;
            }
    
            case POST:{
                const description: string = req.body
                const {result, error} = await setProfileDescritpion(req.user.Email, description)
                if(error){
                    console.log(error)
                    return
                }
                if(result) res.status(200).json(description) 
                break;
            }
            default:
                res.status(METHOD_NOT_ALLOWED).json({ message: 'Method Not Allowed' })
                break;
        }
    } catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
    
})