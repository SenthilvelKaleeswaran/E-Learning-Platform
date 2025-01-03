"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAddToMyCourse, useUpdateMyCourse } from "@/lib/hooks";
import {
  calculateTotalTopics,
  formatDateTime,
  handleCourseCompletion,
} from "@/lib/utils";
import {
  Button,
  Drawer,
  DrawerPanel,
  DrawerTrigger,
} from "@/lib/components/ui";
import { Icon } from "@/lib/icon";
import { BackButton, RenderSpace } from "@/lib/components/shared";
import TopicSpace from "./TopicSpace";
import CourseSidebar from "./CourseSidebar";

interface CourseScreenProps {
  data: any;
}

export default function CourseScreen({ data }: CourseScreenProps) {
  const initialTopic = useMemo(() => {
    return data?.course?.chapters?.[0]?.topics?.[0] || {};
  }, [data?.course?.chapters]);

  const [currentTopic, setCurrentTopic] = useState<any>({});

  const completedTopics = useMemo(() => {
    return (
      data?.myCourse?.completedTopics?.map((item: any) => item?.topicId) || []
    );
  }, [data?.myCourse?.completedTopics]);

  const totalTopics = calculateTotalTopics(data?.course?.chapters);

  const { mutate: handleAddToMyCourse, isPending: isAddingCourse } =
    useAddToMyCourse();

  const {
    mutate: handleUpdateMyCourrse,
    variables,
    isPending,
  } = useUpdateMyCourse();

  const handleTopicSelect = useCallback(
    (selectedTopic: any, updateTime?: any) => {
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
    },
    [completedTopics, data?.myCourse?.completedTopics]
  );

  useEffect(() => {
    if (!(currentTopic as any)?.id) {
      handleTopicSelect(initialTopic);
    }
  }, [currentTopic, initialTopic, handleTopicSelect]);

  const handleUpdateMyCourse = (data: any) => {
    const time = new Date();
    handleUpdateMyCourrse(data);
    handleTopicSelect(currentTopic, time);
  };

  const handleCompletion = () => {
    handleCourseCompletion({
      chapters: data?.course?.chapters,
      id: data?.myCourse?.id,
      completedTopics,
      submit: handleUpdateMyCourrse,
    });
  };

  const handleUpdateTopic = () => {
    const payload: any = {
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

  const renderSideBar = () => {
    return (
      <CourseSidebar
        data={data}
        handleTopicSelect={handleTopicSelect}
        currentTopic={currentTopic}
        completedTopics={completedTopics}
        disabled={isDisabled()}
        handleCourseCompletion={handleCompletion}
        handleAddToMyCourse={handleAddToMyCourse}
      />
    );
  };

  const renderStatusButton = () => {
    console.log({isTopicCompleted})
    if (isTopicCompleted) {
      return (
        <div className="space-y-2">
          <div className="flex gap-2 items-center text-green-500 bg-green-200 rounded-full px-4 py-1">
            <Icon name="Tick" />
            <span className="text-sm">Completed</span>
          </div>

          <RenderSpace condition={currentTopic?.date}>
            <div className="flex gap-2 text-xs px-2 text-gray-500">
              <Icon name="Calendar" />
              <span>{currentTopic?.date}</span>
              <span>{currentTopic?.time?.slice(0, 5)}</span>
            </div>
          </RenderSpace>
        </div>
      );
    } else {
      console.log("isTopicCompleted")
      return (
        <RenderSpace condition={data?.myCourse && currentTopic?.id || data?.course?.userId && data?.course?.status === "COMPLETED"}>
          <Button disabled={isDisabled()} onClick={handleUpdateTopic}>
            Completed
          </Button>
        </RenderSpace>
      );
    }
  };

  return (
    <div className=" w-full">
      <div className="flex md:hidden items-start justify-between gap-4  w-full  p-2">
        <div className="flex gap-2 items-center">
          <BackButton />

          <Drawer>
            <DrawerTrigger>
              <div className="border p-2 rounded-md bg-gray-200 cursor-pointer">
                Course Content
              </div>
            </DrawerTrigger>
            <DrawerPanel header={"Course Content"}>
              <div className="w-full h-full border-r">{renderSideBar()}</div>
            </DrawerPanel>
          </Drawer>
        </div>
        <div>{renderStatusButton()}</div>
      </div>

      <div className="flex">
        <div className="w-[400px] border-r hidden md:block">
          {renderSideBar()}
        </div>

        <TopicSpace
          data={data}
          currentTopic={currentTopic}
          renderStatusButton={renderStatusButton}
        />
      </div>
    </div>
  );
}
