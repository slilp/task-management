// main
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Controller, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

// component
import Button from "components/atoms/Button";
import TextField from "components/atoms/TextField";

// util
import {
  LoginFormType,
  loginFormValidationSchema,
} from "views/login/utils/loginForm";

function Login() {
  const { push } = useRouter();
  const resolver: Resolver<LoginFormType> = yupResolver(
    loginFormValidationSchema()
  );
  const [isError, setIsError] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const { handleSubmit, control, setValue } = useForm<LoginFormType>({
    resolver,
  });
  const onSubmitLogin = (data: LoginFormType) => {
    setIsSigning(true);
    signIn("credentials", {
      username: data.username,
      password: data.password,
      callbackUrl: "/",
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        localStorage.setItem("username", data.username);
        push("/");
      } else {
        setIsSigning(false);
        setIsError(true);
      }
    });
  };

  useEffect(() => {
    const recentUser = localStorage.getItem("username");
    recentUser && setValue("username", recentUser);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center p-5"
      style={{ height: "100dvh" }}
    >
      <Head>
        <title>Log in</title>
      </Head>
      <div className="rounded-lg shadow-2xl p-5 w-full md:w-[500px] border border-gray-200">
        <Image
          alt="avatar"
          height={80}
          width={80}
          src="/folder.png"
          style={{ margin: "auto" }}
        />
        <h1 className="text-3xl font-bold mb-4">Log in</h1>
        <h3 className="font-bold text-xl mb-5">Welcome To Task Management</h3>
        <hr />
        <form className="flex flex-col gap-4 mt-5">
          {isError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
              data-testid="login-fail-message"
            >
              Invalid username or password
            </div>
          )}
          <div>
            <h6 className="mb-2">Username</h6>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  id="login-username"
                  placeholder="username@email.com"
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
          </div>
          <div>
            <h6 className="mb-2">Password</h6>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                />
              )}
            />
          </div>
          <Button
            data-testid="login-btn"
            onClick={handleSubmit(onSubmitLogin)}
            disabled={isSigning}
          >
            {isSigning ? (
              <div className="flex gap-4 justify-center items-center">
                <svg
                  className="w-5 h-5 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx={12}
                    cy={12}
                    r={10}
                    stroke="currentColor"
                    strokeWidth={4}
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sign In...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
