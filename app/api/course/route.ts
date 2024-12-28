import { formatCourseData } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-loc-user");

    if (!userId) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const createdCourse = Boolean(searchParams.get("createdCourse")) || false;
    console.log({createdCourse})
    const condition = createdCourse
      ? userId
      : {
          isSet: false,
        };

    const [courses, myCourses] = await Promise.all([
      prisma.course.findMany({
        where: {
          userId: condition,
        },
        include: {
          chapters: {
            include: {
              topics: true,
            },
          },
        },
      }),
      prisma.myCourse.findMany({
        where: { userId },
      }),
    ]);

    console.log({ courses });

    const myCoursesMap = new Map(
      myCourses.map((myCourse) => [
        myCourse.courseId,
        {
          id: myCourse?.id,
          length: myCourse?.completedTopics?.length ?? 0,
          status: myCourse?.status,
        },
      ])
    );

    const coursesWithProgress = courses.map((course: any) => {
      const details = myCoursesMap.get(course.id);

      if (details !== undefined) return formatCourseData(course, details);

      return course;
    });

    return NextResponse.json({ courses: coursesWithProgress });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get all courses. Please try again!" },
      { status: 500 }
    );
  }
}


