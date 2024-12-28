import accessPage from "@/lib/auth/access-page";
import { CourseErrorContainer, CourseScreen } from "@/lib/components/screens";
import { getCourse } from "@/lib/utils/api-call";

export default async function Course({ searchParams }: any) {
  await accessPage();
  const courseId = await searchParams;

  const data = await getCourse(courseId?.id);

  if (data?.error) return <CourseErrorContainer error={data?.error} />;

  console.log({data})

  return <CourseScreen data={data} />;
}
