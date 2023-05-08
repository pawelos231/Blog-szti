import {getUserDataByEmail} from '../db/user'
import { ReceivedLoginData } from '@interfaces/UserLoginInterface'

export const CheckIfEmailExists = async (email: string): Promise<boolean | ReceivedLoginData> => {

    const {result, error} = await getUserDataByEmail(email)
    if(result != null){
        console.log(result)
        return result
    }
    return false
    
   
}