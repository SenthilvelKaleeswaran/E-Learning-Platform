import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    console.log("Payload received:", request.body);

    const userId = request.headers.get("x-loc-user");

    if (!userId) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 400 });
    }

    console.log({ userId });
    const getExisitingData = await prisma.course.findFirst({
      where: {
        status: "IN_PROGRESS",
        userId,
      },
    });

    console.log({ getExisitingData });

    if (getExisitingData && getExisitingData.status === "IN_PROGRESS") {
      return NextResponse.json(
        {
          id: getExisitingData.id,
          message: "Course got successfully!",
        },
        { status: 200 }
      );
    }

    const newCourse = await prisma.course.create({
      data: {
        status: "IN_PROGRESS",
        userId,
      },
    });

    console.log({ newCourse });

    return NextResponse.json(
      {
        id: newCourse.id,
        message: "Course created successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, isCreateMyCourse, ...rest } = await request.json();
    const userId = request.headers.get("x-loc-user");

    if (!userId) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 400 });
    }

    if (!id) {
      return NextResponse.json(
        { error: "Course ID is required for updating." },
        { status: 400 }
      );
    }
    console.log({ course: "", rest });

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: rest,
    });

    if (isCreateMyCourse) {
      await prisma.myCourse.create({
        data: { courseId: id, userId },
      });
    }

    console.log({ updatedCourse });

    return NextResponse.json(
      { message: "Course updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating chapter:", error);
    return NextResponse.json(
      { error: "Failed to update chapter." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    console.log({iddd : id})

    if (!id) {
      return NextResponse.json(
        { error: "Course ID is required for deletion." },
        { status: 400 }
      );
    }

    const chapters = await prisma.chapter.findMany({
      where: { courseId: id },
    });

    const chapterIds = chapters.map((chapter : any) => chapter.id);
    console.log({chapterIds})

    await Promise.all([
      prisma.topic.deleteMany({
        where: { chapterId: { in: chapterIds } },
      }),
      prisma.chapter.deleteMany({
        where: { courseId: id },
      }),
      prisma.course.delete({
        where: { id },
      }),
    ]);

    return NextResponse.json(
      { message: "Course and its related data deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting course and its related data:", error);
    return NextResponse.json(
      { error: "Failed to delete the course and its related data." },
      { status: 500 }
    );
  }
}

