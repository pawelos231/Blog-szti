import { NotAuth } from "@components/userDetails/constants";
import { NextRouter } from "next/router";
export const CheckIfLoggedIn = (text: string ,router: NextRouter) => {
 
    if (text && text === NotAuth) {
        router.push("/userLogin/register");
        return
    }

}