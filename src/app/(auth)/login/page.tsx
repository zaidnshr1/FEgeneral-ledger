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
import { loginUser, getMe } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth";
import type { LoginRequest } from "@/types/api";
import { AxiosError } from "axios";

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export default function LoginPage() {
  const router = useRouter();
  const { setTokens, setUser } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
    onSuccess: async (data) => {
      setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      const userInfo = await getMe();
      setUser(userInfo);

      toast.success("Authentication Success", {
        description: "Redirecting to system dashboard.",
      });

      router.push("/dashboard");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error("Authentication Failed", {
        description:
          error.response?.data?.message || "An unexpected error occurred.",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate(values);
  }

  return (
    <div className="w-full max-w-sm p-8 space-y-6 border rounded-none bg-white border-slate-300">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">User Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter credentials to access the system.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="admin.pusat"
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
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Authenticating..." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="px-8 text-xs text-center text-slate-600">
        No account?{" "}
        <Link href="/register" className="underline hover:text-slate-900">
          Register Admin Pusat
        </Link>
      </p>
    </div>
  );
}
