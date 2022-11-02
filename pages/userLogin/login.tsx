import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  LoggingInterface,
  ReposneInterface,
} from "../../interfaces/reponseTypeRegister";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  const [email, SetEmail] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  const [button, setButton] = useState<boolean>(true);
  const [temp, setTemp] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(2);
  const router: NextRouter = useRouter();

  const SendLoginRequest = async (e: any) => {
    e.preventDefault();
    setTemp(true);
    setButton(false);
    await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((res: Response) => res.json())
      .then((data: LoggingInterface & ReposneInterface) => {
        setStatus(data?.message?.status);
        if (data?.token) {
          localStorage.setItem("profile", data?.token);
        }
        setTimeout(() => {
          setTemp(false);
          if (data?.message?.status === 1) {
            router.push("/");
          }
        }, 1000);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("profile")) {
      router.push("/");
    }
  }, []);
  return (
    <>
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
              placeholder="twój email"
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
            {button ? (
              <input
                type="submit"
                placeholder="wyślij"
                className="bg-black rounded-sm transition-all duration-75 cursor-pointer text-white p-2 hover:text-white hover:bg-blue-700"
              />
            ) : null}
          </form>
          {button ? (
            <p className="mt-6 text-center">
              <Link href={"/userLogin/register"}>
                <p>Chcę się zarejestrować</p>
              </Link>
            </p>
          ) : null}
        </div>
      </div>
      <div className="absolute top-0 mt-32 flex w-screen justify-center  ">
        {temp ? (
          status == 0 ? (
            <div className="text-3xl text-red-700 font-thin p-2 rounded-lg ">
              ten email występuje juz w bazie danych
            </div>
          ) : status == 1 ? (
            <div className="text-3xl text-green-700 font-thin p-2 rounded-lg ">
              udało się dodać uzytkownika
            </div>
          ) : null
        ) : null}
      </div>
    </>
  );
};

export default Login;
