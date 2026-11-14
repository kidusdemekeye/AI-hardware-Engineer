import { NextRequest, NextResponse } from "next/server";
import { generateQuestions } from "@/lib/claude";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, imageBase64s } = body;

    if (!description || typeof description !== "string") {
      return NextResponse.json(
        { success: false, error: "Description is required" },
        { status: 400 }
      );
    }

    const result = await generateQuestions(description, imageBase64s);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error in /api/questions:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate questions",
      },
      { status: 500 }
    );
  }
}
