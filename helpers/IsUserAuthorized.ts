import * as Statues from "@constants/statusCodes"
import { NextRouter } from "next/router"

export type StatusType = (typeof Statues)[keyof typeof Statues]


export const isUserAuthorized = (status: StatusType, router: NextRouter) => {
    
    //diplay message on top of the screen to log in
    if(status === 401){
        router.push("/userLogin/register");
    } 
}