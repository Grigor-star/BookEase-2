import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface AddStoreFormProps {
  children: React.ReactNode;
  page: number;
}

export const AddStoreForm = ({ children, page }: AddStoreFormProps) => {
  return (
    <div className="">
      <Card className="w-[300px] sm:w-[700px] border-0 sm:border">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-[24px]">
            {page === 1 && "Add Store"}
            {page === 2 && "Add Store Address"}
            {page === 3 && "Confirm your store address"}
            {page === 4 && "Verify Information"}
          </CardTitle>
          <CardDescription className="text-balance text-center">
            {page === 1 && "Fill the fields below to create a new store."}
            {page === 2 && "Fill the fields below to add your store location."}
            {page === 3 && "Review the recommended changes."}
            {page === 4 && "Final review of the store information."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          {children}
        </CardContent>
        {page === 1 && (
          <CardFooter className="flex justify-center">
            <Link href="/store" className="hover:underline text-[14px]">
              Go back to stores
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
