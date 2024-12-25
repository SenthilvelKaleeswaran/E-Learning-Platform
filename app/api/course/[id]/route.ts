import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "No Id found" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        Chapter: {
          include: {
            Topic: true,
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: "No such course found" },
        { status: 400 }
      );
    }

    return NextResponse.json({ course });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to get the course. Please try again !" },
      { status: 500 }
    );
  }
}
