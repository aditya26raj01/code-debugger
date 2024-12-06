import { Avatar, Box } from "@mui/material";
import React from "react";
import Mathpix from "./mathpix";

interface BubbleProps {
  chat: { from: string; message: string };
}

export default function Bubble({ chat }: BubbleProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 2,
        justifyContent: chat.from === "AI" ? "left" : "right",
        flexDirection: chat.from === "AI" ? "row" : "row-reverse",
        alignItems: "center",
      }}
    >
      <Avatar>{chat.from === "AI" ? "AI" : "U"}</Avatar>
      <Mathpix latexText={chat.message} />{" "}
    </Box>
  );
}
