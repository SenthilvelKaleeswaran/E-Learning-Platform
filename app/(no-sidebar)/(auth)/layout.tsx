import Image from "next/image";
import AuthBackground from "@/public/auth-background.jpg"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex md:flex-row flex-col h-screen w-full">
      <div className="w-full md:w-1/2 h-20 md:h-full">
        <Image 
          src={AuthBackground} 
          alt="Image-Container" 
          className="w-full h-full object-cover" 
        />
      </div>
      {children}
    </div>
  );
}