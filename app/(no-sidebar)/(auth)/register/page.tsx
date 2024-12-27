import authOptions from "@/lib/auth/auth-options";
import { AuthContainer } from "@/lib/components/shared";
import { SignUpFields } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getServerSession(authOptions as any);

  if (session) {
    redirect("/my-course");
  }

  return (
    <AuthContainer
        title="Sign up"
        description="Welcome! Please enter your details"
        fields={SignUpFields}
      />
);}
