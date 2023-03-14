import {getUserDataByEmail} from '../db/user'

export const CheckIfEmailExists = async (email: string): Promise<boolean | any> => {

    const {result, errorGet}: any = await getUserDataByEmail(email)
    console.log(result, "chuuuuuuuuj")
    if(result != null){
        console.log(result)
        return result
    }
    return false
    
   
}