"use client";

import { AuthForm } from "@/components/ui/auth-form";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Social } from "./social";
import { useState, useTransition } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { login } from "@/actions/login";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useTheme } from "next-themes";

interface LoginFormProps {
  social?: boolean;
}

export function LoginForm({ social }: LoginFormProps) {
  const [isPending, startTransition] = useTransition();
  const theme = useTheme();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  }
  return (
    <AuthForm
      title="Sign In"
      description="Enter your email below to login to your account"
      backButton={BackButton}
      image
    >
      <div className="max-w-[70vw] flex flex-col justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      disabled={isPending}
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="password"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} className="w-full" type="submit">
              {isPending ? (
                <BeatLoader
                  color={theme.resolvedTheme !== "dark" ? "white" : "black"}
                  size={10}
                />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
          {social && <Social disabled={isPending} />}
        </Form>
      </div>
    </AuthForm>
  );
}

export const BackButton = () => {
  return (
    <div>
      Do not have an account?{" "}
      <Link className="underline" href="/auth/register">
        Sign Up
      </Link>
    </div>
  );
};
