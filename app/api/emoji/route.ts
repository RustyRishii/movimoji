import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { text } = await request.json();
  
  const url = "https://openrouter.ai/api/v1/chat/completions";
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`, // No NEXT_PUBLIC_ prefix!
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-haiku-4.5',
        messages: [
          {
            role: 'user',
            content: `Your job is to convert the give text into emojis. Max 10 emojis
            If the user types a movie or TV show name, make sure to include the summary of it, But only in emojis. Not text at all.
            Only and Only emojis. No text response at all. No matter what happens, you do not write any text in the response at all.
            THIS IS A STRICT INSTRUCTION, YOU HAVE TO FOLLOW IT, OR ELSE YOU WILL BE FIRED. ${text}`
          },
        ],
      })
    });

    const data = await response.json();
    return NextResponse.json({ answer: data.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate emojis' }, { status: 500 });
  }
}