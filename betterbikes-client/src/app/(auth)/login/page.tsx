import Image from "next/image";
import Login from "@/../public/assets/heroImage.webp";
import LoginForm from "./components/form";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function LoginPage() {
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
          <LoginForm />
          <div className="hidden lg:block lg:w-[60%]">
            <Image
              src={Login}
              alt="Login"
              width={700}
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
