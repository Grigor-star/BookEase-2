"use client";
import { Button } from "../ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { signIn } from "next-auth/react";

interface SocialProps {
  disabled: boolean;
}

export const Social = ({ disabled }: SocialProps) => {
  function onSubmit(provider: "google" | "github") {
    signIn(provider, { callbackUrl: "/store" });
  }
  return (
    <div className="w-full flex items-center gap-1 mt-5 flex-wrap lg:flex-nowrap">
      <Button
        disabled={disabled}
        onClick={() => onSubmit("google")}
        variant="outline"
        className="flex items-center w-full gap-2"
      >
        <FcGoogle size={20} />
        Continue with Google
      </Button>
      <Button
        disabled={disabled}
        onClick={() => onSubmit("github")}
        variant="outline"
        className="flex items-center w-full gap-2"
      >
        <FaGithub size={20} />
        Continue with Github
      </Button>
    </div>
  );
};
