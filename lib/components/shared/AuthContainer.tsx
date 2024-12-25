"use client";
import { Button, Input } from "@/lib/components/ui";
import { useLogin, useRegister } from "@/lib/hooks";
import { FormEvent, useState } from "react";
import Logo from "./Logo";

const AuthContainer = ({ title, description, fields, type }: any) => {
  const { mutate: onLogin } = useLogin();
  const { mutate: onRegister } = useRegister();

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
          <Input {...item} />
        ))}
        <div className="">
          <Button type="submit" className="">
            {type === "login" ? "Log In" : "Sign Up"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthContainer;
