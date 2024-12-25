import verifyApiAccess from "@/lib/auth/verify-api-access";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    verifyApiAccess(request);

    const { id, data } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "No Id found" }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    const updatedCourse = await prisma.myCourse.update({
      where: { id },
      data,
    });

    if (!updatedCourse) {
      return NextResponse.json(
        { error: "Failed to update the course" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Course successfully updated" });
  } catch (error) {
    console.error("Error during PATCH operation:", error);

    return NextResponse.json(
      { error: "Failed to update the course. Please try again later." },
      { status: 500 }
    );
  }
}
