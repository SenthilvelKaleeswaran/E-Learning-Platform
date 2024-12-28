import React from "react";
import { Accordion, AccordionItem, Button, Input } from "@/lib/components/ui";
import { ImageContainer, RenderSpace } from "@/lib/components/shared";
import Image from "next/image";
import { useCreateCourse } from "@/lib/hooks";

export default function CourseDetailsCard({ course, setCourse }: any) {
  const { updateCourse, isCourseUpdating } = useCreateCourse();
  return (
    <Accordion allowMultiple>
      <AccordionItem
        title={"Course Details"}
        description={`Details about the course `}
        className="border border-gray-300 rounded-md space-y-4 drop-shadow-lg"
        isActive
        isHighlight={false}
        renderProp={
          <Button
            disabled={
              !course?.name ||
              course?.name?.trim()?.length < 3 ||
              isCourseUpdating
            }
            onClick={(e: any) => {
              e.stopPropagation();
              updateCourse({
                id: course?.id,
                name: course?.name,
                imageUrl: course?.imageUrl,
              });
            }}
          >
            Submit
          </Button>
        }
      >
        <div className="flex flex-col sm:flex-row gap-4 space-y-4 border rounded-md">
          <div className="space-y-4 w-full">
            <Input
              id="course-name"
              type="text"
              label="Course Name"
              value={course.name}
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
              placeholder="Enter course name"
            />
            <Input
              id="image-url"
              type="text"
              label="Image URL"
              value={course.imageUrl}
              onChange={(e) =>
                setCourse({ ...course, imageUrl: e.target.value })
              }
              placeholder="Enter image URL"
            />
          </div>
          <ImageContainer
            src={course.imageUrl}
            alt="Course Preview"
            className="w-full sm:w-44 h-[140px] object-fill rounded-md border flex"
          />
         
        </div>{" "}
      </AccordionItem>
    </Accordion>
  );
}
