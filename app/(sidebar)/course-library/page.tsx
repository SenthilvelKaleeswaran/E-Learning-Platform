import accessPage from "@/lib/auth/access-page";
import { CourseLibrary } from "@/lib/components/screens";
import { getAllCourses } from "@/lib/utils/api-call";

export default async function Register() {
  await accessPage();

  const courses = await getAllCourses()

  return <CourseLibrary courses={courses?.courses} />;
}
