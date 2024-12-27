import React from "react";
import {  Video } from "@/lib/components/ui";
import { PageHeader, RenderSpace } from "@/lib/components/shared";

export default function TopicSpace({
  data,
  currentTopic,
  renderStatusButton,
}: any) {
  return (
    <div className="p-4 space-y-4 pb-20 w-full h-[calc(100vh-69px)] overflow-y-scroll">
      <div className="flex md:flex-row justify-between items-start gap-4">
        <div className="space-y-1">
          <PageHeader title={data?.course?.name} />
          <p className="text-xl font-semibold h-6">
            {currentTopic?.name || ""}
          </p>
        </div>
        <div className="hidden md:block">{renderStatusButton()}</div>
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
