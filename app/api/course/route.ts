import verifyApiAccess from "@/lib/auth/verify-api-access";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const token = verifyApiAccess(request);
    const userId = (token as any)?.user?.id;

    const [courses, myCourses] = await Promise.all([
      prisma.course.findMany({
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

    const myCoursesMap = new Map(
      myCourses.map((myCourse) => [
        myCourse.courseId,
        {id : myCourse?.id , length : myCourse?.completedTopics?.length ?? 0,status : myCourse?.status},
      ])
    );

    const coursesWithProgress = courses.map((course: any) => {
      const details = myCoursesMap.get(course.id);
      
      if (details !== undefined) {
        const totalTopics = course.chapters.reduce(
          (count: number, chapter: { topics: any[] }) => 
            count + chapter.topics.length,
          0
        );

        return {
          ...course,
          isMyCourse: true,
          myCourseId : details?.id,
          status : details?.status,
          completedPercentage: (details?.length / totalTopics) * 100 || 0
        };
      }
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