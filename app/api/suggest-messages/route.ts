import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Generate text with the specified model and prompt
    const { text } = await generateText({
      model: google("gemini-1.5-pro-latest"), // Specify the Gemini model
      prompt, // Input prompt
      maxTokens: 400, // Optional: specify max tokens
    });

    // Respond with the generated text
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Error generating text:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
