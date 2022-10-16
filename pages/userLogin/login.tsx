import * as React from "react";
import { useState } from "react";
import Link from "next/link";
const Login = () => {
  const [email, SetEmail] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  const SendLoginRequest = async (e: any) => {
    e.preventDefault();
    await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((res: Response) => res.json())
      .then((data: any) => console.log(data));
  };
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div>
        <form
          onSubmit={(e: any) => SendLoginRequest(e)}
          className="flex-col flex gap-5 "
        >
          <input
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              SetEmail(e.target.value)
            }
            className="bg-red-100 p-2"
            type="text"
            placeholder="twoja nazwa"
          />
          <input
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              SetPassword(e.target.value)
            }
            type="text"
            className="bg-red-100 p-2"
            placeholder="hasło"
          />
          <input
            type="submit"
            placeholder="wyślij"
            className="bg-black rounded-sm transition-all duration-75 cursor-pointer text-white p-2 hover:text-white hover:bg-blue-700"
          />
        </form>
        <p className="mt-6 text-center">
          <Link href={"/userLogin/register"}>
            <p>Chcę się zarejestrować</p>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
