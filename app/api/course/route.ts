import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const courses = await prisma.course.findMany();

    return NextResponse.json({ courses });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to get all courses. Please try again !" },
      { status: 500 }
    );
  }
}
