import { EdgecaseContainerProps } from "@/types";
import React from "react";


export default function EdgecaseContainer({
  title,
  description,
  type = "default",
  children,
}: EdgecaseContainerProps) {
  const outlineColor =
    type === "error" ? "outline-red-500" : "outline-blue-500";

  return (
    <div
      className={`rounded-md place-content-center outline-dotted ${outlineColor} w-full p-8 space-y-8`}
    >
      <div className="space-y-4">
        <p className="text-2xl text-gray-800 font-bold text-center">{title}</p>
        <p className="text-base text-gray-600 text-center">{description}</p>
      </div>

      {children ? <div className="place-content-center">{children}</div> : null}
    </div>
  );
}
