import accessPage from "@/lib/auth/access-page";
import { MyCourseScreen } from "@/lib/components/screens";
import { EdgecaseContainer } from "@/lib/components/shared";
import { LinkButton } from "@/lib/components/ui";
import { getMyCourses } from "@/lib/utils/api-call";

export default async function MyCourse({ searchParams }: any) {
  await accessPage();
  const queryParams = await searchParams;
  const courses = await getMyCourses(queryParams);

  if (courses?.error === "Invalid filter") {
    return (
      <div className="p-10">
        <EdgecaseContainer
          title="Invalid Filters"
          description="The filters you applied are invalid or returned no results. Please adjust your filters and try again."
          type="error"
        >
          <div className="flex justify-center">
            <LinkButton href="/my-course">Reset Filters</LinkButton>
          </div>
        </EdgecaseContainer>
      </div>
    );
  }

  return <MyCourseScreen courses={courses?.courses} params={queryParams} />;
}
