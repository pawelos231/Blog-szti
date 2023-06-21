import { z } from "zod";
import * as yup from "yup";
const DEFAULT_MIN_LEN_TITLE = 3;
const DEFAULT_MAX_LEN_TITLE = 64;
const DEFAULT_MIN_LEN_SHORTD = 50;
const DEFAULT_MAX_LEN_SHORTD = 230;

export const PostValidator = yup
  .object()
  .shape({
    title: yup
      .string()
      .required("title is required")
      .min(
        DEFAULT_MIN_LEN_TITLE,
        `title must have at least ${DEFAULT_MIN_LEN_TITLE} characters`
      )
      .max(
        DEFAULT_MAX_LEN_TITLE,
        `title can have at most ${DEFAULT_MAX_LEN_TITLE} characters`
      ),
    shortDescription: yup
      .string()
      .required("short description is required")
      .min(
        DEFAULT_MIN_LEN_SHORTD,
        `short description must have at least ${DEFAULT_MIN_LEN_SHORTD} characters`
      )
      .max(
        DEFAULT_MAX_LEN_SHORTD,
        `short description can have at most ${DEFAULT_MAX_LEN_SHORTD} characters`
      ),
    tags: yup.string().required("you must provide some tags"),
  })
  .required();

// Log the validation errors

