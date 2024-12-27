import authOptions from "@/lib/auth/auth-options";
import Logo from "@/lib/components/shared/Logo";
import { LinkButton } from "@/lib/components/ui";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  const session: any = await getServerSession(authOptions);

  if (session?.user?.email) {
    redirect("/course-library");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className=" p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-900 text-white">
        <div className="text-center p-8 space-y-6 max-w-2xl">
          <h2 className="text-4xl font-bold">
            Empower Your Learning Journey
          </h2>
          <p className="text-lg">
            Join with us for improving your skills and knowledge with our courses.
          </p>
          <div className="space-x-4">
            <div className="space-x-4">
              <LinkButton
                href="/login"
                className="px-6 py-3 bg-white text-blue-800 font-semibold rounded-md"
              >
                Login
              </LinkButton>
              <LinkButton href="/register" className="px-6 py-3">
                Register
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Why Choose Edu Cat?
          </h2>
          <p className="text-gray-600">
            Learn through structured video courses and create your own content
            at your pace with Edu Cat's comprehensive platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-white shadow-lg rounded-md">
              <h3 className="font-bold text-xl">Organized Video Courses</h3>
              <p className="text-gray-600 mt-2">
                Access a wide range of well-organized video courses designed for
                efficient learning.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-md">
              <h3 className="font-bold text-xl">Create Your Own Courses</h3>
              <p className="text-gray-600 mt-2">
                Edu Cat allows you to easily create and share your own courses
                with personalized content.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-md">
              <h3 className="font-bold text-xl">Flexible Learning</h3>
              <p className="text-gray-600 mt-2">
                Learn at your own pace, anytime, anywhere, with access to
                comprehensive materials and resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-300 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <h2 className="text-lg font-bold">E-Learn Platform</h2>
          <p>
            &copy; {new Date().getFullYear()} E-Learn Platform. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
