import LoginUserView from "@components/LoginUserView";
import { AuthView } from "@constants/AuthEnums";
const Login = () => {
  <>
    <LoginUserView view={AuthView.Login} />
  </>;
};
export default Login;
