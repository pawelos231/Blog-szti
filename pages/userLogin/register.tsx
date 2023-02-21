import * as React from "react";
import { AuthView } from "@constants/AuthEnums";
import LoginUserView from "@components/LoginUserView";
const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginUserView view={AuthView.Register} />
    </div>
  );
};

export default Register;
