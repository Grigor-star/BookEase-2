"use server";
import { db } from "./db";

export const isAdmin = async (
  id: string | undefined | null,
  userId: string | undefined
) => {
  const stores = await db.store.findMany({ where: { userId } });
  console.log(stores);
  const bool = stores.some((store) => store.id === id);
  console.log("Bool:", bool);
  return bool;
};
