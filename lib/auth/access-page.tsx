import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "./auth-options";

export default async function accessPage() {
  const session: any = await getServerSession(authOptions as any);

  if (!session || !session?.user || !session?.user?.email) {
    redirect("/login");
  }

  return session;
}
