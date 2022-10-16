import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import {
  LoggingInterface,
  ReposneInterface,
} from "../../interfaces/reponseTypeRegister";
const Register = () => {
  const [name, SetName] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [temp, setTemp] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(0);
  const SendUserDataToVerify = async (e: any) => {
    e.preventDefault();

    if (name !== "" && email !== "" && password !== "") {
      setTemp(true);
      await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      })
        .then((res: Response) => res.json())
        .then((data: ReposneInterface & LoggingInterface) => {
          setStatus(data?.status);
          if (data?.token) {
            localStorage.setItem("profile", data?.token);
          }
          setTimeout(() => {
            setTemp(false);
          }, 1000);
        });

      console.log(localStorage.getItem("profile"));
    }
  };
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
              type="text"
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

            <input
              type="submit"
              placeholder="wyślij"
              className="bg-black rounded-sm transition-all duration-75 cursor-pointer text-white p-2 hover:text-white hover:bg-blue-700"
            />
          </form>
          <p className="mt-6 text-center">
            <Link href={"/userLogin/login"}>
              <p>Chcę się zalogować</p>
            </Link>
          </p>
        </div>
      </div>
      <div className="absolute top-0 mt-32 flex w-screen justify-center  ">
        {temp ? (
          status !== 0 ? (
            <div className="text-3xl text-green-700 font-thin p-2 rounded-lg ">
              udało się dodać uzytkownika
            </div>
          ) : (
            <div className="text-3xl text-red-700 font-thin p-2 rounded-lg ">
              ten email występuje juz w bazie danych
            </div>
          )
        ) : null}
      </div>
    </>
  );
};

export default Register;
