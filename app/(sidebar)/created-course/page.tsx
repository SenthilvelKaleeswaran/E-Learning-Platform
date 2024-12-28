import accessPage from "@/lib/auth/access-page";
import { CourseLibrary } from "@/lib/components/screens";
import { EdgecaseContainer } from "@/lib/components/shared";
import { LinkButton } from "@/lib/components/ui";
import { getAllCourses } from "@/lib/utils/api-call";

export default async function Register() {
  await accessPage();

  const courses = await getAllCourses('createdCourse=true');

  if (courses?.courses?.length === 0) {
    return (
      <div className="p-10">
        <EdgecaseContainer
          title="Create your Course"
          description="It seems there are no courses available at the moment. Please check back later or create your own course."
        >
          <div className="flex justify-center">
            <LinkButton href="/create">Create a Course</LinkButton>
          </div>
        </EdgecaseContainer>
      </div>
    );
  }

  console.log({courses})

  return <CourseLibrary courses={courses?.courses} showOptions={true} />;
}
