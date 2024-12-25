export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="place-content-center w-full h-full md:w-1/2 p-10 lg:p-20 xl:p-36">{children}</main>
  );
}
