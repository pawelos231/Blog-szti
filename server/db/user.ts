import clientPromise from "./mongo";
const UserData: any = require("@server/models/UserModel")
import { ResponseWrapper } from "./interfaces/ResponseInterface";
import { ReceivedLoginData } from "@interfaces/UserLoginInterface";

type UserData = ReceivedLoginData

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
          return {error: 'Nie udało się zaaktualizować informacji na temat profilu', result: undefined}
      } 
}

export const getUserDataByEmail = async (Email: string): ResponseWrapper<ReceivedLoginData> => {
    try{
        await clientPromise()
        const result: UserData = await UserData.findOne({Email})
        return {result}  
      } catch(error){
          return {error: 'nothing here', result: undefined}
      } 
}
export type UserWithoutPassword = Omit<UserData, "Password">

export const getUserByEmailWithoutPassword = async (Email: string): ResponseWrapper<UserWithoutPassword> => {
    try{
        await clientPromise()
        
        const result: UserData = await UserData.findOne({Email},"Name Email ProfileImage ProfileDescription createdAt updatedAt" )
        return {result}  
      } catch(error){
          return {error: 'nothing here', result: undefined}
      } 
}


export const getAllUsers = async (): ResponseWrapper<UserWithoutPassword[]> => {
    try{
        await clientPromise()
        const result: UserWithoutPassword[] = await UserData.find({}, "Name Email ProfileImage ProfileDescription createdAt updatedAt" )
        return {result}  
      } catch(error){
          return {error, result: undefined}
      } 
}