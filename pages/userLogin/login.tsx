import LoginUserView from "@components/LoginUserView";
import { AuthView } from "@constants/AuthEnums";
import Link from "next/link";
const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginUserView view={AuthView.Login} />
    </div>
  );
};
export default Login;
