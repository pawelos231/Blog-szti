import { useFormik, Formik, FastField, ErrorMessage, Form } from "formik";
import { FormEvent } from "react";
import * as Yup from "yup";

interface Register {
  name: string;
  email: string;
  password: string;
}
const CustomErrrorComp = ({ nameOfField }: { nameOfField: string }) => {
  return (
    <>
      <ErrorMessage name={nameOfField}>
        {(errorMsg: string) => <div className="text-red-800">{errorMsg}</div>}
      </ErrorMessage>
    </>
  );
};

const temp = (): JSX.Element => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema: Yup.ObjectSchema<{}, Yup.AnyObject, {}, ""> =
    Yup.object({
      name: Yup.string().min(1).max(40).required("required"),
      email: Yup.string()
        .min(1)
        .max(60)
        .email("Invalid email")
        .required("required"),
      password: Yup.string().min(1).max(32).required("required"),
    });

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      console.log("submit!");
    },
    validationSchema,
  });

  return (
    <div className="top-32 absolute">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values: Register) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={validationSchema}
        validateOnMount
      >
        <Form>
          <div className="flex m-4 flex-col">
            <FastField type="text" id="name" name="name" />
            <CustomErrrorComp nameOfField="name" />
          </div>
          <div className="flex m-4 flex-col">
            <FastField type="text" id="email" name="email" />
            <CustomErrrorComp nameOfField="email" />
          </div>
          <div className="flex m-4 flex-col">
            <FastField type="text" id="password" name="password" />
            <CustomErrrorComp nameOfField="password" />
          </div>
          <button
            type="submit"
            value="wyślij"
            className="bg-red-300 p-2 cursor-pointer rounded-sm  hover:bg-red-500"
          >
            Wyślij
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default temp;
