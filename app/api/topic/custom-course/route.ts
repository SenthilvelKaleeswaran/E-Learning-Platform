import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    console.log({data : " ic ame"})
    const data = await request.json();
    console.log({data})

    if (!data) {
      return NextResponse.json(
        { error: "Data is required." },
        { status: 400 }
      );
    }

    const newTopic = await prisma.topic.create({data});

    console.log({newTopic})

    return NextResponse.json(
      { message: "Topic created successfully", topic: newTopic },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json(
      { error: "Failed to create topic." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const {id,...rest} = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Topic ID is required for updating." },
        { status: 400 }
      );
    }

    const updatedTopic = await prisma.topic.update({
      where: { id },
      data: rest,
    });

    return NextResponse.json(
      { message: "Topic updated successfully", topic: updatedTopic },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating topic:", error);
    return NextResponse.json(
      { error: "Failed to update topic." },
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
        { error: "Topic ID is required for deletion." },
        { status: 400 }
      );
    }

    await prisma.topic.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Topic deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting topic:", error);
    return NextResponse.json(
      { error: "Failed to delete topic." },
      { status: 500 }
    );
  }
}
