import Image from "next/image";
import Login from "@/../public/assets/whitemoto.webp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/options";
import RegisterForm from "./components/form";

export default async function RegisterPage() {
  const session = await getServerSession(options);
  if (session) {
    redirect("/");
  } else {
    console.log("No Session");
  }
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
