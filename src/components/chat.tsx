import React from "react";
import { Backdrop, Box, Icon, IconButton, Stack, TextField, Typography } from "@mui/material";
import { BiSend } from "react-icons/bi";
import Bubble from "./bubble";
import { Session } from "@/models/session";

interface ChatProps {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

export default function Chat({ session, setSession }: ChatProps) {
  const [message, setMessage] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const handleSendMessage = () => {
    if (!message) return;
    if (!session?._id) {
      alert("Session ID is missing");
      return;
    }
    setLoading(true);
    setSession((prev) => {
      if (prev) {
        return {
          ...prev,
          chats: prev.chats
            ? [...prev.chats, { from: "USER", message }]
            : [{ from: "USER", message }],
        } as Session;
      } else {
        return prev;
      }
    });
    setMessage("");
    fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        sessionId: session._id,
        message,
        from: "USER",
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setSession((prev) => {
          if (prev) {
            return {
              ...prev,
              code: data.data.code,
              chats: data.data.chats,
            };
          } else {
            return {
              ...data.data,
            };
          }
        });
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Backdrop
        sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
        open={loading}
      />
      <Typography variant="h6" sx={{ mb: 1 }}>
        Chat with AI:
      </Typography>
      <Box
        sx={{ border: 1, borderColor: "divider", height: "100%", overflow: "scroll", mb: 2, p: 2 }}
      >
        <Stack sx={{ gap: 2 }}>
          {session?.chats.map((chat, index) => (
            <Box key={index}>
              <Bubble chat={chat} />
            </Box>
          ))}
        </Stack>
      </Box>
      <TextField
        autoComplete="off"
        disabled={loading}
        size="small"
        placeholder="Enter message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton disabled={loading} onClick={() => handleSendMessage()}>
                <Icon component={BiSend} />
              </IconButton>
            ),
          },
        }}
      />
    </>
  );
}
