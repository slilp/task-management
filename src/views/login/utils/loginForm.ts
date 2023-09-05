import * as yup from "yup";

export type LoginFormType = {
  username: string;
  password: string;
};

export const loginFormValidationSchema = () =>
  yup.object({
    username: yup.string().required("required field").email("invalid format"),
    password: yup.string().required("required field"),
  });
