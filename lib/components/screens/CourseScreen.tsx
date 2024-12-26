"use client";

import React, { useEffect, useState } from "react";
import CourseSidebar from "./course/CourseSidebar";
import TopicSpace from "./course/TopicSpace";
import { useAddToMyCourse, useUpdateMyCourse } from "@/lib/hooks";
import { calculateTotalTopics, formatDateTime } from "@/lib/utils";

interface CourseScreenProps {
  data: any;
}

export default function CourseScreen({ data }: CourseScreenProps) {
  const initialTopic = data?.course?.chapters?.[0]?.topics?.[0] || {};
  const [currentTopic, setCurrentTopic] = useState<any>({});

  const completedTopics =
    data?.myCourse?.completedTopics?.map((item: any) => item?.topicId) || [];

  const totalTopics = calculateTotalTopics(data?.course?.chapters);

  const { mutate: handleAddToMyCourse, isPending: isAddingCourse } =
    useAddToMyCourse();

  const {
    mutate: handleUpdateMyCourrse,
    variables,
    isPending,
  } = useUpdateMyCourse();

  const handleTopicSelect = (selectedTopic: any, updateTime?: any) => {
    const { id } = selectedTopic;

    if (completedTopics.includes(id) || updateTime) {
      const completionDate =
        updateTime ||
        data?.myCourse?.completedTopics?.find(
          (item: any) => item?.topicId === id
        )?.completedAt;
      const { date, time } = formatDateTime(completionDate);
      console.log({ date, time });
      selectedTopic.date = date;
      selectedTopic.time = time;
    }

    setCurrentTopic(selectedTopic);
  };

  useEffect(() => {
    if (!(currentTopic as any)?.id) {
      handleTopicSelect(initialTopic);
    }
  }, []);

  const handleUpdateMyCourse = (data: any) => {
    const time = new Date();
    handleUpdateMyCourrse(data);
    handleTopicSelect(currentTopic, time);
  };

  const handleCourseCompletion = () => {
    const topicId = data?.course?.chapters
      ?.map((item: any) => {
        return item?.topics?.map((topic: any) => {
          if (!completedTopics?.includes(topic?.id))
            return {
              topicId: topic?.id,
            };
        });
      })
      .flat()
      .filter((item: any) => Boolean(item));

    handleUpdateMyCourrse({
      id: data?.myCourse?.id,
      status: "COMPLETED",
      completedTopics: { push: topicId },
    });
    console.log({ topicId });
  };

  const handleUpdateTopic = () => {
    let payload: any = {
      id: data?.myCourse?.id,
      completedTopics: { push: { topicId: currentTopic?.id } },
    };

    if (data?.myCourse?.status === "NOT_STARTED")
      payload.status = "IN_PROGRESS";
    else if (totalTopics === completedTopics?.length + 1)
      payload.status = "COMPLETED";

    handleUpdateMyCourse(payload);
  };

  const isTopicCompleted = completedTopics.includes(currentTopic?.id);

  const isDisabled = () => {
    return (
      ((variables?.completedTopics?.push?.topicId === currentTopic?.id ||
        variables?.completedTopics?.push?.length > 0) &&
        isPending) ||
      isAddingCourse
    );
  };

  return (
    <div className="h-full w-full space-y-4">
      <div className="flex">
        <div className="w-[400px] h-full border-r ">
          <CourseSidebar
            data={data}
            handleTopicSelect={handleTopicSelect}
            currentTopic={currentTopic}
            completedTopics={completedTopics}
            disabled={isDisabled()}
            handleCourseCompletion={handleCourseCompletion}
            handleAddToMyCourse={handleAddToMyCourse}
          />
        </div>

        <TopicSpace
          data={data}
          isTopicCompleted={isTopicCompleted}
          currentTopic={currentTopic}
          disabled={isDisabled()}
          handleUpdateTopic={handleUpdateTopic}
        />
      </div>
    </div>
  );
}
