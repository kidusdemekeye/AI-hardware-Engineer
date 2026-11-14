import Anthropic from "@anthropic-ai/sdk";
import { Question, Design } from "./types";

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function generateQuestions(
  description: string,
  imageBase64s?: string[]
): Promise<{ questions: Question[] }> {
  const contentBlocks: Anthropic.ContentBlockParam[] = [
    {
      type: "text",
      text: `You are an expert hardware engineer. Ask 5-7 critical clarifying questions to understand the user's project requirements. Return a JSON object with a 'questions' array where each item has {id: string, question: string, hint?: string}.

User's project description:
${description}`,
    },
  ];

  // Add image blocks if provided
  if (imageBase64s && imageBase64s.length > 0) {
    for (const base64 of imageBase64s) {
      contentBlocks.push({
        type: "image",
        source: {
          type: "base64",
          media_type: "image/jpeg",
          data: base64,
        },
      });
    }
  }

  const response = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: contentBlocks,
      },
    ],
  });

  const textContent = response.content.find((block) => block.type === "text");
  if (!textContent || textContent.type !== "text") {
    throw new Error("No text response from Claude");
  }

  try {
    const parsed = JSON.parse(textContent.text);
    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      throw new Error("Invalid response format: missing questions array");
    }
    return { questions: parsed.questions };
  } catch (error) {
    throw new Error(
      `Failed to parse Claude response: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export async function generateDesign(
  description: string,
  questions: Question[],
  answers: Record<string, string>,
  imageBase64s?: string[]
): Promise<Design> {
  const qaText = questions
    .map((q) => `Q: ${q.question}\nA: ${answers[q.id] || ""}`)
    .join("\n\n");

  const contentBlocks: Anthropic.ContentBlockParam[] = [
    {
      type: "text",
      text: `You are an expert hardware engineer. Generate a complete design specification for the given project. Return a JSON object with:
- projectName: string
- description: string
- parts: array of {id, name, quantity, supplier, link, price, notes}
- openScadCode: string (valid OpenSCAD code)
- wiringPlan: string (ASCII diagram)
- wiringCode?: string (optional Arduino/Python code)
- assemblySteps: array of strings

Project Description:
${description}

Q&A with user:
${qaText}

Generate realistic parts with real supplier links and current prices. Return valid JSON only.`,
    },
  ];

  if (imageBase64s && imageBase64s.length > 0) {
    for (const base64 of imageBase64s) {
      contentBlocks.push({
        type: "image",
        source: {
          type: "base64",
          media_type: "image/jpeg",
          data: base64,
        },
      });
    }
  }

  const response = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: contentBlocks,
      },
    ],
  });

  const textContent = response.content.find((block) => block.type === "text");
  if (!textContent || textContent.type !== "text") {
    throw new Error("No text response from Claude");
  }

  try {
    const parsed = JSON.parse(textContent.text);
    return {
      id: Date.now().toString(),
      projectName: parsed.projectName || "Untitled Project",
      description,
      parts: parsed.parts || [],
      openScadCode: parsed.openScadCode || "",
      wiringPlan: parsed.wiringPlan || "",
      wiringCode: parsed.wiringCode,
      assemblySteps: parsed.assemblySteps || [],
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    throw new Error(
      `Failed to parse design response: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
