import React from "react";

export default function RenderSpace({ condition, children }: any) {
  if (condition) return children;
  return null;
}
