import verifyApiAccess from "@/lib/auth/verify-api-access";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const token = verifyApiAccess(request);

    const userId = (token as any)?.user?.id;

    const courses = await prisma.myCourse.findAll({
      where: { userId },
      include: {
        Course: {
          include: {
            Chapter: {
              include: {
                Topic: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ courses });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to get all courses. Please try again !" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = verifyApiAccess(request);
    const userId = (token as any)?.user?.id;

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    const course = await prisma.course.findUnique({ where: { id } });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const registerCourse = await prisma.myCourse.create({
      data: { courseId: id, userId },
    });

    if (!registerCourse) {
      return NextResponse.json(
        { error: "Failed to add course" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Course successfully registered" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering course:", error);
    return NextResponse.json(
      {
        error:
          "An error occurred while registering the course. Please try again later.",
      },
      { status: 500 }
    );
  }
}
