import { AddServiceForm } from "@/components/store/services/service/add-service-form";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function AddServicePage({
  params,
}: {
  params: { id: string };
}) {
  const categories = await db.category.findMany({
    where: { storeId: params.id },
  });
  console.log(categories);
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-[32px] font-bold text-left">New Service</h1>
        <h6 className="opacity-55 text-[18px]">
          Fill the form below to continune
        </h6>
      </div>
      <div className="flex mt-6 space-x-5 justify-center">
        <AddServiceForm id={params.id} categories={categories} />
      </div>
      <Link
        className="w-full absolute bottom-5 sm:hidden"
        href={`/store/services/${params.id}`}
      >
        <Button className="w-full sm:w-auto" variant="link">
          Go back to catalog
        </Button>
      </Link>
    </div>
  );
}
