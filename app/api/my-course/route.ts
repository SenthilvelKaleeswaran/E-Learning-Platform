import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("x-loc-user");

    const url = new URL(req.url);
    const filter = JSON.parse(url.searchParams.get("filter") || "") || {};

    if (Object.keys(filter)?.length) {
      const allowedKeys = ["status"];

      const invalidKeys = Object.keys(filter).filter(
        (key) => !allowedKeys.includes(key)
      );

      if (invalidKeys.length > 0) {
        return NextResponse.json({ error: `Invalid filter` }, { status: 400 });
      }

      const validStatuses = ["COMPLETED", "ENROLLED", "MYCOURSES"];

      if (!validStatuses.includes(filter.status)) {
        return NextResponse.json(
          { error: `Invalid filters` },
          { status: 400 }
        );
      }


      if(filter.status === "ENROLLED"){
        filter.course = { userId: { isSet: false } }
        delete filter.status;

      }
      else if(filter.status === "MYCOURSES"){
        filter.course ={ userId, status: "COMPLETED" };
        delete filter.status;

      }


     
    }

    console.log({ filter });

    const courses = await prisma.myCourse.findMany({
      where: { userId, ...filter },
      include: {
        course: {
          include: {
            chapters: {
              include: {
                topics: true,
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
    const userId = request.headers.get("x-loc-user");

    if (!userId) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

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

export async function PATCH(request: NextRequest) {
  try {
    const userId = request.headers.get("x-loc-user");

    if (!userId) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 400 });
    }

    const { id, ...rest } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "No Id found" }, { status: 400 });
    }

    if (!rest) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    const updatedCourse = await prisma.myCourse.update({
      where: { id },
      data: rest,
    });

    if (!updatedCourse) {
      console.error("Failed to update the course in the database");
      return NextResponse.json(
        { error: "Failed to update the course" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Course successfully updated" });
  } catch (error) {
    console.log("Error during PATCH operation:", error);
    return NextResponse.json(
      { error: "Failed to update the course. Please try again later." },
      { status: 500 }
    );
  }
}
