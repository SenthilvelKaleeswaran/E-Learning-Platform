import authOptions from "@/lib/auth/auth-options";
import { Header } from "@/lib/components/shared";
import { getServerSession } from "next-auth";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: any = await getServerSession(authOptions);
  return (
    <main className="h-full w-full">
      <Header user={session?.user} />
      <div className="w-full">{children}</div>
    </main>
  );
}
