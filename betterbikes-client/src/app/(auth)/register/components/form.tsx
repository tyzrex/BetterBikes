"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { RegisterSchemaType, registerSchema } from "../schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // const response = await loginUser(data);
    // console.log(response);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="flex items-center justify-center my-10 w-full lg:w-[40%]"
      >
        <div className="bg-white shadow-lg rounded-xl w-full lg:px-10 text-main-foreground sm:px-6 sm:py-10 px-10 py-6">
          <h1
            tabIndex={0}
            className="focus:outline-none text-3xl font-bold leading-6 "
          >
            Register to BETTER
            <span className="text-main-accent">B</span>IKES
          </h1>

          <h2
            tabIndex={0}
            className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
          >
            Already Have an Account ?{" "}
            <Link
              prefetch={false}
              href="/login"
              className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-accent-2 cursor-pointer"
            >
              {" "}
              Login here
            </Link>
          </h2>

          <button
            aria-label="Continue with google"
            role="button"
            onClick={() => {
              signIn("google");
            }}
            className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-10 hover:bg-gray-100"
          >
            <FcGoogle className="w-5 h-5" />
            <p className="text-base font-medium ml-4 text-gray-700">
              Continue with Google
            </p>
          </button>

          <div className="w-full flex items-center justify-between py-5">
            <hr className="w-full bg-gray-400" />
            <p className="text-base font-medium leading-4 px-2.5 text-gray-500">
              OR
            </p>
            <hr className="w-full bg-gray-400" />
          </div>
          <div>
            <label
              htmlFor="fullname"
              className="text-sm font-medium leading-none text-gray-800"
            >
              {" "}
              Full Name{" "}
            </label>
            <input
              {...register("fullName")}
              className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
              placeholder="e.g: Fatafat Sewa "
            />
            {errors.fullName && (
              <p className="text-red-500">{`${errors.fullName.message}`}</p>
            )}
          </div>
          <div className="mt-6 w-full">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none text-gray-800"
            >
              {" "}
              Email{" "}
            </label>
            <input
              {...register("email")}
              className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
              placeholder="e.g: fatafatsewa@fs.com "
            />
            {errors.email && (
              <p className="text-red-500">{`${errors.email.message}`}</p>
            )}
          </div>
          <div className="mt-6 w-full">
            <label
              htmlFor="myInput"
              className="text-sm font-medium leading-none text-gray-800"
            >
              {" "}
              Password{" "}
            </label>
            <div className="relative flex items-center justify-center">
              <input
                {...register("password")}
                type="password"
                placeholder="********"
                className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>
            {errors.password && (
              <p className="text-red-500">{`${errors.password.message}`}</p>
            )}
          </div>
          <div className="mt-6 w-full">
            <label
              htmlFor="myInput"
              className="text-sm font-medium leading-none text-gray-800"
            >
              {" "}
              Confirm Password{" "}
            </label>
            <div className="relative flex items-center justify-center">
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="********"
                className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
            )}
          </div>
          <div className="mt-8">
            <button
              role="button"
              disabled={isSubmitting}
              className="main-btn w-full flex-center"
              type="submit"
            >
              {isSubmitting && (
                <span
                  className="animate-spin inline-block w-3 h-3 border-[3px] border-current border-t-transparent text-white rounded-full mr-2"
                  role="status"
                  aria-label="loading"
                ></span>
              )}
              {isSubmitting ? "Creating New Account" : "Register"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
