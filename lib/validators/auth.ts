import * as Yup from "yup";
import { AuthView } from "@constants/helperEnums";
import { EMAIL_VALIDATOR, PASSWORD_VALIDATIOR } from "@constants/validators";

export const AuthValidator = (view) => {
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
  return validationSchema;
};
