import React from "react";
import { Box, Button, Divider, Drawer, Icon, Stack, Toolbar } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { Session } from "@/models/session";
import { MdOutlineChat } from "react-icons/md";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [sessions, setSessions] = React.useState<Session[] | null>(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/sessions")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setSessions(data.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCreateSession = () => {
    fetch("/api/session", {
      method: "POST",
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setSessions((prev) => {
          if (prev) {
            return [...prev, data.data];
          } else {
            setError(null);
            return [data.data];
          }
        });
        router.push(`/start/${data.data._id}`);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleSessionClick = (sessionId: string) => {
    router.push(`/start/${sessionId}`);
  };

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          zIndex: (theme) => theme.zIndex.appBar - 1,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Icon component={FiPlus} />}
          onClick={handleCreateSession}
        >
          Create Session
        </Button>
      </Box>
      <Divider sx={{ borderWidth: 1 }} />
      <Box sx={{ p: 2 }}>
        {loading ? (
          "Loading..."
        ) : error ? (
          error.message
        ) : (
          <Stack sx={{ gap: 1 }}>
            {sessions?.map((session) => (
              <Button
                key={session._id as string}
                variant={router.query.sessionId === session._id ? "contained" : "outlined"}
                fullWidth
                startIcon={<Icon component={MdOutlineChat} />}
                sx={{
                  wordBreak: "break-word",
                  lineHeight: 1.2,
                }}
                onClick={() => handleSessionClick(session._id as string)}
              >
                {session._id as string}
              </Button>
            ))}
          </Stack>
        )}
      </Box>
    </Drawer>
  );
}
