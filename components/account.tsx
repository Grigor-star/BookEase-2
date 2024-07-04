"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface AccountProps {
  image: string;
  email: string;
  name: string;
}

export const Account = ({ image, email, name }: AccountProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
          size="icon"
          variant="ghost"
        >
          <Image
            alt="Avatar"
            className="rounded-full"
            height="32"
            src={image !== "" ? image : "/placeholder.svg"}
            style={{
              aspectRatio: "32/32",
              objectFit: "cover",
            }}
            width="32"
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="px-2 flex flex-col space-y-1 mt-2 mb-2">
          <h1 className="font-semibold text-[14px]">{name}</h1>
          <p className="text-[12px] opacity-60">{email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
