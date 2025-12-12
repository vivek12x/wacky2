import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { history, balance } = await req.json();

        const apiKey = process.env.GEMINI_API_KEY;
        console.log("API Key present:", !!apiKey);
        if (!apiKey) {
            return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      Analyze the following customer transaction history and current balance to generate a credit score between 0 and 100.
      A score of 100 means excellent creditworthiness, and 0 means poor.
      
      Current Balance: ${balance} (Positive means they owe money)
      Transaction History: ${JSON.stringify(history)}
      
      Provide only the number representing the credit score.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const creditScore = parseInt(text.trim());

        if (isNaN(creditScore)) {
            return NextResponse.json({ error: "Failed to generate valid score" }, { status: 500 });
        }

        return NextResponse.json({ creditScore });

    } catch (error: any) {
        console.error("Error generating credit score:", error);
        return NextResponse.json({
            error: error.message || "Internal Server Error",
            details: error.toString()
        }, { status: 500 });
    }
}
