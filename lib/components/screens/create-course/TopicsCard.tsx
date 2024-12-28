import React from "react";
import {
  DeleteButton,
  EditButton,
  VideoThumbnail,
} from "@/lib/components/shared";

export default function TopicsCard({
  topics,
  handleEdit,
  handleDelete,
  editDisable,
  deleteDisable,
}: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {topics?.map((topic: any, index: any) => (
        <div
          key={index}
          className="bg-white p-2 rounded-md border border-gray-300"
        >
          <VideoThumbnail videoUrl={topic?.link} className="w-full" />
          <div className="p-4 space-y-2 w-full">
            <p className="font-medium text-ellipsis overflow-hidden whitespace-nowrap w-full">
              {topic.name}
            </p>

            <p className="text-sm text-gray-600 line-clamp-1 text-ellipsis whitespace-nowrap overflow-hidden">
              {topic.description}
            </p>
          </div>
          <div className="flex  justify-end gap-2">
            <EditButton
              onClick={() => handleEdit(index)}
              disabled={editDisable}
            >
              Edit
            </EditButton>

            <DeleteButton
              onClick={() => handleDelete(topic?.id)}
              disabled={deleteDisable}
            >
              Delete
            </DeleteButton>
          </div>
        </div>
      ))}
    </div>
  );
}
