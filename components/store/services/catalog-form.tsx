import { FormError } from "@/components/form-error";
import {
  deleteCategoryById,
  getCategoriesByStoreId,
  getServicesByStoreId,
} from "@/data/services";

import { AddCategoryForm } from "./add-category";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { CatalogButtonsManage } from "./manage-category";
import { ServicesForm } from "./services-form";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CategoryServicesForm } from "./category-services-form";

interface ServicesFormProps {
  id: string;
}

export const CatalogForm = async ({ id }: ServicesFormProps) => {
  if (!id) {
    return (
      <div>
        <FormError message="Something went wrong! Try to login again." />
      </div>
    );
  }

  const onDelete = async (id: string) => {
    await deleteCategoryById(id);
  };

  const categories = await getCategoriesByStoreId(id);
  const services = await getServicesByStoreId(id);
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
              id={id}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col justify-start h-full">
      <Tabs defaultValue="allCategories" className="w-full ">
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

            <AddCategoryForm className="px-3" id={id} trigger="+" />
          </TabsList>
        </div>

        <TabsContent value="allCategories" className="p-2 h-full">
          {services.length === 0 && (
            <>
              <header className="flex flex-col items-center gap-3">
                <div className="flex flex-col">
                  <h1 className="text-[24px] font-medium">All Categories</h1>
                  <p className="text-balance opacity-60">
                    Here you can manage all your services
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/store/add-service/${id}`}>
                    <Button size="lg">Add Service</Button>
                  </Link>
                </div>
              </header>
              <ServicesForm className="mt-6" id={id} />
            </>
          )}
          {services.length > 0 && (
            <>
              <header className="flex flex-col sm:flex-row items-center gap-3 justify-between mt-5 sm:mt-0">
                <div className="flex flex-col">
                  <h1 className="text-[24px] font-medium">All Categories</h1>
                  <p className="text-[14px] text-balance opacity-60">
                    Here you can manage all your services
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    className="w-full sm:w-auto"
                    href={`/store/add-service/${id}`}
                  >
                    <Button size="lg" className="w-full sm:w-auto">
                      Add Service
                    </Button>
                  </Link>
                </div>
              </header>
              {services.map((service) => (
                <div key={service.id}>
                  <Card className="flex flex-col my-4 shadow-none">
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
                            {service.price}
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
                          </p>
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
          )}
        </TabsContent>
        {categories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.title}
            className="p-2 h-full"
          >
            <header className="flex flex-col sm:flex-row items-center gap-3 justify-between mt-5 sm:mt-0">
              <div className="flex flex-col">
                <h1 className="text-[24px] font-medium">{category.title}</h1>
                <p className="text-[16px] text-balance opacity-60">
                  {category.description}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-col-reverse sm:flex-row w-full sm:w-auto">
                <CatalogButtonsManage id={category.id} />
                <Link
                  className="w-full sm:w-auto"
                  href={`/store/add-service/${id}`}
                >
                  <Button size="lg" className="w-full sm:w-auto">
                    Add Service
                  </Button>
                </Link>
              </div>
            </header>
            <CategoryServicesForm id={category.id} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
