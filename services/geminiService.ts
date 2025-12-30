import { GoogleGenAI } from "@google/genai";
import { UserGoal } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getAICoachingTip = async (goal: UserGoal, lastRunDistance: number): Promise<string> => {
  if (!apiKey) {
    return "AI Coach: Configure API Key to receive personalized tips!";
  }

  try {
    const prompt = `
      You are an elite fitness coach for the 'FitRun' app. 
      The user has a goal to: ${goal}.
      Their last run was ${lastRunDistance}km.
      
      Give a short, punchy, motivational tip (max 2 sentences) specifically for this user to help them improve. 
      Tone: Cyberpunk, high-energy, encouraging.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Keep pushing your limits! Your next run will be your best.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Stay consistent! Hydrate well and rest to recover.";
  }
};