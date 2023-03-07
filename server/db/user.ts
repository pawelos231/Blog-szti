import clientPromise from "./mongo";
const UserData: any = require("@server/models/UserModel")
import { ResponseWrapper } from "./interfaces/ResponseInterface";
import { ReceivedLoginData } from "@interfaces/UserLoginInterface";

type UserData = Array<ReceivedLoginData>

export const setProfileDescritpion = async (Email: string, description: string): ResponseWrapper<string> => {
    try{
        await clientPromise()
        await UserData.updateOne({
            Email: Email
        }, {
            $set: {
                ProfileDescription: description
            }
        })
        return {result: "udało się zaktualizować informacje profilu"}  
      } catch(error){
          return {error: 'Failed to fetch posts', result: undefined}
      } 
}

export const getUserDataByEmail = async (Email: string): ResponseWrapper<ReceivedLoginData> => {
    try{
        await clientPromise()
        const result: UserData = await UserData.find({Email: Email})
        return {result: result[0]}  
      } catch(error){
          return {error: 'nothing here', result: undefined}
      } 
}

