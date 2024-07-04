"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import BeatLoader from "react-spinners/BeatLoader";
import Link from "next/link";
import { Button } from "../ui/button";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing the token!");
      return;
    }
    await newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <Card className="w-[500px] flex flex-col items-center justify-center">
      <CardHeader className="items-center text-balance">
        <CardTitle>🔐 Email Verification</CardTitle>
        <CardDescription>
          We would verify your email automatically.
        </CardDescription>
        <CardContent className="py-5">
          {!error && !success ? <BeatLoader /> : ""}
          <FormError message={error} />
          <FormSuccess message={success} />
        </CardContent>
        <Link href="/auth/login">
          <Button variant="link">Go back to login</Button>
        </Link>
      </CardHeader>
    </Card>
  );
};
