import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL } from "../Auth/Helper";

const Login = () => {
  const [ErrMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().email().required("Please enter the email"),
    password: yup.string().required("Please enter the password"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    axios
      .post(`${BASE_URL}/login`, data)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("authtoken", res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(err.response.data.message);
      });
  };
  return (
    <div className="h-screen w-screen bg-slate-50 flex justify-center items-center max-sm:px-5">
      <div className="w-[400px] bg-white drop-shadow-lg rounded-xl px-6 py-10 max-sm:w-full max-[990px]:w-[500px]">
        <h1 className="text-center text-3xl font-bold text-[#6c5ce7]">Login</h1>
        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-neutral-700"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  {...register("email")}
                  placeholder="john@gmail.com"
                  className="block w-full rounded-md border-0 pl-2 py-1.5 text-neutral-700 shadow-sm ring-1  ring-gray-300 placeholder:text-neutral-500 focus:outline-none focus:border-[#6c5ce7] focus:ring-[#6c5ce7] sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="mt-1 text-[#6c5ce7] text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold leading-6 text-neutral-700"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  {...register("password")}
                  placeholder="············"
                  className="block w-full rounded-md border-0 pl-2 py-1.5 text-neutral-700 shadow-sm ring-1 ring-gray-300 placeholder:text-neutral-500 focus:outline-none focus:border-[#6c5ce7] focus:ring-[#6c5ce7] sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="mt-1 text-[#6c5ce7] text-sm">
                    {errors.password.message}
                  </p>
                )}
                {ErrMsg && (
                  <p className="mt-1 text-[#6c5ce7] text-sm">{ErrMsg}</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#6c5ce7] hover:bg-[#a29bfe] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?
            <Link
              to="/register"
              className="font-semibold leading-6 text-[#6c5ce7] hover:text-[#a29bfe] ml-1"
            >
              Create a new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
