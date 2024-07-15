"use server";
import { db } from "./db";

export const isAdmin = async (
  id: string | undefined | null,
  userId: string | undefined
) => {
  const stores = await db.store.findMany({ where: { userId } });
  const bool = stores.some((store) => store.id === id);
  return bool;
};
