import { NOTAUTH } from "@constants/auth";
import { NextRouter } from "next/router";
export const CheckIfLoggedIn = (text: string ,router: NextRouter) => {
 
    if (text && text === NOTAUTH) {
        router.push("/userLogin/register");
        return
    }

}