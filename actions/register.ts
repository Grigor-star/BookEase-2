"use server";

import { createUser, findUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";

import uuid4 from "uuid4";
import { registerSchema } from "@/schemas";
import * as z from "zod";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFileds = registerSchema.safeParse(values);

  if (!validatedFileds.success) return { error: "Something went wrong!" };

  const { email, name, password, confirmPassword } = validatedFileds.data;

  const existingUser = await findUserByEmail(email);

  if (existingUser) return { error: "Email is taken!" };

  if (password !== confirmPassword)
    return { error: "Confirm password doesn't match!" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await createUser({ name, email, password: hashedPassword, id: uuid4() });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "E-mail sent!" };
};
