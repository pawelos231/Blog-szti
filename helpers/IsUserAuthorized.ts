import * as Statues from "@constants/statusCodes"
import { NextRouter } from "next/router"
import { useRouter } from "next/router"

export type StatusType = (typeof Statues)[keyof typeof Statues]

type ResponseRedux = {
    Unathorized: boolean,
    ErrorMessage: string
}

export const isUserAuthorized = (status: StatusType) => {
    
    const router: NextRouter = useRouter();
    //diplay message on top of the screen to log in
    if(status === 401){
        router.push("/userLogin/register");
    } 
}