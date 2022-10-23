const UserData = require("../models/UserModel")

export const CheckIfEmailExists: (email: string) => Promise<boolean | any> = async (email: string) => {

    const data: any = await UserData.findOne({Email : email})
    if(data !== null){
        return data
    }
    return true
    
   
}