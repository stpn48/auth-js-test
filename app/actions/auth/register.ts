"use server";

import { saltAndHashPassword } from "@/lib/auth/salt-and-hash-password";
import { prisma } from "@/lib/prisma";

type Response = {
  error: string | null;
};

export async function Register(email: string, password: string): Promise<Response> {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const pwHash = await saltAndHashPassword(password);

    if (!pwHash) {
      throw new Error("Failed to generate password hash.");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error("This email is already registered. Please use a different email.");
    }

    await prisma.user.create({
      data: {
        email,
        pwHash,
      },
    });

    return { error: null };
  } catch (error) {
    console.error("Error during registration:", error);

    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: "An unexpected error occurred during registration. Please try again later." };
  }
}
