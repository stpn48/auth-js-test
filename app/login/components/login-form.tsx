"use client";

import { login } from "@/app/actions/auth/login";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must include at least 8 letters")
    .regex(/[0-9]/, "Password must include at least 1 number"),
});

export function LoginForm() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = useCallback(
    async (formData: z.infer<typeof formSchema>) => {
      setIsLoggingIn(true);
      const { error } = await login(formData);
      setIsLoggingIn(false);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Login successful");
      router.push("/");
    },
    [router],
  );

  return (
    <Form {...form}>
      <form
        className="w-[275px] space-y-4 rounded-lg border-border py-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={isLoggingIn} placeholder="Email" {...field}></Input>
              </FormControl>{" "}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoggingIn}
                  placeholder="Password"
                  type="password"
                  {...field}
                ></Input>
              </FormControl>
            </FormItem>
          )}
        />

        <p className="font-medium text-foreground">
          Don&apos;t have an account?{" "}
          <Link className="underline" href="/register">
            Register
          </Link>
        </p>

        <button
          type="button"
          onClick={() => signIn("github", { redirectTo: "/" })}
          className="font-medium text-foreground"
        >
          Continue With Github
        </button>

        <Button disabled={isLoggingIn} className="flex w-full justify-center" type="submit">
          Register
        </Button>
      </form>
    </Form>
  );
}
