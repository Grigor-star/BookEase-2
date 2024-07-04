"use server";
import { db } from "@/lib/db";

interface createUserProps {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const findUserByEmail = async (email: string) => {
  return await db.user.findUnique({ where: { email } });
};

export const findUserById = async (id: string) => {
  return await db.user.findUnique({ where: { id } });
};

export const createUser = async (values: createUserProps) => {
  return await db.user.create({ data: values });
};
