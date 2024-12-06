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
    await dbConnect();
    const sessions = await SessionModel.find({ userId });
    if (sessions.length === 0) {
      return res.status(404).json({ message: "Sessions not found" });
    }
    return res.status(200).json({ data: sessions });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
