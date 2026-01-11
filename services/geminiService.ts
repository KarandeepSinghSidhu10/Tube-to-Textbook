
import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// FIX: Replaced the large prompt constant with a more focused system instruction.
const systemInstruction = `You are "TubeText," an advanced educational AI designed to convert raw video transcripts into high-quality, structured educational resources. Your goal is to make the content easier to read and learn than watching the original video. You will generate a textbook chapter and a quiz based on the provided transcript. The entire output must be a single, valid JSON object that adheres to the provided schema.`;

export const generateTextbookFromTranscript = async (transcript: string): Promise<GeneratedData> => {
    try {
        // FIX: Refactored the API call to use systemInstruction and a clearer user prompt.
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Please generate a textbook chapter and a 3-question multiple-choice quiz based on the following transcript.
The textbook chapter should be a comprehensive summary in Markdown, with a title, sections, key terms in bold, code blocks if necessary, and a summary of key takeaways.
Each quiz question should have 4 options.

Transcript:
---
${transcript}
---`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        textbookChapter: {
                            type: Type.STRING,
                            description: "A comprehensive summary of the transcript's content, formatted as a textbook chapter in Markdown. Start with an H1 title. Use H2 headers for main sections. Use bold for key terms. Include code blocks for any code. End with a bulleted list summary of key takeaways."
                        },
                        quiz: {
                            type: Type.ARRAY,
                            description: "An array of exactly 3 multiple-choice questions that test the main concepts.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: {
                                        type: Type.STRING,
                                        description: "The quiz question."
                                    },
                                    options: {
                                        type: Type.ARRAY,
                                        description: "An array of 4 possible answers.",
                                        items: { type: Type.STRING }
                                    },
                                    correctAnswer: {
                                        type: Type.STRING,
                                        description: "The correct answer, which must be one of the options."
                                    }
                                },
                                required: ["question", "options", "correctAnswer"]
                            }
                        }
                    },
                    required: ["textbookChapter", "quiz"]
                },
            },
        });

        const jsonText = response.text.trim();
        const parsedData: GeneratedData = JSON.parse(jsonText);
        
        if (!parsedData.textbookChapter || !Array.isArray(parsedData.quiz)) {
            throw new Error("Received malformed data from the API.");
        }

        return parsedData;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate content from the transcript. The model may be unavailable or the input might be invalid.");
    }
};
