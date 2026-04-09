"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { registerUser } from "@/services/auth.service";
import type { RegisterRequest } from "@/types/api";
import { AxiosError } from "axios";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(100),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(50),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$"),
      "Must contain uppercase, lowercase, number, and special character.",
    ),
});

export default function RegisterPage() {
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => registerUser(data),
    onSuccess: () => {
      toast.success("Registration Success", {
        description: "Admin Pusat account created. Please proceed to login.",
      });
      router.push("/login");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error("Registration Failed", {
        description:
          error.response?.data?.message || "An unexpected error occurred.",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerMutation.mutate(values);
  }

  return (
    <div className="w-full max-w-sm p-8 space-y-6 border rounded-none bg-white border-slate-300">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Register Admin Pusat
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Create credentials for Head Office access.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe"
                    {...field}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john.doe@company.com"
                    {...field}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
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
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full rounded-none"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending
              ? "Processing..."
              : "Registration"}
          </Button>
        </form>
      </Form>
      <p className="px-8 text-xs text-center text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="underline hover:text-slate-900">
          User Login
        </Link>
      </p>
    </div>
  );
}
