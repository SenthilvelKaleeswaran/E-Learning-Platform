import authOptions from "@/lib/auth/auth-options";
import { Header, Sidebar } from "@/lib/components/shared";
import { getServerSession } from "next-auth";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: any = await getServerSession(authOptions as any);
  return (
    <main className="h-screen w-full">
      <Header user={session?.user} />
      <div className="w-full">{children}</div>
    </main>
  );
}