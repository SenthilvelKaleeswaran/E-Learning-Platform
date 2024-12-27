"use client"
import { Icon } from "@/lib/icon";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton() {
  const router = useRouter();
  return (
    <div
      className="cursor-pointer rounded-full hover:bg-gray-300 p-1"
      onClick={() => router.back()}
    >
      <Icon name="ArrowLeft" className="w-3 h-3" />
    </div>
  );
}
