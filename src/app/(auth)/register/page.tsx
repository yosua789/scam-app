import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/utils/hydrate-client";
import { createSSRHelper } from "@/app/api/trpc/trpc-router";
import Link from "next/link";
import LoginForm from "@/components/pages/auth/login-form";
import RegisterForm from "@/components/pages/auth/register-form";

export default async function SignIn() {
  const helpers = createSSRHelper();

  return (
    <Hydrate state={dehydrate(helpers.queryClient)}>
      <main className="bg-slate-50">
        <div className="max-w-[1200px] h-screen mx-auto mb-8">
          <div className="flex h-full items-center p-4 lg:p-8">
            <div className="bg-white p-3 md:p-32  mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-3/4">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your data below to register your account
                </p>
              </div>
              <RegisterForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
    </Hydrate>
  );
}
