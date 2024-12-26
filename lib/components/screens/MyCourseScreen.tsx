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
    let newPath = "";
    const props = { key: "status", searchParams, pathName };
    if (id === "All") newPath = queryParams({ deleteParam: true, ...props });
    else newPath = queryParams({ value: id, ...props });
    router.push(newPath);
  };

  const getEdgecaseCard = () => {
    let topic = "";
    let description = "";
    let children;

    if (status === "All") {
      topic = "No Courses Enrolled Yet!";
      description =
        "It looks like you haven't enrolled in any courses yet. Take your first step towards learning by exploring our available courses.";
      children = (
        <Button
          onClick={() => router.push("/course-library")}
          className="w-fit px-4"
        >
          Explore Courses
        </Button>
      );
    } else if (status === "COMPLETED") {
      topic = "No Courses Completed Yet!";
      description =
        "You haven't completed any courses yet. Get started and complete your first course to level up your skills!";
    }

    return (
      <EdgecaseContainer
        topic={topic}
        description={description}
        children={children}
      />
    );
  };

  return (
    <div className="h-full w-full space-y-4">
      <PageHeader title="My Course" />
      <Tabs defaultTab={status} onTabChange={handleTabChange}>
        <TabList>
          <Tab id="All">All</Tab>
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
