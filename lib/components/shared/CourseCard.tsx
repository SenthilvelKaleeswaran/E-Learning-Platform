"use client";
import { Icon } from "@/lib/icon";
import React from "react";
import { Button, ProgressBar } from "@/lib/components/ui";
import {
  useAddToMyCourse,
  useCreateCourse,
  useUpdateMyCourse,
} from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { handleCourseCompletion } from "@/lib/utils";
import ImageContainer from "./ImageContainer";
import OptionsSelector from "./OptionsSelector";
import RenderSpace from "./RenderSpace";

export default function CourseCard({
  data,
  showCompleted,
  showOptions = false,
}: any) {
  const router = useRouter();
  const { mutate: handleAddToMyCourse, variables } = useAddToMyCourse();
  const {
    mutate: handleUpdateMyCourse,
    variables: updateRequested,
    isPending: isCompleting,
  } = useUpdateMyCourse();

  const { deleteCourse, isCourseDeleting } = useCreateCourse();

  const handleCompletion = (item: any) => {
    const completedTopics =
      item?.completedTopics?.map((item: any) => item?.topicId) || [];
    handleCourseCompletion({
      chapters: item?.chapters,
      id: item?.myCourseId,
      completedTopics,
      submit: handleUpdateMyCourse,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 ">
      {data?.map((item: any) => (
        <div
          onClick={() =>
            router.push(`/course?id=${item?.courseId || item?.id}`)
          }
          className="cursor-pointer rounded-md relative"
          key={item?.id}
        >
          <ImageContainer
            src={item?.imageUrl}
            alt={item?.name}
            width={320}
            height={150}
            className="w-full h-[164px] object-cover rounded-t-md rounded-b-none border border-gray-400"
          />
          <RenderSpace condition={showOptions}>
            <div className="absolute top-2 right-2">
              <OptionsSelector
                handleEdit={() => router.push(`/create/${item?.id}`)}
                handleDelete={() => deleteCourse(item?.id)}
                deleteLoading={isCourseDeleting}
                handleView={() => router.push(`/course?id=${item?.id}`)}
              />
            </div>
          </RenderSpace>

          <div className="px-4 py-2 space-y-4 border-b border-l border-r border-gray-400 rounded-b-md">
            <div className="flex justify-between items-center">
              <p className="text-base font-semibold  text-ellipsis overflow-hidden whitespace-nowrap w-full">
                {item?.name}
              </p>

              <div className="flex gap-1 items-center bg-blue-100 text-blue-500 py-1.5 px-2 rounded-md">
                <Icon name="Module" />
                <span>{item?.chapters?.length}</span>
                <span> modules</span>
              </div>
            </div>

            <div>
              {item?.myCourseId &&
              !item?.userId &&
              item?.status !== "IN_PROGRESS" ? (
                <div className="flex justify-between gap-4">
                  <ProgressBar
                    value={
                      item?.status === "COMPLETED"
                        ? 100
                        : item?.completedPercentage
                    }
                  />

                  {showCompleted && item?.status !== "COMPLETED" ? (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCompletion(item);
                      }}
                      disabled={
                        updateRequested?.id === item?.myCourseId || isCompleting
                      }
                    >
                      Completed
                    </Button>
                  ) : null}
                </div>
              ) : item?.userId && item?.status === "IN_PROGRESS" &&  !item.completedPercentage? (
                <div className="flex gap-2 items-center justify-between">
                  <p className="p-1 bg-orange-400 px-2 text-xs rounded-full text-white ">
                    In Progress
                  </p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/create/${item?.id}`);
                    }}
                  >
                    Continue Creating
                  </Button>
                </div>
              ) : item?.userId  ? (
                <div className="flex justify-between gap-4">
                  <ProgressBar
                    value={
                      item?.status === "COMPLETED"
                        ? 100
                        : item?.completedPercentage
                    }
                  />

                  { item?.status !== "COMPLETED" ? (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCompletion(item);
                      }}
                      disabled={
                        updateRequested?.id === item?.myCourseId || isCompleting
                      }
                    >
                      Completed
                    </Button>
                  ) : null}
                </div>
              ) : (
                <div className="flex justify-end gap-4">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToMyCourse(item?.id);
                    }}
                    disabled={variables === item?.id}
                    className="w-fit px-4 "
                  >
                    Move to My Course
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
