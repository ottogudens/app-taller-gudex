import { GoogleGenAI } from "@google/genai";

// Per coding guidelines, assume API_KEY is available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateServiceSummary = async (notes: string): Promise<string> => {
  // Per coding guidelines, removed check for API_KEY.
  try {
    // FIX: Moved detailed instructions from the prompt to systemInstruction and simplified the contents to just the notes. This is the recommended practice.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: notes,
      config: {
        systemInstruction: `You are a helpful assistant for an auto repair shop. Your task is to translate technical mechanic notes into a clear, concise, and friendly summary for the car owner. Do not be overly technical. Focus on what was done and why it was important. Provide a brief summary suitable for a client.`
      }
    });

    // Per coding guidelines, accessing the .text property is the correct way to get the string output.
    return response.text.trim();
  } catch (error) {
    console.error("Error generating summary with Gemini:", error);
    return "Could not generate summary at this time.";
  }
};
