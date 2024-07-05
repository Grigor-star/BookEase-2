"use client";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

interface storeProps {
  id: string;
  userId: string;
  name: string;
  category: string;
  description: string;
  teamMembers: string[];
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AddStoreProps {
  email: string;
  name: string;
  image: string;
  store: storeProps[];
}

export const StoreForm = ({ email, image, name, store }: AddStoreProps) => {
  return (
    <Card className="flex flex-col gap-2 dark:bg-black border-0 shadow-none sm:border sm:shadow">
      <CardHeader className="flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <Link href="/">
            <CardTitle className="text-[16px] font-bold">BookEase</CardTitle>
          </Link>
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
            <DropdownMenuContent className="w-[200px]" align="end">
              <div className="px-2 flex flex-col space-y-1 mt-2 mb-2">
                <h1 className="font-semibold text-[14px]">{name}</h1>
                <p className="text-[12px] opacity-60">{email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Support
              </DropdownMenuItem>
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
        </div>
        <div className="text-center flex items-center justify-center pt-10"></div>
        <CardTitle className="text-[14px] font-regular text-center pt-5">
          Create your first online Business
        </CardTitle>
        <CardDescription className="text-center px-4 text-[12px]">
          Experiment with different designs and products until you learn what
          works
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Link href="/store/add-store">
          <Button size="sm">Create Business</Button>
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 justify-center items-center">
        <CardTitle className="text-[14px] font-regular text-center pt-5">
          Your businesses
        </CardTitle>

        {store.length !== 0 ? (
          store.map((data) => (
            <Link
              key={data.id}
              href={`/store/dashboard?id=${data.id}`}
              className="w-full"
            >
              <div className="border-[1px] w-full border-slate-200/80 rounded-lg  px-[25px] py-3 group ease-linear duration-200 cursor-pointer hover:bg-slate-200/50">
                <div className="flex items-center space-x-1">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <CardTitle>{data.name}</CardTitle>
                      <CardTitle className="text-[14px] font-serif font-light text-black/65">
                        {"( "}
                        {data.category}
                        {" )"}
                      </CardTitle>
                    </div>
                    <CardDescription>{data.description}</CardDescription>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>You do not have any store yet!</p>
        )}
      </CardFooter>
    </Card>
  );
};
