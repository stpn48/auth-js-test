"use server";

import { saltAndHashPassword } from "@/lib/auth/salt-and-hash-password";
import { prisma } from "@/lib/prisma";

type Response = {
  error: string | null;
};

export async function Register(email: string, password: string): Promise<Response> {
  try {
    const pwHash = await saltAndHashPassword(password);

    await prisma.user.create({
      data: {
        email,
        pwHash: pwHash,
      },
    });

    return { error: null };
  } catch (e) {
    return { error: "register failed" };
  }
}
