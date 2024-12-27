import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: any) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "No Id found" }, { status: 400 });
    }

    const userId = request.headers.get("x-loc-user");

    if (!userId) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 400 });
    }

    const [course, myCourse] = await Promise.all([
      prisma.course.findUnique({
        where: { id },
        include: {
          chapters: {
            include: {
              topics: true,
            },
          },
        },
      }),
      prisma.myCourse.findFirst({
        where: { courseId: id, userId },
      }),
    ]);

    if (!course) {
      return NextResponse.json(
        { error: "No such course found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ course, myCourse });
  } catch (error) {
    console.error("Error fetching course data:", error);

    return NextResponse.json(
      { error: "Failed to get the course. Please try again!" },
      { status: 500 }
    );
  }
}
