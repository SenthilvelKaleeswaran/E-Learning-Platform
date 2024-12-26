import verifyApiAccess from "@/lib/auth/verify-api-access";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "No Id found" }, { status: 400 });
    }

    const token = await verifyApiAccess(request);
    const userId = (token as any)?.sub;

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
        where: { courseId: id, userId: "676bd835e8023d6ecfe946fc" },
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
