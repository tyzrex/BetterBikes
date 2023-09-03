"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import LoginSvg from "@/../public/assets/heroImage.webp";
import Image from "next/image";
import Link from "next/link";

interface LoginData {
  name: string;
  password: string;
}

export default function LoginPage() {
  const [data, setData] = useState<LoginData>({
    name: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [loginError, setLoginError] = useState<{
    name?: string;
    password?: string;
  }>({});
  const [subError, setSubError] = useState({});

  const validate = () => {
    let error: { name?: string; password?: string } = {};
    if (!data.name) {
      error.name = "Username is required";
    }
    if (!data.password) {
      error.password = "Password is required";
    }
    setLoginError(error);
    return error;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validate();
    if (Object.keys(error).length === 0) {
      // Assuming loginUser is defined elsewhere
      // loginUser(data, subError, setSubError);
      console.log("Successful login");
    } else {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="bg-white ">
        <main className="relative h-screen lg:min-h-screen flex-center overflow-hidden">
          <div className="absolute -bottom-60 w-screen">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#e73538"
                fill-opacity="1"
                d="M0,256L48,234.7C96,213,192,171,288,138.7C384,107,480,85,576,74.7C672,64,768,64,864,90.7C960,117,1056,171,1152,165.3C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                data-darkreader-inline-fill=""
              ></path>
            </svg>
          </div>
          <div className="absolute rotate-180 -scale-x-100 -top-36 w-screen">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#e73538"
                fill-opacity="1"
                d="M0,128L48,117.3C96,107,192,85,288,106.7C384,128,480,192,576,208C672,224,768,192,864,202.7C960,213,1056,267,1152,272C1248,277,1344,235,1392,213.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                data-darkreader-inline-fill=""
              ></path>
            </svg>
          </div>
          <div className="bg-white shadow-sm rounded-2xl border flex">
            <section className="flex items-center  justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6">
              <div className="max-w-xl lg:max-w-3xl">
                <p className="text-2xl text-center font-bold text-main-foreground">
                  WELCOME TO
                </p>
                <h1 className="text-5xl mt-3 text-center font-bold text-main-foreground">
                  BETTER
                  <span className="text-main-accent">B</span>
                  IKES
                </h1>

                <p className="mt-4 text-center leading-relaxed text-gray-400">
                  Login to your account to continue.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 gap-6">
                  <div className="flex flex-col gap-6 justify-center">
                    <div>
                      <div className="py-2">
                        <h1 className="text-foreground">Username</h1>
                      </div>
                      <input
                        onChange={handleChange}
                        type="text"
                        id="username"
                        name="name"
                        autoComplete="username"
                        placeholder="Username"
                        className="mt-1 p-3 w-full border border-gray-300"
                      />
                      {loginError.name && (
                        <p className="text-red-500">{loginError.name}</p>
                      )}
                    </div>

                    <div>
                      <div className="py-2">
                        <h1 className="text-foreground">Password</h1>
                      </div>
                      <input
                        onChange={handleChange}
                        type="password"
                        id="Password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="********"
                        className="mt-1 p-3 w-full  border border-gray-300 "
                      />
                      {loginError.password && (
                        <p className="text-red-500">{loginError.password}</p>
                      )}
                    </div>

                    <div className=" flex flex-col items-center gap-4">
                      <button type="submit" className="accent-btn w-full">
                        Login
                      </button>

                      <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                        Don't have an account?
                        <Link
                          href="/register"
                          className="text-gray-700 underline hover:text-indigo-300"
                        >
                          Sign Up
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </section>

            <section className="hidden lg:block lg:col-span-5 relative">
              <div className="h-full absolute w-full "></div>
              <div className="h-full flex-col-center bg-main-accent py-4 rounded-r-2xl">
                <p className="text-white text-2xl font-bold">
                  Rent a bike, ride a bike.
                </p>

                <Image
                  src={LoginSvg}
                  alt="Login"
                  className="object-cover object-center
                  
                  "
                  width={500}
                  height={500}
                />

                <p className="text-white text-2xl font-bold">
                  Find your perfect companion.
                </p>
              </div>
            </section>
          </div>
        </main>
      </section>
    </div>
  );
}
