"use server";
import { db } from "@/lib/db";
import { serviceSchema } from "@/schemas";
import * as z from "zod";

export const createService = async (
  values: z.infer<typeof serviceSchema>,
  storeId: string
) => {
  const validatedFiels = serviceSchema.safeParse(values);

  if (!validatedFiels.success) return { error: "Invalid fields!" };

  const {
    title,
    description,
    serviceType,
    categoryId,
    duration,
    price,
    currency,
  } = validatedFiels.data;

  const existingStore = await db.store.findUnique({ where: { id: storeId } });

  if (!existingStore) return { error: "Something went wrong!" };

  await db.service.create({
    data: {
      title,
      description,
      categoryId,
      duration,
      price,
      currency,
      serviceType,
      storeId,
    },
  });

  return { success: "Service has been added successfully" };
};

export const editService = async (
  values: z.infer<typeof serviceSchema>,
  storeId: string,
  serviceId: string
) => {
  const validatedFiels = serviceSchema.safeParse(values);

  if (!validatedFiels.success) return { error: "Invalid fields!" };

  const {
    title,
    description,
    serviceType,
    categoryId,
    duration,
    price,
    currency,
  } = validatedFiels.data;

  const existingStore = await db.store.findUnique({ where: { id: storeId } });

  if (!existingStore) return { error: "Something went wrong!" };

  await db.service.update({
    where: { id: serviceId },
    data: {
      title,
      description,
      categoryId,
      duration,
      price,
      currency,
      serviceType,
      storeId,
    },
  });

  return { success: "The service has been changed!" };
};
