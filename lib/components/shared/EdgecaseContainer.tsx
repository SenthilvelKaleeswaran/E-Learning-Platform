import React from "react";

export default function EdgecaseContainer({
  topic,
  description,
  children,
}: any) {
  return (
    <div className="rounded-md outline-dotted outline-gray-500 w-full p-8 space-y-8">
      <div className="space-y-4">
        <p className="text-2xl text-gray-800 font-bold text-center">{topic}</p>
        <p className="text-base text-gray-600  text-center">{description}</p>
      </div>

      {children ? <div className="place-content-center">{children} </div>: null}
    </div>
  );
}
