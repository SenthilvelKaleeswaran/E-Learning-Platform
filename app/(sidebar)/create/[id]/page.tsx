import accessPage from "@/lib/auth/access-page";
import CreateCourse from "@/lib/components/screens/create-course/CreateCourse";
import { EdgecaseContainer } from "@/lib/components/shared";
import { LinkButton } from "@/lib/components/ui";
import { getCourse } from "@/lib/utils/api-call";

export default async function Create({ params, searchParams }: any) {
  await accessPage();

  const { id } = await params;

  const courseDetails = await getCourse(id);
  console.log({ courseDetails });

  if (courseDetails?.error) {
    return (
      <div className="p-10">
        <EdgecaseContainer
        title="Course Not Found"
        type="error"
        description="It seems like you've altered the course ID or the course no longer exists. Please check the ID or explore other available courses."
      >
        <div className="flex justify-center">
          <LinkButton href="/create">Refresh</LinkButton>
        </div>
      </EdgecaseContainer>

      </div>
      
    );
  }

  return <CreateCourse courseDetails={courseDetails?.course} myCourse={courseDetails?.myCourse} />;
}
