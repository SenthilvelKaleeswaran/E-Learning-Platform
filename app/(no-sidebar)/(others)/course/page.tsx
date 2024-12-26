import accessPage from "@/lib/auth/access-page";
import { CourseScreen } from "@/lib/components/screens";
import { getCourse } from "@/lib/utils/api-call";

export default async function Course({ params, searchParams }: any) {
  await accessPage();
  const courseId = await searchParams;

  const data = await getCourse(courseId?.id);

  return <CourseScreen data={data} />;
}
