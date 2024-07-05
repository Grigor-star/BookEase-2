"use server";
import { db } from "@/lib/db";
import { findUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return { error: "Token does not exist!" };

  const hasExpiried = new Date(existingToken.expires) < new Date();

  if (hasExpiried) return { error: "Token has expired!" };

  const existingUser = await findUserByEmail(existingToken.email);

  if (!existingUser) return { error: "User does not exist" };

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.verificationToken.delete({ where: { id: existingToken.id } });

  return { success: "Email verified!" };
};
