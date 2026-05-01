import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { text } = await request.json();
  const apiKey = process.env.OPENAI_API_KEY;

  const url = "https://api.openai.com/v1/responses";

  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured." },
        { status: 500 },
      );
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-5.5",
        input: `Your job is to convert the given text into emojis. Max 10 emojis.
If the user types a movie or TV show name, include the summary only in emojis.
Only emojis. No text response at all.
THIS IS A STRICT INSTRUCTION. ${text}`,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      const errorMessage =
        data?.error?.message ?? "Upstream API request failed.";
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status },
      );
    }

    const answerFromOutput = Array.isArray(data?.output)
      ? data.output
          .flatMap(
            (item: { content?: Array<{ type?: string; text?: string }> }) =>
              Array.isArray(item?.content) ? item.content : [],
          )
          .map((contentItem: { type?: string; text?: string }) => {
            if (
              contentItem?.type === "output_text" ||
              contentItem?.type === "text"
            ) {
              return contentItem.text?.trim();
            }
            return undefined;
          })
          .find(Boolean)
      : undefined;

    const answer = data?.output_text?.trim() || answerFromOutput;

    if (!answer) {
      return NextResponse.json(
        { error: "No output text returned by the model." },
        { status: 502 },
      );
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
