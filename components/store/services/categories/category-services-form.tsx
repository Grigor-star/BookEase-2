import { db } from "@/lib/db";
import { ServicesForm } from "../service/services-form";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SerivceButtonsManage } from "./manage-category";

interface CategoryServicesFormProps {
  id: string;
  storeId: string;
}

export const CategoryServicesForm = async ({
  id,
  storeId,
}: CategoryServicesFormProps) => {
  const services = await db.service.findMany({ where: { categoryId: id } });
  if (services.length < 1) {
    return <ServicesForm storeId={storeId} className="mt-6" id={id} />;
  }
  return (
    <>
      {services.map((service) => (
        <div key={service.id}>
          <Card className="flex flex-col my-4 shadow-none cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900/45 ease-linear duration-200">
            <CardContent className="flex py-3 justify-between items-center">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-[18px]">{service.title}</CardTitle>
                <p className="text-[14px] opacity-65">{service.duration}</p>
                <p className="text-[0px] sm:text-[14px] opacity-55">
                  {service.description}
                </p>
                <div className="flex gap-1 items-center">
                  <p className="sm:text-[0] text-[16px]">{service.currency}</p>
                  <p className="sm:text-[0] text-[16px]">{service.price}</p>
                </div>
              </div>
              <div className="flex space-x-5">
                <div className="flex gap-1 items-center">
                  <p className="text-[0px] sm:text-[16px]">
                    {service.currency}
                  </p>
                  <p className="text-[0px] sm:text-[16px]">{service.price}</p>
                </div>
                <SerivceButtonsManage storeId={storeId} id={service.id} />
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
};
