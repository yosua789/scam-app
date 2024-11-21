"use client";
import { useLoginUser } from "@/clients/hooks/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl")!;

  const { form, serverError } = useLoginUser();
  const onSubmit = form.handleSubmit(async (data) => {
    const { email, password } = data;
    await signIn("credentials", {
      email,
      password,
      callbackUrl,
    });
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="w-full space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your email..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="">
            <Button
              disabled={!form.formState.isValid}
              type="submit"
              className="w-full mt-5"
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or Register first
          </span>
        </div>
      </div>
      <div className="">
        <Button asChild variant="purple" className="w-full">
          <Link href="/register"> Register </Link>
        </Button>
      </div>
      {serverError && (
        <p className="text-red-500 text-sm mt-2">
          Error: {serverError.message}
        </p>
      )}
    </>
  );
}
