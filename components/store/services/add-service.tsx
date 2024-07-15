"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { serviceSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface AddCategoryFormProps {
  id?: string;
  trigger: string;
  className?: string;
}

export const AddServiceForm = ({
  id,
  trigger,
  className,
}: AddCategoryFormProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const theme = useTheme();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
  });
  const onSubmit = (values: z.infer<typeof serviceSchema>) => {
    console.log(values);
  };
  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        <Button>{trigger}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Adding a new service
          </DialogTitle>
          <DialogDescription className="text-center text-balance">
            Add the required information below and save to continue.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <Card>
            <CardTitle className="text-center mt-3 text-[16px]">
              Main Info
            </CardTitle>
            <CardContent>
              <div className="grid gap-4 py-4">
                <div className="flex w-full flex-col items-start space-y-3">
                  <Label htmlFor="name" className="text-right">
                    Title
                  </Label>
                  <Input
                    {...register("title")}
                    disabled={isPending}
                    id="name"
                    className="col-span-3"
                    placeholder="e.g. Hair styling"
                  />
                  {errors.title && (
                    <p className="text-destructive text-[14px] font-medium">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="flex space-x-3">
                  <div className="flex w-full flex-col items-start space-y-3">
                    <Label htmlFor="name" className="text-right">
                      Service Type
                    </Label>
                    <Input
                      {...register("title")}
                      disabled={isPending}
                      id="name"
                      className="col-span-3"
                      placeholder="e.g. Hair styling"
                    />
                    {errors.title && (
                      <p className="text-destructive text-[14px] font-medium">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="flex w-full flex-col items-start space-y-3">
                    <Label htmlFor="name" className="text-right">
                      Service Category
                    </Label>
                    <Input
                      {...register("title")}
                      disabled={isPending}
                      id="name"
                      className="col-span-3"
                      placeholder="e.g. Hair styling"
                    />
                    {errors.title && (
                      <p className="text-destructive text-[14px] font-medium">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-start space-y-3">
                  <Label htmlFor="username" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    disabled={isPending}
                    {...register("description")}
                    placeholder="Type here..."
                  ></Textarea>
                  {errors.description && (
                    <p className="text-destructive text-[14px] font-medium">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardTitle className="text-center mt-3 text-[16px]">
              Pricing and Duration
            </CardTitle>
            <CardContent>
              <div className="grid gap-4 py-4">
                <div className="flex space-x-3">
                  <div className="flex w-full flex-col items-start space-y-3">
                    <Label htmlFor="name" className="text-right">
                      Service Type
                    </Label>
                    <Input
                      {...register("title")}
                      disabled={isPending}
                      id="name"
                      className="col-span-3"
                      placeholder="e.g. Hair styling"
                    />
                    {errors.title && (
                      <p className="text-destructive text-[14px] font-medium">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="flex w-full flex-col items-start space-y-3">
                    <Label htmlFor="name" className="text-right">
                      Service Category
                    </Label>
                    <Input
                      {...register("title")}
                      disabled={isPending}
                      id="name"
                      className="col-span-3"
                      placeholder="e.g. Hair styling"
                    />
                    {errors.title && (
                      <p className="text-destructive text-[14px] font-medium">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Button className="w-full">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
