"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { deleteCategoryById } from "@/data/services";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import BeatLoader from "react-spinners/BeatLoader";
import { useTheme } from "next-themes";

interface CatalogButtonsProps {
  id: string;
}

export const CatalogButtonsManage = ({ id }: CatalogButtonsProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const theme = useTheme();
  const router = useRouter();
  const onDelete = () => {
    startTransition(() => {
      deleteCategoryById(id).then((data) => {
        if (data.success) {
          setSuccess(data.success);
          router.refresh();
        }
        setError(data.error);
      });
    });
  };
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full sm:w-auto" disabled={isPending}>
          <Button className="w-full sm:w-auto" variant="outline" size="lg">
            Manage
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild className="text-destructive text-left w-full">
            <DropdownMenuItem className="text-destructive font-bold cursor-pointer">
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            category within its services and remove this data from our servers.
          </DialogDescription>
        </DialogHeader>
        <FormSuccess message={success} />
        <FormError message={error} />
        <Button
          disabled={isPending}
          onClick={() => onDelete()}
          variant="outline"
          className="text-destructive font-extrabold hover:text-destructive"
        >
          {isPending ? (
            <BeatLoader
              color={theme.resolvedTheme !== "dark" ? "black" : "white"}
              size={10}
            />
          ) : (
            "Delete"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
