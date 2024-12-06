import dbConnect from "@/lib/db-connect";
import SessionModel from "@/models/session";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).json({ message: "Bad request" });
    }
    await dbConnect();
    const session = await SessionModel.findOne({ _id: sessionId });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    return res.status(200).json({ data: session });
  }
  if (req.method === "POST") {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await dbConnect();
    const session = new SessionModel({ userId });
    await session.save();
    return res.status(200).json({ data: session });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
