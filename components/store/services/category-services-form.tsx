import { db } from "@/lib/db";
import { ServicesForm } from "./services-form";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface CategoryServicesFormProps {
  id: string;
}

export const CategoryServicesForm = async ({
  id,
}: CategoryServicesFormProps) => {
  const services = await db.service.findMany({ where: { categoryId: id } });
  if (services.length < 1) {
    return <ServicesForm className="mt-6" id={id} />;
  }
  return (
    <>
      {services.map((service) => (
        <div key={service.id}>
          <Card className="flex flex-col my-4 shadow-none">
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
                <div className="flex flex-col space-y-1 cursor-pointer p-2">
                  <div className="w-[3px] h-[3px] rounded-full bg-black dark:bg-white"></div>
                  <div className="w-[3px] h-[3px] rounded-full bg-black dark:bg-white"></div>
                  <div className="w-[3px] h-[3px] rounded-full bg-black dark:bg-white"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
};
