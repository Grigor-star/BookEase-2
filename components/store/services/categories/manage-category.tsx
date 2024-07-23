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
import { deleteCategoryById, deleteServiceById } from "@/data/services";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import BeatLoader from "react-spinners/BeatLoader";
import { useTheme } from "next-themes";
import Link from "next/link";

interface CatalogButtonsProps {
  id: string;
  storeId: string;
}

export const CatalogButtonsManage = ({ id, storeId }: CatalogButtonsProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const theme = useTheme();
  const router = useRouter();
  const onDelete = () => {
    startTransition(() => {
      deleteCategoryById(id, storeId).then((data) => {
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
        <DropdownMenuContent className="w-full sm:w-auto">
          <DialogTrigger
            content="delete"
            asChild
            className="text-destructive text-left w-full"
          >
            <DropdownMenuItem className="text-destructive cursor-pointer w-full sm:w-auto">
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent id="delete" className="w-[30vw]">
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

export const SerivceButtonsManage = ({ id, storeId }: CatalogButtonsProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const theme = useTheme();
  const router = useRouter();
  const onDelete = () => {
    startTransition(() => {
      deleteServiceById(id, storeId).then((data) => {
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
        <DropdownMenuTrigger>
          <div className="flex flex-col space-y-1 cursor-pointer p-2">
            <div className="w-[3px] h-[3px] rounded-full bg-black dark:bg-white"></div>
            <div className="w-[3px] h-[3px] rounded-full bg-black dark:bg-white"></div>
            <div className="w-[3px] h-[3px] rounded-full bg-black dark:bg-white"></div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full sm:w-auto" align="end">
          <DropdownMenuItem className="cursor-pointer">
            <Link href={`/store/edit-service/${storeId}/${id}`}>Edit</Link>
          </DropdownMenuItem>
          <DialogTrigger asChild className="text-destructive text-left w-full">
            <DropdownMenuItem
              asChild
              color="destructive"
              className="text-destructive cursor-pointer w-full sm:w-auto"
            >
              <p className="text-destructive hover:text-destructive">Delete</p>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="w-[30vw]">
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
