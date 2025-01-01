"use client";

import React from "react";
import { Accordion, AccordionItem, Button } from "@/lib/components/ui";
import { Icon } from "@/lib/icon";
import { BackButton, RenderSpace } from "../../shared";
import { useRouter } from "next/navigation";

interface TopicListProps {
  topics: any[];
  handleTopicSelect: (topic: any) => void;
  completedTopics: string[];
  currentTopic: any;
}

const TopicList = ({
  topics,
  handleTopicSelect,
  completedTopics,
  currentTopic,
}: TopicListProps) => {
  return (
    <div className="space-y-2 divide-y divide-gray-200 w-full">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="flex gap-2 justify-between items-center w-full"
        >
          <div
            className={`cursor-pointer w-full hover:text-blue-400 ${
              currentTopic?.id === topic.id ? "text-blue-500" : ""
            }`}
            onClick={() => handleTopicSelect(topic)}
          >
            {topic.name}
          </div>
          <RenderSpace condition={completedTopics.includes(topic.id)}>
            <div className="rounded-full p-1 text-green-500 border border-green-500">
              <Icon name="Tick" className="w-2 h-2" />
            </div>
          </RenderSpace>
        </div>
      ))}
    </div>
  );
};

interface CourseSidebarProps {
  data: any;
  handleTopicSelect: (topic: any) => void;
  currentTopic: any;
  completedTopics: string[];
  disabled: boolean;
  handleAddToMyCourse: any;
  handleCourseCompletion: any;
}

export default function CourseSidebar({
  data,
  currentTopic,
  handleCourseCompletion,
  handleAddToMyCourse,
  disabled,
  ...rest
}: CourseSidebarProps) {
  const router = useRouter();
  const chapters = data?.course?.chapters || [];
  console.log({data})

  return (
    <div className="flex flex-col h-[calc(100vh-66px)] overflow-y-auto">
      <div className="md:flex gap-2 items-center flex-shrink-0 p-4 hidden ">
        <BackButton />
        <span className="font-semibold">Course Content</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Accordion allowMultiple>
          {chapters.map((chapter: any) => (
            <RenderSpace condition={chapter?.topics?.length}  key={chapter.id}>
              <AccordionItem
               
                title={chapter.name}
                description={chapter.description}
              >
                <TopicList
                  topics={chapter.topics}
                  currentTopic={currentTopic}
                  {...rest}
                />
              </AccordionItem>
            </RenderSpace>
          ))}
        </Accordion>
      </div>
      <div className="p-4 flex-shrink-0 border-t space-y-2 ">
        <RenderSpace condition={data?.course?.userId}>
          <Button
            onClick={() => router.push(`/create/${data?.course?.id}`)}
            disabled={disabled}
            className="w-full bg-gray-800  border border-gray-400 text-gray-600"
          >
            Edit Course
          </Button>
        </RenderSpace>
        {!data?.myCourse && !data?.course?.userId ? (
          <Button
            onClick={() => handleAddToMyCourse(data?.course?.id)}
            disabled={disabled}
            className="w-full"
          >
            Move to My Course
          </Button>
        ) : (!data?.course?.userId && data?.myCourse?.status !== "COMPLETED") ||
          (data?.course?.status === "COMPLETED" &&
            data?.course?.userId &&
            data?.myCourse?.status !== "COMPLETED") ? (
          <Button
            disabled={disabled}
            onClick={() => handleCourseCompletion()}
            className="w-full"
          >
            Mark Course as Completed
          </Button>
        ) : data?.course?.status !== "COMPLETED" && data?.course?.userId ? (
          <Button disabled={true} className="w-full">
            Course is on Creation Process
          </Button>
        ) : (
          <div className="">
            <Button className="flex gap-2 justify-center items-center w-full bg-green-500 text-center cursor-auto">
              <Icon name="Tick" className="w-7" />
              <span>Course Completed</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
