import {getUserDataByEmail} from '../db/user'

export const CheckIfEmailExists = async (email: string): Promise<boolean | any> => {

    const {ProfileDescription, errorGet}: any = await getUserDataByEmail(email)
    if(ProfileDescription != null && ProfileDescription.length != 0){
        return ProfileDescription
    }
    return false
    
   
}