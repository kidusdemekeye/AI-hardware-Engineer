import { NextRequest, NextResponse } from "next/server";
import { generateDesign } from "@/lib/claude";
import { Question } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, questions, answers, imageBase64s } = body;

    if (!description || !questions || !answers) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const design = await generateDesign(
      description,
      questions as Question[],
      answers as Record<string, string>,
      imageBase64s
    );

    return NextResponse.json({ success: true, data: { design } });
  } catch (error) {
    console.error("Error in /api/design:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to generate design",
      },
      { status: 500 }
    );
  }
}
