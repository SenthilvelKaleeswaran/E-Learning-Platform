import authOptions from "@/lib/auth/auth-options";
import { AuthContainer } from "@/lib/components/shared";
import { SignInFields } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(authOptions as any);

  if (session) {
    redirect("/");
  }

  return (
    <AuthContainer
      title="Sign in to continue"
      description="Welcome back! Please enter your details"
      fields={SignInFields}
      type="login"
    />
  );
}
