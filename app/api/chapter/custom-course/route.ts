import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { statusUpdate, myCourseStatusUpdate, myCourseId, ...rest } =
      await request.json();

    const userId = request.headers.get("x-loc-user");

    if (!userId) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 400 });
    }

    if (!rest) {
      return NextResponse.json(
        { error: "Data are required." },
        { status: 400 }
      );
    }

    const newChapter = await prisma.chapter.create({ data: rest });

    if (statusUpdate) {
      if (myCourseStatusUpdate)
        await prisma.myCourse.update({
          where: { id: myCourseId },
          data: { status: "IN_PROGRESS" },
        });
    }

    return NextResponse.json(
      { message: "Chapter created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating chapter:", error);
    return NextResponse.json(
      { error: "Failed to create chapter." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, ...rest } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Chapter ID is required for updating." },
        { status: 400 }
      );
    }

    const updatedChapter = await prisma.chapter.update({
      where: { id },
      data: rest,
    });

    return NextResponse.json(
      { message: "Chapter updated successfully", chapter: updatedChapter },
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

    if (!id) {
      return NextResponse.json(
        { error: "Chapter ID is required for deletion." },
        { status: 400 }
      );
    }

    await prisma.chapter.delete({
      where: { id },
    });

    await prisma.topic.deleteMany({
      where: { chapterId: id },
    });

    return NextResponse.json(
      { message: "Chapter deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting chapter:", error);
    return NextResponse.json(
      { error: "Failed to delete chapter." },
      { status: 500 }
    );
  }
}
