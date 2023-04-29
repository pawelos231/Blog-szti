import * as React from "react";
import { AuthView } from "@constants/helperEnums";
import Link from "next/link";
import LoginUserView from "@components/LoginUserView";
const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <LoginUserView view={AuthView.Register} />
      <div className="text-white mt-10">
        <Link href={"./login"}>
          <a>I want to login</a>
        </Link>
      </div>
    </div>
  );
};

export default Register;
