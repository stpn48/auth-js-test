"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

type LoginResponse = { error: string | null };

export async function login(credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  try {
    await signIn("credentials", {
      redirect: false,
      ...credentials,
    });

    return { error: null };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    return { error: "Something went wrong" };
  }
}
