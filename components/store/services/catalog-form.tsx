import { FormError } from "@/components/form-error";
import { getCategoriesByStoreId, getServicesByStoreId } from "@/data/services";

import { AddCategoryForm } from "./categories/add-category";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import {
  CatalogButtonsManage,
  SerivceButtonsManage,
} from "./categories/manage-category";
import { ServicesForm } from "./service/services-form";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CategoryServicesForm } from "./categories/category-services-form";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FiEdit } from "react-icons/fi";
import { EditCategoryForm } from "./categories/edit-category";
interface ServicesFormProps {
  storeId: string;
}

export const CatalogForm = async ({ storeId }: ServicesFormProps) => {
  if (!storeId) {
    return (
      <div>
        <FormError message="Something went wrong! Try to login again." />
      </div>
    );
  }

  const categories = await getCategoriesByStoreId(storeId);
  const services = await getServicesByStoreId(storeId);
  console.log(categories);
  if (categories.length === 0) {
    return (
      <div className="h-full">
        <div className="flex h-full items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Add a new category.
            </h3>
            <p className="text-sm text-muted-foreground text-balance">
              Please create at least one category so you will be able to add
              your services.
            </p>
            <AddCategoryForm
              button
              className="mt-2"
              trigger="Add Category"
              id={storeId}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col justify-start h-full">
      <Tabs defaultValue="allCategories" className="w-full">
        <div className="overflow-x-scroll w-full hide-scrollbar">
          <TabsList className="mr-5 ">
            <TabsTrigger
              className="px-7 flex items-center gap-2"
              value="allCategories"
            >
              All Categoires
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                className="px-7 flex items-center gap-2"
                value={category.title}
              >
                {category.title}
              </TabsTrigger>
            ))}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AddCategoryForm className="px-3" id={storeId} trigger="+" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add Category</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TabsList>
        </div>

        <TabsContent value="allCategories" className="p-2 h-full">
          {services.length === 0 && (
            <>
              <header className="flex flex-col sm:flex-row sm:justify-between items-center gap-3">
                <div className="flex flex-col items-center sm:items-start">
                  <h1 className="text-[24px] font-medium text-center sm:text-left">
                    All Categories
                  </h1>
                  <p className="text-balance opacity-60 text-center sm:text-left">
                    Here you can manage all your services
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/store/add-service/${storeId}`}>
                    <Button size="lg">Add Service</Button>
                  </Link>
                </div>
              </header>
              <ServicesForm storeId={storeId} className="mt-6" id={storeId} />
            </>
          )}
          {services.length > 0 && (
            <>
              <header className="flex flex-col sm:flex-row items-center gap-3 justify-between mt-3 sm:mt-0 py-2">
                <div className="flex flex-col">
                  <h1 className="text-[24px] font-medium text-center sm:text-left">
                    All Categories
                  </h1>
                  <p className="text-[14px] text-balance opacity-60 text-center sm:text-start">
                    Here you can manage all your services
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    className="w-full sm:w-auto"
                    href={`/store/add-service/${storeId}`}
                  >
                    <Button size="lg" className="w-full sm:w-auto">
                      Add Service
                    </Button>
                  </Link>
                </div>
              </header>
              <div>
                {services.map((service) => (
                  <div key={service.id}>
                    <Card className="flex flex-col my-4 sm:my-2 shadow-none hover:bg-slate-100/50 dark:hover:bg-slate-900/45 ease-linear duration-200">
                      <CardContent className="flex py-3 justify-between items-center">
                        <div className="flex flex-col space-y-1">
                          <CardTitle className="text-[18px]">
                            {service.title}
                          </CardTitle>
                          <p className="text-[14px] opacity-65">
                            {service.duration}
                          </p>
                          <p className="text-[0px] sm:text-[14px] opacity-55">
                            {service.description}
                          </p>
                          <div className="flex gap-1 items-center">
                            <p className="sm:text-[0] text-[16px]">
                              {service.currency}
                            </p>
                            <p className="sm:text-[0] text-[16px]">
                              {service.price}{" "}
                              {service.currency === "EUR" && "€"}
                              {service.currency === "AMD" && "֏"}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-5">
                          <div className="flex gap-1 items-center">
                            <p className="text-[0px] sm:text-[16px]">
                              {service.currency}
                            </p>
                            <p className="text-[0px] sm:text-[16px]">
                              {service.price}
                              {service.currency === "EUR" && "€"}
                              {service.currency === "AMD" && "֏"}
                            </p>
                          </div>
                          <SerivceButtonsManage
                            storeId={storeId}
                            id={service.id}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </>
          )}
        </TabsContent>
        {categories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.title}
            className="p-2 h-full "
          >
            <header className="flex flex-col sm:flex-row items-center gap-3 justify-between mt-5 sm:mt-0">
              <div className="flex gap-6 items-center">
                <div className="flex flex-col">
                  <h1 className="text-[24px] font-medium text-start">
                    {category.title}
                  </h1>
                  <p className="text-[16px] text-balance opacity-60 text-start">
                    {category.description}
                  </p>
                </div>
                <EditCategoryForm
                  category={category}
                  storeId={storeId}
                  trigger={
                    <FiEdit className="opacity-50 cursor-pointer" size={20} />
                  }
                />
              </div>
              <div className="flex items-center gap-3 flex-col-reverse sm:flex-row w-full sm:w-auto">
                <CatalogButtonsManage storeId={storeId} id={category.id} />
                <Link
                  className="w-full sm:w-auto"
                  href={`/store/add-service/${storeId}`}
                >
                  <Button size="lg" className="w-full sm:w-auto">
                    Add Service
                  </Button>
                </Link>
              </div>
            </header>
            <CategoryServicesForm storeId={storeId} id={category.id} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
