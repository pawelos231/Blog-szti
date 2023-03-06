import { Formik, FastField, ErrorMessage, Form } from "formik";
import { useState } from "react";
import {
  LoggingInterface,
  ReposneInterface,
} from "@interfaces/reponseTypeRegister";
import { REGISTER_URL, LOGIN_URL } from "@constants/apisEndpoints";
import { useRouter, NextRouter } from "next/router";
import { POST } from "@constants/reqMeth";
import * as Yup from "yup";
import { CircularProgress } from "@material-ui/core";
import { AuthView } from "@constants/AuthEnums";
import { EMAIL_VALIDATOR, PASSWORD_VALIDATIOR } from "@constants/validators";
import styles from "./styles.module.css";

interface Register {
  name: string;
  email: string;
  password: string;
}

const Error = ({ nameOfField }: { nameOfField: string }): JSX.Element => {
  return (
    <>
      <ErrorMessage name={nameOfField}>
        {(errorMsg: string) => <div className="text-red-800">{errorMsg}</div>}
      </ErrorMessage>
    </>
  );
};

const Loader = ({ loadingStatus }: { loadingStatus: boolean }): JSX.Element => {
  return (
    <>
      {loadingStatus ? (
        <div>
          {" "}
          <CircularProgress size={80} thickness={2.0} color="inherit" />{" "}
        </div>
      ) : null}
    </>
  );
};

const DisplayText = ({
  completed,
  messageStatus,
  messageFromResponse,
}): JSX.Element => {
  return (
    <div>
      {completed ? (
        messageStatus == 0 ? (
          <div className="text-3xl text-red-700 font-thin p-2 rounded-lg text-center ">
            {messageFromResponse}
          </div>
        ) : messageStatus == 1 ? (
          <div className="text-3xl text-green-700 font-thin p-2 rounded-lg text-center">
            {messageFromResponse}
          </div>
        ) : null
      ) : null}
    </div>
  );
};

const LoginUserView = ({ view }): JSX.Element => {
  const [visibleButton, setVisibleButton] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [messageStatus, setMessageStatus] = useState<number>(2);
  const [messageFromResponse, setMessageFromResponse] = useState<string>("");

  const INITIAL_VALUES: Register = {
    name: "",
    email: "",
    password: "",
  };

  const router: NextRouter = useRouter();
  const validationSchema: Yup.ObjectSchema<{}, Yup.AnyObject, {}, ""> =
    Yup.object().shape(
      {
        name: Yup.string().when("name", () => {
          if (view === AuthView.Register) {
            return Yup.string()
              .min(1, "imie moze mieć mininmalnie 10 znaków")
              .max(60, "imie moze mieć maksymalnie 60 znaków")
              .required("required");
          } else if (view === AuthView.Login) {
            return Yup.mixed().notRequired();
          }
        }),
        email: Yup.string()
          .email("invalid email")
          .min(5, "minimalnie 5 znaków")
          .max(60, "maksymalnie 60 znaków")
          .required("required")
          .matches(EMAIL_VALIDATOR, "invalid email"),
        password: Yup.string().when("password", () => {
          if (AuthView.Login == view) {
            return Yup.string().required("required");
          } else if (AuthView.Register == view) {
            return Yup.string()
              .min(10, "hasło musi mieć minimalnie 10 znaków")
              .max(32, "hasło moze mieć maksymalnie 32 znaki")
              .required("required")
              .matches(
                PASSWORD_VALIDATIOR,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"
              );
          }
        }),
      },
      [
        ["name", "name"],
        ["password", "password"],
      ]
    );

  const RegisterHandler = async ({
    name,
    email,
    password,
  }: Register): Promise<void> => {
    setVisibleButton(true);
    setLoadingStatus(true);
    await fetch(REGISTER_URL, {
      method: POST,
      body: JSON.stringify({ name, email, password }),
    })
      .then((res: Response) => res.json())
      .then((data: LoggingInterface & ReposneInterface) => {
        setLoadingStatus(false);
        setCompleted(true);
        setMessageFromResponse(data?.message?.text);
        setMessageStatus(data?.message?.status);
        if (data?.token) {
          localStorage.setItem("profile", data?.token);
          localStorage.setItem("userName", data?.name);
        }
        setTimeout(() => {
          setCompleted(false);
          if (data?.message?.status === 1) {
            router.push("/");
          } else {
            setVisibleButton(false);
          }
        }, 500);
      });
  };

  const LoginHanlder = async ({ email, password }: Omit<Register, "name">) => {
    setVisibleButton(true);
    setLoadingStatus(true);
    await fetch(LOGIN_URL, {
      method: POST,
      body: JSON.stringify({ email, password }),
    })
      .then((res: Response) => res.json())
      .then((data: LoggingInterface & ReposneInterface) => {
        setMessageStatus(data?.message?.status);
        setMessageFromResponse(data?.message?.text);
        if (data?.token) {
          localStorage.setItem("profile", data?.token);
          localStorage.setItem("userName", data?.name);
        }
        setLoadingStatus(false);
        setCompleted(true);
        setTimeout(() => {
          setCompleted(false);
          if (data?.message?.status === 1) {
            router.push("/");
          } else {
            setVisibleButton(false);
          }
        }, 500);
      });
  };

  return (
    <div className="w-[30%]">
      <Loader loadingStatus={loadingStatus} />
      <DisplayText
        completed={completed}
        messageFromResponse={messageFromResponse}
        messageStatus={messageStatus}
      />

      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={view == AuthView.Register ? RegisterHandler : LoginHanlder}
        validationSchema={validationSchema}
      >
        <Form className={styles.container}>
          {view == AuthView.Register ? (
            <div className="flex m-2 flex-col  w-full items-center justify-center">
              <FastField
                type="text"
                id="name"
                name="name"
                placeholder="imie"
                className={styles.field}
              />
              <Error nameOfField="name" />
            </div>
          ) : null}

          <div className="flex m-2 flex-col items-center w-full  justify-center">
            <FastField
              className={styles.field}
              type="text"
              id="email"
              name="email"
              placeholder="email"
            />
            <Error nameOfField="email" />
          </div>

          <div className="flex m-2 flex-col items-center w-full  justify-center">
            <FastField
              className={styles.field}
              type="text"
              id="password"
              name="password"
              placeholder="hasło"
            />
            <Error nameOfField="password" />
          </div>
          <button
            type="submit"
            value="wyślij"
            disabled={visibleButton}
            className={styles.buttonSend}
          >
            Wyślij
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginUserView;
