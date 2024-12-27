import authOptions from "@/lib/auth/auth-options";
import { Header, Sidebar } from "@/lib/components/shared";
import { getServerSession } from "next-auth";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: any = await getServerSession(authOptions);
  return (
    <main className="h-[calc(100vh-66px)] w-full">
      <Header user={session?.user} drawerContent={<Sidebar />} header="Menus" />
      <div className="flex h-full w-full">
        <div className="hidden md:block w-[300px] h-full">
          <Sidebar />
        </div>

        <div className="p-4 w-full overflow-y-scroll"><div className="pb-10">{children}</div></div>
      </div>
    </main>
  );
}
