import dbConnect from "@/lib/db-connect";
import SessionModel from "@/models/session";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { sessionId, message, from } = JSON.parse(req.body);

    await dbConnect();
    let session = await SessionModel.findOne({ userId, _id: sessionId });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    console.log(
      "Prompt: ",
      `Code: ${session.code} Prompt: ${message} Coding Language: ${session.language}`
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI based code helper tool developed by a company called SandBugger.io.",
        },
        {
          role: "user",
          content: `Code: ${session.code} Prompt: ${message} Coding Language: ${session.language}`,
        },
      ],
    });

    const code = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI based code helper tool developed by a company called SandBugger.io.",
        },
        {
          role: "user",
          content: `Code: ${completion.choices[0].message.content} Prompt: Extract just the code to be shown in an IDE, just give code no markdown specifier for what code language it is.`,
        },
      ],
    });

    console.log("Code: ", code.choices[0].message.content);

    const language = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI based code helper tool developed by a company called SandBugger.io.",
        },
        {
          role: "user",
          content: `Code: ${code.choices[0].message.content} Available Languages: '
            "cpp",
            "c",
            "java",
            "python",
            "javascript",
            "typescript",
            "html",
            "css",
            "json",
            "xml",
            "markdown",
            "plaintext",
          ]' Prompt: Determine the language of the code and just send back the language keyword from the list above no other text also in exact same casing and spelling.`,
        },
      ],
    });
    console.log(language.choices[0].message.content);

    session = await SessionModel.findOneAndUpdate(
      { userId, _id: sessionId },
      {
        code: code.choices[0].message.content,
        language: language.choices[0].message.content,
        $push: {
          chats: {
            $each: [
              { from, message },
              { from: "AI", message: completion.choices[0].message.content },
            ],
          },
        },
      },
      { new: true }
    );
    return res.status(200).json({ data: session });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
