import dbConnect from "@/lib/db-connect";
import SessionModel from "@/models/session";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { sessionId, code, language } = JSON.parse(req.body);

    await dbConnect();
    let session = await SessionModel.findOne({ userId, _id: sessionId });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    session = await SessionModel.findOneAndUpdate(
      { userId, _id: sessionId },
      { code: code, language: language }
    );
    return res.status(200).json({ data: session });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
