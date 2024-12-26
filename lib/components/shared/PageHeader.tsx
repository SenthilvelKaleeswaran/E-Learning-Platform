import React from "react";

export default function PageHeader({ title }: { title: string }) {
  return <p className="text-base font-semibold">{title}</p>;
}
