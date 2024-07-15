"use server";
import { auth } from "@/auth";
import { findUserById } from "@/data/user";
import { db } from "@/lib/db";
import { storeSchema } from "@/schemas";
import * as z from "zod";

export const createStore = async (
  values: z.infer<typeof storeSchema>,
  address: string
) => {
  const validatedFields = storeSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { storeName, category, description } = validatedFields.data;
  const session = await auth();

  if (!session?.user) {
    return { error: "User is not authenticated!" };
  }

  if (!session.user.id) {
    return { error: "User ID is undefined!" };
  }

  const user = await db.user.findUnique({ where: { id: session.user.id } });

  if (!user) {
    return { error: "Something went wrong!" };
  }

  const stores = await db.store.findMany({ where: { userId: user.id } });

  const existingStore = stores.some((store) => {
    return store.name === storeName;
  });

  if (existingStore)
    return { error: "You already have a store with th same name!" };

  await db.store.create({
    data: {
      name: storeName,
      description: description,
      category: category,
      address: address,
      userId: user.id,
    },
  });

  return { success: "Store has been created successfully!" };
};
