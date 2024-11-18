"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function getUserFromDb(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.pwHash);

    if (!isPasswordCorrect) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name, // Adjust according to your user schema
    };
  } catch (e) {
    console.error("Error during user lookup:", e);
    return null;
  }
}
