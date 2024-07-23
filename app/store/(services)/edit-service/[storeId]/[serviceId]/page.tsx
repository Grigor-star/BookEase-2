import { FormError } from "@/components/form-error";
import { EditServiceForm } from "@/components/store/services/service/edit-service-form";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function EditServicePage({
  params,
}: {
  params: { storeId: string; serviceId: string };
}) {
  const categories = await db.category.findMany({
    where: { storeId: params.storeId },
  });
  const service = await db.service.findUnique({
    where: { id: params.serviceId },
  });
  if (!service) return <FormError message="Service does not exist!" />;
  console.log("PARAMS:", params);
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-[32px] font-bold text-left">Edit Service</h1>
        <h6 className="opacity-55 text-[18px]">
          Fill the form below to continune
        </h6>
      </div>
      <div className="flex mt-6 space-x-5 justify-center">
        <EditServiceForm
          id={params.storeId}
          service={service}
          categories={categories}
        />
      </div>
      <Link
        className="w-full absolute bottom-5 sm:hidden"
        href={`/store/services/${params.storeId}`}
      >
        <Button className="w-full sm:w-auto" variant="link">
          Go back to catalog
        </Button>
      </Link>
    </div>
  );
}
