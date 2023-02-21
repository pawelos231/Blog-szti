import LoginUserView from "@components/LoginUserView";
import { AuthView } from "@constants/AuthEnums";
import Link from "next/link";
const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <LoginUserView view={AuthView.Login} />
      <div className="text-white mt-10">
        <Link href={"./register"}>
          <a>I want to register</a>
        </Link>
      </div>
    </div>
  );
};
export default Login;
