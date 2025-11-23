"use client"
import { useState, useEffect } from "react";

export default function Home() {

    const [text, setText] = useState("");
    const [answer, setAnswer] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(
            "%c Trying to find the API key huh?! Let me know if you find it. x.com/rustyrishii ",
            "color: white; background: #111; padding: 10px 20px; font-size: 12px; border-radius: 8px; font-weight: bold;"
        );
    }, [])

    async function EmojiCall() {
        if (isLoading) return;

        setIsLoading(true);
        setAnswer("");

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
        } finally {
            setIsLoading(false);
        }
    }


    const handleEnterKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && text && text.trim() !== '' && !isLoading) {
            EmojiCall();
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#E0E7FF] px-4 py-8 font-mono">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-4xl md:text-6xl font-black text-black mb-4 uppercase tracking-wider" style={{ textShadow: "4px 4px 1px #1e40af", }}>
                        movimoji 🎬
                    </h1>
                    <div className="inline-block bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-sm md:text-xl text-black font-bold">
                            MOVIE/TV NAMES ➡️ EMOJIS
                        </p>
                    </div>
                </div>

                <div className="bg-[#FF90E8] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 md:p-12 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 bg-yellow-400 border-4 border-black rounded-full"></div>
                    <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 w-4 h-4 md:w-6 md:h-6 bg-blue-400 border-4 border-black transform rotate-45"></div>

                    <div className="flex flex-col items-center gap-6 md:gap-8 relative z-10">
                        <div className="w-full">
                            <label className="block text-black font-bold mb-2 text-base md:text-lg uppercase">Input Text</label>
                            <input
                                autoFocus={true}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={handleEnterKey}
                                disabled={isLoading}
                                className={`w-full p-3 md:p-4 text-lg md:text-xl font-bold border-4 border-black focus:outline-none transition-all placeholder:text-gray-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] ${isLoading
                                    ? 'bg-gray-200 cursor-not-allowed text-gray-500'
                                    : 'bg-white text-black'
                                    }`}
                                type="text"
                                placeholder="ENTER MOVIE TITLE..."
                            />
                        </div>

                        <button
                            onClick={() => EmojiCall()}
                            disabled={!text || text.trim() === '' || isLoading}
                            className={`w-full px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl font-black uppercase border-4 border-black transition-all duration-200 ${!text || text.trim() === '' || isLoading
                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed shadow-none'
                                : 'bg-[#FFDE59] hover:bg-[#FFD54F] text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none cursor-pointer'
                                }`}
                        >
                            {isLoading ? 'GENERATING... ⏳' : 'GENERATE '}
                        </button>


                        {answer && (
                            <div
                                onClick={() => navigator.clipboard.writeText(answer)}
                                className="w-full mt-1 p-2 md:p-1 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-gray-50 transition-colors group relative"
                            >
                                <div className="absolute -top-3 -right-2 md:-top-5 md:-right-5 bg-[#23C55E] text-white font-bold px-2 py-1 md:px-3 md:py-1 text-xs md:text-base border-4 border-black transform rotate-12 hidden group-hover:block z-20">
                                    COPY!
                                </div>
                                <p className="text-3xl md:text-4xl text-center leading-relaxed animate-in fade-in zoom-in duration-300 break-words p-4">
                                    {answer}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center mt-8 md:mt-12">
                    <p className="text-center text-xs md:text-sm font-bold text-black bg-white inline-block border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        BUILT BY
                        <a target="_blank" href="https://rishi.fyi/" className="text-blue-600 hover:text-blue-800 underline decoration-4 decoration-yellow-400 underline-offset-4 ml-1"> @RUSTYRISHII</a>
                    </p>
                </div>
            </div>
        </div>
    );
}