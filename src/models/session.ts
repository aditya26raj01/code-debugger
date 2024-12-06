import mongoose from "mongoose";

export interface Session extends mongoose.Document {
  userId: string;
  code: string;
  language: string;
  chats: {
    from: string;
    message: string;
  }[];
}

const SessionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    code: { type: String },
    language: { type: String },
    chats: {
      type: [
        {
          from: { type: String },
          message: { type: String },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const SessionModel = mongoose.models.Session || mongoose.model<Session>("Session", SessionSchema);

export default SessionModel;
