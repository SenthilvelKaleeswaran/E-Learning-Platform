import accessPage from "@/lib/auth/access-page";
import { MyCourseScreen } from "@/lib/components/screens";
import { getMyCourses } from "@/lib/utils/api-call";

export default async function MyCourse({searchParams} : any) {
  await accessPage();
  const queryParams = await searchParams
  const courses = await getMyCourses(queryParams)

  return <MyCourseScreen courses={courses?.courses} params={queryParams} />;
}
