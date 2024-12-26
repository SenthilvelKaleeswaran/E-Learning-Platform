"use client";
import { Icon } from "@/lib/icon";
import Image from "next/image";
import React from "react";
import { Button, ProgressBar } from "@/lib/components/ui";
import { useAddToMyCourse, useUpdateMyCourse } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export default function CourseCard({ data, showCompleted }: any) {
  const router = useRouter();
  const { mutate: handleAddToMyCourse, variables } = useAddToMyCourse();
  const { mutate: handleUpdateMyCourrse, variables: updateRequested } =
    useUpdateMyCourse();

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {data?.map((item: any) => (
        <div
          onClick={() =>
            router.push(`/course?id=${item?.courseId || item?.id}`)
          }
          className="cursor-pointer rounded-md"
          key={item?.id}
        >
          <Image
            src={item?.imageUrl}
            alt={item?.name}
            width={320}
            height={150}
            className="rounded-t-md object-cover"
            objectFit="false"
          />

          <div className="px-4 py-2 space-y-4 border-b border-l border-r border-gray-400 rounded-b-md">
            <div className="flex justify-between items-center">
              <p className="text-base font-semibold">{item?.name}</p>
              <div className="flex gap-1 items-center bg-blue-100 text-blue-500 py-1.5 px-2 rounded-md">
                <Icon name="Module" />
                <span>{item?.chapters?.length} modules</span>
              </div>
            </div>

            <div>
              {item?.isMyCourse ? (
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
                        handleUpdateMyCourrse({
                          id: item?.myCourseId || item?.id,
                          status: "COMPLETED",
                        });
                      }}
                      className="z-50"
                      disabled={
                        updateRequested === item?.myCourseId || item?.courseId
                      }
                    >
                      Completed
                    </Button>
                  ) : null}
                </div>
              ) : (
                <div className="flex justify-end gap-4">
                  <Button
                    onClick={() => handleAddToMyCourse(item?.id)}
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
