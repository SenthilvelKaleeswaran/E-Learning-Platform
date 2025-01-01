"use client";
import { Button, Input } from "@/lib/components/ui";
import { useLogin, useRegister } from "@/lib/hooks";
import { FormEvent } from "react";
import Logo from "./Logo";
import { useRouter } from "next/navigation";

const AuthContainer = ({ title, description, fields, type }: any) => {
  const { mutate: onLogin ,isPending : isLoggingIn} = useLogin();
  const { mutate: onRegister ,isPending  : isRegistering} = useRegister();

  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password") || "";

    if (type === "login") {
      onLogin({ email, password });
    } else {
      onRegister({ email, password, confirmPassword });
    }
  }

  return (
    <div className="space-y-4">
      <Logo />
      <div className="space-y-2">
        <p className="text-3xl font-semibold">{title}</p>
        <p className="text-gray-600 text-base">{description}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields?.map((item: any) => (
          <Input key={item?.id} {...item} />
        ))}
        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoggingIn || isRegistering}
          >
            {type === "login" ? "Log In" : "Sign Up"}
          </Button>
        </div>
      </form>
      <p className="text-gray-400 text-sm text-center">
        Move to{" "}
        <span
          className="text-blue-500 underline cursor-pointer"
          onClick={() => router.push(type === "login" ? "/register" : "/login")}
        >
          {type == "login" ? "Sign up" : "Sign in"}
        </span>{" "}
        page
      </p>
    </div>
  );
};

export default AuthContainer;
