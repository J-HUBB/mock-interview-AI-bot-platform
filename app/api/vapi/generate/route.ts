import { NextRequest } from "next/server";
import {generateText} from "ai";
import {google} from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
    return Response.json({ success: true, data: 'THANK YOU!'}, { status: 200 });
}

export async function POST(request: NextRequest) {
    const { type, role, level, techstack, amount, userId } = await request.json();

    try {
       const { text: questions } = await generateText({
        model: google('gemini-2.0-flash-001'),
        prompt: `Generate interview questions for the following job description, and return ONLY the questions in format like this: 
        [question1, question2, question3].
        Job Type: ${type}More actions
        Role: ${role}
        Level: ${level}
        Tech Stack: ${techstack}
        Number of Questions: ${amount}
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.

        Thank you! 
     `,
       });

       console.log(questions);

       const interview = {
         role, type, level, techstack: techstack.split(','),
         questions: JSON.parse(questions),
         userId,
         finalized: true,
         coverImage: getRandomInterviewCover(),
         createdAt: new Date().toISOString(),
         updatedAt: new Date().toISOString(),
       };

       await db.collection("interviews").add(interview);

       return Response.json({ success: true, questions: questions }, 
       {status: 200}
      );
     } catch (error) {
        console.error("Error:", error);

        return Response.json({ success: false, error: "Internal Server Error" }, 
         { status: 500 }
        );
    }
};

