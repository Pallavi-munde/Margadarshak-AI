import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_USER_API_KEY || (typeof process !== "undefined" ? process.env.GEMINI_API_KEY : "") || "";
const ai = new GoogleGenAI({ apiKey });

export interface RecommendationResult {
  career: string;
  confidence: number;
  reason: string;
  roadmap: string[];
  exams: string[];
  colleges: string[];
}

export async function getCareerRecommendations(marks: Record<string, number>, standard: string) {
  const model = "gemini-3.1-pro-preview";
  const prompt = `
    As an expert career counselor for Indian students, analyze the following ${standard} standard marks and recommend 3 suitable career paths.
    
    Student Marks:
    ${JSON.stringify(marks, null, 2)}
    
    Guidelines:
    1. For 12th standard, consider specific streams (PCM, PCB, Commerce, Arts). 
    2. Suggest popular Indian paths like Engineering (JEE), Medicine (NEET - MBBS/BDS), Law (CLAT), Chartered Accountancy (CA), Design (UCEED), UPSC/Civil Services, and emerging fields like Data Science or Digital Marketing.
    3. For 10th standard, suggest which Stream (Science, Commerce, Arts) to choose and the ultimate career goal.
    
    For each career path, provide:
    1. Career Name
    2. Confidence Score (0-100)
    3. Reason for recommendation based on strengths shown in marks
    4. A step-by-step roadmap (3-5 steps)
    5. Notable entrance exams in India for this path
    6. Top colleges/institutions in India
    
    Return the result as a raw JSON array of objects with the following schema:
    [{ "career": string, "confidence": number, "reason": string, "roadmap": string[], "exams": string[], "colleges": string[] }]
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text) as RecommendationResult[];
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
}
