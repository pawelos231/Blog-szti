import clientPromise from "./mongo";
const UserData: any = require("@server/models/UserModel")

export const setProfileDescritpion = async (Email: string, description: string) => {
    try{
        await clientPromise()
        await UserData.updateOne({
            Email: Email
        }, {
            $set: {
                ProfileDescription: description
            }
        })
        return {message: "udało się zaktualizować informacje profilu"}  
      } catch(error){
          return {errorPost: 'Failed to fetch posts'}
      } 
}
export const getUserDataByEmail = async (Email: string) => {
    try{
        await clientPromise()
        const result = await UserData.find({Email: Email})
        return {ProfileDescription: result}  
      } catch(error){
          return {errorGet: 'Failed to fetch posts'}
      } 
}

