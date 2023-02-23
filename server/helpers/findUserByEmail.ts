import {getUserDataByEmail} from '../db/user'

export const CheckIfEmailExists = async (email: string): Promise<boolean | any> => {

    const {ProfileDescription, errorGet}: any = await getUserDataByEmail(email)
    if(ProfileDescription != null){
        return ProfileDescription
    }
    return true
    
   
}