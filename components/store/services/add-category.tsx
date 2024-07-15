"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categorySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory } from "@/actions/services/category";
import { useState, useTransition } from "react";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import BeatLoader from "react-spinners/BeatLoader";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

interface AddCategoryFormProps {
  id: string;
  trigger: string;
  className?: string;
  button?: boolean;
}

export const AddCategoryForm = ({
  id,
  trigger,
  className,
  button,
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
  } = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
  });
  const onSubmit = (values: z.infer<typeof categorySchema>) => {
    startTransition(() => {
      createCategory(values, id).then((data) => {
        if (data.success) {
          setSuccess(data.success);
          router.refresh();
        }

        setError(data?.error);
      });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild={button} className={className}>
        {button ? <Button>{trigger}</Button> : `${trigger}`}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Adding a new category
          </DialogTitle>
          <DialogDescription className="text-center text-balance">
            Add the required info below and save to continue.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-start space-y-3">
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
          <FormSuccess message={success} />
          <FormError message={error} />
          <DialogFooter className="mt-4">
            <Button disabled={isPending} className="w-full" type="submit">
              {isPending ? (
                <BeatLoader
                  color={theme.resolvedTheme !== "dark" ? "white" : "black"}
                  size={10}
                />
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
