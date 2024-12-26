import React from "react";
import { Button, Video } from "@/lib/components/ui";
import { PageHeader, RenderSpace } from "@/lib/components/shared";
import { Icon } from "@/lib/icon";

export default function TopicSpace({
  data,
  currentTopic,
  disabled,
  isTopicCompleted,
  handleUpdateTopic,
}: any) {
  return (
    <div className="p-4 w-full h-full space-y-4">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1">
          <PageHeader title={data?.course?.name} />
          <p className="text-xl font-semibold">
            {currentTopic?.name || "Loading..."}
          </p>
        </div>
        {isTopicCompleted ? (
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
        ) : (
          <RenderSpace condition={data?.myCourse && currentTopic?.id}>
            <Button
              disabled={disabled}
              onClick={() => {
                let payload: any = {
                  id: data?.myCourse?.id,
                  completedTopics: { push: { topicId: currentTopic?.id } },
                };

                if (data?.myCourse?.status === "NOT_STARTED")
                  payload.status = "IN_PROGRESS"

                handleUpdateTopic(payload);
              }}
            >
              Mark Topic as Completed
            </Button>
          </RenderSpace>
        )}
      </div>

      <div className="space-y-4">
        <Video src={currentTopic?.link} />

        <RenderSpace condition={currentTopic?.description}>
          <div className="space-y-2">
            <p className="text-[18px] font-semibold">Description</p>
            <p className="text-[14px] text-gray-600">
              {currentTopic?.description}
            </p>
          </div>
        </RenderSpace>
      </div>
    </div>
  );
}
