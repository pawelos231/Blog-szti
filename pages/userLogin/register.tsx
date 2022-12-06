import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter, NextRouter } from "next/router";
import {
  LoggingInterface,
  ReposneInterface,
} from "../../interfaces/reponseTypeRegister";
import { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
const Register = () => {
  const [name, SetName] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [temp, setTemp] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(2);
  const [button, setButton] = useState<boolean>(true);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const router: NextRouter = useRouter();

  function delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const SendUserDataToVerify = async (e: any) => {
    e.preventDefault();
    setLoadingStatus(true);
    if (name !== "" && email !== "" && password !== "") {
      setButton(false);
      await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      })
        .then((res: Response) => res.json())
        .then((data: LoggingInterface & ReposneInterface) => {
          setLoadingStatus(false);
          setTemp(true);
          setStatus(data?.message?.status);
          if (data?.token) {
            localStorage.setItem("profile", data?.token);
            localStorage.setItem("userName", data?.name);
          }
          setTimeout(() => {
            setTemp(false);
            if (data?.message?.status === 1) {
              router.push("/");
            } else {
              setButton(true);
            }
          }, 1000);
        });
    }
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
            onSubmit={(e: any) => SendUserDataToVerify(e)}
            className="flex-col flex gap-5 "
          >
            <input
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                SetName(e.target.value)
              }
              className="bg-red-100 p-2"
              type="text"
              placeholder="twoja nazwa"
            />
            <input
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              type="email"
              className="bg-red-100 p-2"
              placeholder="email"
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
              <Link href={"/userLogin/login"}>
                <p>Chcę się zalogować</p>
              </Link>
            </p>
          ) : null}
        </div>
      </div>
      <div className="absolute top-0 mt-32 flex w-screen justify-center  ">
        {loadingStatus ? (
          <CircularProgress size={80} thickness={2.0} color="inherit" />
        ) : null}
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

export default Register;
