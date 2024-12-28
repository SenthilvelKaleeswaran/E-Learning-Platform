"use client";
import React from "react";
import {
  PageHeader,
  CourseCard,
  EdgecaseContainer,
} from "@/lib/components/shared";
import { Button, Tab, TabList, Tabs } from "@/lib/components/ui";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { formatCourseData, queryParams } from "@/lib/utils";

export default function MyCourseScreen({ courses, params }: any) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const status = params?.status || "All";

  const formatData = courses?.map((item: any) => {
    const data = formatCourseData(item?.course, {
      id: item?.id,
      status: item?.status,
      length: item?.completedTopics?.length || 0,
    });

    return {
      ...item,
      ...data,
    };
  });

  const handleTabChange = (id: string) => {
    const props = { searchParams, pathName };
    let newPath = "";

    if (id === "All") {
      newPath = queryParams({ deleteParam: true, key: "status", ...props });
    } else {
      newPath = queryParams({ key: "status", value: id, ...props });
    }

    router.push(newPath);
  };

  const getEdgecaseCard = () => {
    let title = "";
    let description = "";
    let children;

    if (status === "All") {
      title = "No Courses Created / Enrolled Yet!";
      description =
        "It looks like you haven't enrolled in any courses yet. Take your first step towards learning by exploring our available courses.";
      children = (
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button
            onClick={() => router.push("/course-library")}
            className="w-fit px-4"
          >
            Explore Courses
          </Button>
          <Button
            onClick={() => router.push("/create")}
            className="w-fit px-4 place-content-center"
          >
            Create Course
          </Button>
        </div>
      );
    } else if (status === "ENROLLED") {
      title = "No Courses Enrolled Yet!";
      description =
        "It looks like you haven't enrolled in any courses yet. Take your first step towards learning by exploring our available courses.";
      children = (
        <div className="flex justify-center">
          <Button
            onClick={() => router.push("/course-library")}
            className="w-fit px-4"
          >
            Explore Courses
          </Button>
        </div>
      );
    } else if (status === "COMPLETED") {
      title = "No Courses Completed Yet!";
      description =
        "You haven't completed any courses yet. Get started and complete your first course to level up your skills!";
    } else if (status === "MYCOURSES") {
      title = "No Courses Created Yet!";
      description =
        "Planning to organizing the course. Create a course now itself";
      children = (
        <div className="flex justify-center">
          <Button
            onClick={() => router.push("/create")}
            className="w-fit px-4 place-content-center"
          >
            Create Course
          </Button>
        </div>
      );
    }

    return (
      <EdgecaseContainer title={title} description={description} type={"dark"}>
        {children}
      </EdgecaseContainer>
    );
  };

  return (
    <div className="h-full w-full space-y-4">
      <PageHeader title="My Course" />
      <Tabs defaultTab={status} onTabChange={handleTabChange}>
        <TabList>
          <Tab id="All">All</Tab>
          <Tab id="ENROLLED">Enrolled Courses</Tab>
          <Tab id="MYCOURSES">My Courses</Tab>
          <Tab id="COMPLETED">Finished</Tab>
        </TabList>
      </Tabs>
      {formatData?.length !== 0 ? (
        <CourseCard data={formatData} showCompleted />
      ) : (
        <div className="h-full p-6">{getEdgecaseCard()}</div>
      )}
    </div>
  );
}
