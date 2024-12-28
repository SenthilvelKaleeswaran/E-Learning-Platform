import accessPage from "@/lib/auth/access-page";
import { createCustomCourse } from "@/lib/utils/api-call";
import { redirect } from "next/navigation";

export default async function Create({ params, searchParams }: any) {
  await accessPage();

  const newCourse = await createCustomCourse();
  console.log({ newCourse: newCourse?.id });
  if (newCourse?.id) {
    redirect(`/create/${newCourse?.id}`);
  } else {
    redirect(`/course-library`);
  }
}
