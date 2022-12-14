import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  LoggingInterface,
  ReposneInterface,
} from "../../interfaces/reponseTypeRegister";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";

const Login = () => {
  const [email, SetEmail] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  const [button, setButton] = useState<boolean>(true);
  const [temp, setTemp] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(2);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const router: NextRouter = useRouter();

  const SendLoginRequest = async (e: any) => {
    e.preventDefault();

    setButton(false);
    setLoadingStatus(true);
    await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((res: Response) => res.json())
      .then((data: LoggingInterface & ReposneInterface) => {
        setStatus(data?.message?.status);
        if (data?.token) {
          console.log(data?.name);
          localStorage.setItem("profile", data?.token);
          localStorage.setItem("userName", data?.name);
        }
        setLoadingStatus(false);
        setTemp(true);
        setTimeout(() => {
          setTemp(false);
          if (data?.message?.status === 1) {
            router.push("/");
          }
        }, 1000);
      });
  };
  console.log(loadingStatus);
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
              placeholder="tw??j email"
            />
            <input
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                SetPassword(e.target.value)
              }
              type="text"
              className="bg-red-100 p-2"
              placeholder="has??o"
            />
            {button ? (
              <input
                type="submit"
                placeholder="wy??lij"
                className="bg-black rounded-sm transition-all duration-75 cursor-pointer text-white p-2 hover:text-white hover:bg-blue-700"
              />
            ) : null}
          </form>
          {button ? (
            <p className="mt-6 text-center">
              <Link href={"/userLogin/register"}>
                <p>Chc?? si?? zarejestrowa??</p>
              </Link>
            </p>
          ) : null}
        </div>
      </div>
      <div className="absolute top-0 mt-32 flex w-screen justify-center  ">
        {loadingStatus ? (
          <div className="absolute top-0 text-black">
            {" "}
            <CircularProgress size={80} thickness={2.0} color="inherit" />{" "}
          </div>
        ) : null}
        {temp ? (
          status == 0 ? (
            <div className="text-3xl text-red-700 font-thin p-2 rounded-lg ">
              ten email wyst??puje juz w bazie danych
            </div>
          ) : status == 1 ? (
            <div className="text-3xl text-green-700 font-thin p-2 rounded-lg ">
              uda??o si?? doda?? uzytkownika
            </div>
          ) : null
        ) : null}
      </div>
    </>
  );
};

export default Login;
