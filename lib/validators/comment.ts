import * as yup from "yup";
const DEFAULT_MIN_LEN_SHORTD = 50;
const DEFAULT_MAX_LEN_SHORTD = 600;

export const CommentValidator = yup
  .object()
  .shape({
    content: yup
      .string()
      .required("content is required")
      .min(
        DEFAULT_MIN_LEN_SHORTD,
        `comment must have at least ${DEFAULT_MIN_LEN_SHORTD} characters`
      )
      .max(
        DEFAULT_MAX_LEN_SHORTD,
        `comment can have at most ${DEFAULT_MAX_LEN_SHORTD} characters`
      ),
  })
  .required();

export type CommentCreationRequest = Required<
  yup.InferType<typeof CommentValidator>
>;
