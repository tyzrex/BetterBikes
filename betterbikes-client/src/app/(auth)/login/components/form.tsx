"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { LoginSchemaType, loginSchema } from "../schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (data: LoginSchemaType) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (response?.error === null) {
      toast({
        title: `Successfully Logged In as ${data.email}`,
        description: new Date().toTimeString(),
        className: "bg-[#5cb85c] text-white",
      });
      router.replace("/");
    } else {
      toast({
        title: `${response?.error}`,
        description: new Date().toTimeString(),
        variant: "destructive",
        action: (
          <ToastAction className="border p-2" altText="Try again">
            Try again
          </ToastAction>
        ),
      });
      console.log(response?.error);
    }
  };

  useEffect(() => {
    const errorParams = params.get("error");

    if (errorParams) {
      setLoginError(errorParams);
    }
  }, []);

  useEffect(() => {
    if (loginError) {
      toast({
        title: loginError,
        description: new Date().toTimeString(),
        variant: "destructive",
      });
    }
  }, [loginError]);

  return (
    <>
      <div
        className="flex-col items-center justify-center my-10 lg:w-[40%]
        bg-white shadow-lg rounded-xl w-full lg:px-10 text-main-foreground sm:px-6 sm:py-10 px-10 py-6
        "
      >
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <h1
            tabIndex={0}
            className="focus:outline-none text-3xl font-bold leading-6"
          >
            Welcome to<span className="text-main-foreground"> BETTER</span>
            <span className="text-main-accent">B</span>IKES
          </h1>
          <h2
            tabIndex={0}
            className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
          >
            Dont have account?{" "}
            <Link
              prefetch={false}
              href="/register"
              className="hover:text-main-accent focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-accent-2 cursor-pointer"
            >
              {" "}
              Sign up here
            </Link>
          </h2>
          <div className="w-full flex items-center justify-between py-5">
            <hr className="w-full bg-gray-400" />

            <hr className="w-full bg-gray-400" />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none text-gray-800"
            >
              {" "}
              Email{" "}
            </label>
            <input
              {...register("email")}
              className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-500 text-gray-800 py-3 w-full pl-3 mt-2"
              placeholder="e.g: john@gmail.com "
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
          <div className="mt-8">
            <button
              role="button"
              disabled={isSubmitting}
              className="accent-btn w-full flex-center"
              type="submit"
            >
              {isSubmitting && (
                <span
                  className="animate-spin inline-block w-3 h-3 border-[3px] border-current border-t-transparent text-white rounded-full mr-2"
                  role="status"
                  aria-label="loading"
                ></span>
              )}
              {isSubmitting ? "Checking Credentials" : "Login"}
            </button>
          </div>
        </form>
        <div className="w-full flex items-center justify-between py-5">
          <hr className="w-full bg-gray-400" />
          <p className="text-base font-medium leading-4 px-2.5 text-gray-500">
            OR
          </p>
          <hr className="w-full bg-gray-400" />
        </div>
        <button
          aria-label="Continue with google"
          role="button"
          onClick={() => {
            signIn("google", {
              redirect: false,
            });
          }}
          className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-5 hover:bg-gray-100"
        >
          <FcGoogle className="w-5 h-5" />
          <p className="text-base font-medium ml-4 text-gray-700">
            Continue with Google
          </p>
        </button>
      </div>
    </>
  );
}
