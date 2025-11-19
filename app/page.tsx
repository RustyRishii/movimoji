"use client"
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Modern_Antiqua } from "next/font/google";

export default function Home() {

  const [text, setText] = useState("");

  const [answer, setAnswer] = useState("")

  useEffect(() => {
    console.log(
      "%c Trying to find the API key huh?! Good luck lol ",
      "color: white; background: #111; padding: 10px 20px; font-size: 12px; border-radius: 8px; font-weight: bold;"
    );
  }, [])

  async function EmojiCall() {
    try {
      const response = await fetch('/api/emoji', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ text })
      });

      const data = await response.json();
      console.log(data.answer)
      setAnswer(data.answer)

    } catch (error) {
      console.error('Error:', error)
    }

    // const url = "https://openrouter.ai/api/v1/chat/completions"
    // try {
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
    //       'Content-Type': 'application/json',

    //     },
    //     body: JSON.stringify({
    //       model: 'anthropic/claude-haiku-4.5',
    //       messages: [
    //         {
    //           role: 'user',
    //           content: `Your job is to convert the give text into emojis. Max 10 emojis
    //           If the user types a movie or TV show name, make sure to include the summary of it, But only in emojis. Not text ay all.di
    //           Only and Only emojis. No text respose at all. No matter what happens, you do not write any text in the response at all.
    //           THIS IS A STRICT INSTRUCTION, YOU HAVE TO FOLLOW IT, OR ELSE YOU WILL BE FIRED. ${text}`
    //         },
    //       ],

    //     })
    //   })

    //   const data = await response.json()

    //   const mainAnswer = data.choices[0].message.content;
    //   setAnswer(mainAnswer)
    //   console.log(data.choices[0].message.content)
    // } catch (error) {
    //   console.error('Error:', error)
    // }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-2xl">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            movimoji 🎬
          </h1>
          <p className="text-lg text-gray-600">
            Transform your text into expressive emojis
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <div className="flex flex-col items-center gap-6">

            <input
              autoFocus={true}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 text-xl text-center border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400"
              type="text"
              placeholder="Enter a movie title or any text..."
            />


            <button
              onClick={() => EmojiCall()}
              disabled={!text || text.trim() === ''}
              className={`w-full md:w-auto px-8 py-4 text-lg font-semibold rounded-xl transition-colors duration-200 shadow-md ${!text || text.trim() === ''
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg cursor-pointer'
                }`}
            >
              Generate Emojis ✨
            </button>


            {answer && (
              <div className="w-full mt-4 p-8 bg-gray-50 rounded-2xl border-2 border-gray-100">
                <p className="text-5xl text-center leading-relaxed">
                  {answer}
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Built by
          <a target="_blank" href="https://x.com/RustyRishii"> @RustyRishii</a>
        </p>
      </div>
    </div>
  );
}