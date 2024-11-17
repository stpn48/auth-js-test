"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must include at least 8 letters")
    .regex(/[0-9]/, "Password must include at least 1 number"),
  retypedPassword: z.string().min(8).regex(/[0-9]/),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
      retypedPassword: "",
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = useCallback((formData: z.infer<typeof formSchema>) => {}, []);

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
                <Input placeholder="Email" {...field}></Input>
              </FormControl>
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
                <Input placeholder="Password" type="password" {...field}></Input>
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
                <Input placeholder="Repeat Password" type="password" {...field}></Input>
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="flex w-full justify-center" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
