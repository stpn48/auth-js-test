"use client";

import { Register } from "@/app/actions/auth/register";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must include at least 8 letters")
    .regex(/[0-9]/, "Password must include at least 1 number"),
  retypedPassword: z.string().min(8).regex(/[0-9]/),
});

export function RegisterForm() {
  const [isRegistering, setIsRegistering] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
      retypedPassword: "",
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = useCallback(async (formData: z.infer<typeof formSchema>) => {
    setIsRegistering(true);
    const { error } = await Register(formData.email, formData.password);
    setIsRegistering(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Registered successfully");
  }, []);

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
                <Input disabled={isRegistering} placeholder="Email" {...field}></Input>
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
                  disabled={isRegistering}
                  placeholder="Password"
                  type="password"
                  {...field}
                ></Input>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="retypedPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat Password</FormLabel>
              <FormControl>
                <Input
                  disabled={isRegistering}
                  placeholder="Repeat Password"
                  type="password"
                  {...field}
                ></Input>
              </FormControl>
            </FormItem>
          )}
        />

        <p className="font-medium text-foreground">
          Already have an account?{" "}
          <Link className="underline" href="/login">
            Login
          </Link>
        </p>

        <Button disabled={isRegistering} className="flex w-full justify-center" type="submit">
          Register
        </Button>
      </form>
    </Form>
  );
}
