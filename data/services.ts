"use server";
import { db } from "@/lib/db";
export const getServicesByStoreId = async (id: string) => {
  return await db.service.findMany({ where: { storeId: id } });
};

export const getCategoriesByStoreId = async (id: string) => {
  return await db.category.findMany({ where: { storeId: id } });
};

export const getServicesByCategoryId = async (id: string, storeId: string) => {
  return await db.service.findMany({ where: { categoryId: id } });
};

export const deleteCategoryById = async (id: string, storeId: string) => {
  const allCategories = await getCategoriesByStoreId(storeId);

  const existingCategory = allCategories.some((category) => {
    return category.id === id;
  });
  if (!existingCategory) return { error: "Category does not exist!" };
  await db.category.delete({ where: { id: id } });
  return { success: "Deleted succesfully" };
};

export const deleteServiceById = async (id: string, storeId: string) => {
  const allServices = await getServicesByStoreId(storeId);

  const existingService = allServices.some((service) => {
    return service.id === id;
  });
  if (!existingService) return { error: "Serivce does not exist!" };
  await db.service.delete({ where: { id: id } });
  return { success: "Deleted succesfully" };
};
