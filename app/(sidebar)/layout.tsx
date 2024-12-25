import authOptions from "@/lib/auth/auth-options";
import { Header } from "@/lib/components/shared";
import { getServerSession } from "next-auth";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session : any = await getServerSession(authOptions as any)
  return (
    <main>
      <Header user={session?.user} />
      <div>{children}</div>
    </main>
  );
}
