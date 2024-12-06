import Chat from "@/components/chat";
import CodeEditor from "@/components/code-editor";
import { Session } from "@/models/session";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    if (!router.query.sessionId) return;
    setLoading(true);
    setError(null);
    fetch("/api/session?sessionId=" + router.query.sessionId)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setSession(data.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router.query.sessionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Box sx={{ display: "flex", gap: 2, py: 2, height: "100%", overflow: "hidden" }}>
      <Box sx={{ flex: 1 }}>
        <CodeEditor session={session} setSession={setSession} />
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", width: "50%" }}>
        <Chat session={session} setSession={setSession} />
      </Box>
    </Box>
  );
}
