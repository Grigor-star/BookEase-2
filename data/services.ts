"use server";
import { db } from "@/lib/db";
export const getServicesByStoreId = async (id: string) => {
  return await db.service.findMany({ where: { storeId: id } });
};

export const getCategoriesByStoreId = async (id: string) => {
  return await db.category.findMany({ where: { storeId: id } });
};

export const getServicesByCategoryId = async (id: string) => {
  return await db.service.findMany({ where: { categoryId: id } });
};

export const deleteCategoryById = async (id: string) => {
  const existingCategory = await db.category.findUnique({ where: { id } });
  if (!existingCategory) return { error: "Category does not exist!" };
  await db.category.delete({ where: { id: existingCategory?.id } });
  return { success: "Deleted succesfully" };
};
