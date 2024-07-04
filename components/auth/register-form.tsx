"use client";

import { AuthForm } from "@/components/ui/auth-form";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";

import BeatLoader from "react-spinners/BeatLoader";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/schemas";
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
import { register } from "@/actions/register";
import { useState, useTransition } from "react";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { useTheme } from "next-themes";

interface RegisterFormProps {
  social?: boolean;
}

export function RegisterForm({ social }: RegisterFormProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const theme = useTheme();

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    startTransition(async () => {
      await register(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  }
  return (
    <AuthForm
      title="Sign Up"
      description="Create an account to continue."
      backButton={BackButton}
      image
    >
      <div className="max-w-[70vw] flex flex-col justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      placeholder="John Johnson"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
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
                <FormItem>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
            <FormSuccess message={success} />
            <FormError message={error} />
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
      Already have an account?{" "}
      <Link className="underline" href="/auth/login">
        Sign In
      </Link>
    </div>
  );
};
