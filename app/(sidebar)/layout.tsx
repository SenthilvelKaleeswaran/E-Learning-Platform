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
    <main>
      <Header user={session?.user} />
      <div className="flex gap-2">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}
