import { EdgecaseContainer } from "@/lib/components/shared";
import { LinkButton } from "@/lib/components/ui";

export default function CourseErrorContainer({error} : any) {
  return (
    <div className="flex gap-4 h-[calc(100vh-66px)] w-full">
      <div className="border-r h-full w-[400px] p-4 place-content-center hidden md:block">
        <p className="text-gray-600 text-center">
          No Contents on the requested course.
        </p>
      </div>
      <div className="px-8 md:px-32 place-content-center w-full mx-auto">
        <EdgecaseContainer
          title="Opps !! An Error occured."
          description={error + " Select any course by following links"}
          type="error"
        >
          <div className="flex  flex-col md:flex-row gap-4 items-center justify-center">
            <LinkButton
              href="/course-library"
              className={"w-36 text-center md:w-fit px-4"}
            >
              Course Library
            </LinkButton>
            <LinkButton
              href="/my-course"
              className={"w-36 text-center md:w-fit  px-4"}
            >
              My Course
            </LinkButton>
          </div>
        </EdgecaseContainer>
      </div>
    </div>
  );
}
