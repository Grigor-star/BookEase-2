"use server";
import { db } from "@/lib/db";
import { categorySchema } from "@/schemas";
import * as z from "zod";
export const createCategory = async (
  values: z.infer<typeof categorySchema>,
  storeId: string
) => {
  const validatedField = categorySchema.safeParse(values);

  if (!validatedField.success) return { error: "Invalid fields" };

  const { title, description } = validatedField.data;

  const storeCategoires = await db.category.findMany({ where: { storeId } });

  const existingCategoires = storeCategoires.some((item) => {
    return item.title === title;
  });

  if (existingCategoires)
    return { error: "A Category with the same title already exists!" };

  await db.category.create({
    data: { title: title, description: description, storeId },
  });
  return { success: "Category added successfully" };
};
