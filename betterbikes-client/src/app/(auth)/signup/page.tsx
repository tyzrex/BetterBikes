import Image from "next/image";
import Login from "@/../public/assets/whitemoto.webp";
import RegisterForm from "./components/form";

export default async function RegisterPage() {
  return (
    <main>
      <section className="flex-center">
        <div className="max-w-layout flex-center gap-20">
          <div className="hidden lg:block lg:w-[60%]">
            <Image
              src={Login}
              alt="Login"
              width={1000}
              className="object-cover"
            />
          </div>
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
