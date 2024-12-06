import React from "react";
import Editor from "@monaco-editor/react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useDebounce } from "use-debounce";
import { Session } from "@/models/session";

interface CodeEditorProps {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

const CodeEditor = ({ session, setSession }: CodeEditorProps) => {
  const router = useRouter();

  const [debouncedCode] = useDebounce(session?.code ?? "", 1000);

  React.useEffect(() => {
    if (session?.code && session?.language) {
      fetch("/api/code", {
        method: "POST",
        body: JSON.stringify({
          sessionId: router.query.sessionId,
          code: session.code,
          language: session.language,
        }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCode, session?.code, session?.language]);

  if (!session?.language) {
    return (
      <>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Choose a language for the code:
        </Typography>
        <Stack sx={{ flexDirection: "row", gap: 1, flexWrap: "wrap" }}>
          {[
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
          ].map((l) => (
            <Button
              size="small"
              variant={session?.language === l ? "contained" : "outlined"}
              key={l}
              onClick={() => {
                setSession((prev) => {
                  if (prev) {
                    return {
                      ...prev,
                      language: l,
                    } as Session;
                  } else {
                    return prev;
                  }
                });
              }}
            >
              {l}
            </Button>
          ))}
        </Stack>
      </>
    );
  }

  return (
    <>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Enter the code below:
      </Typography>
      <Button size="small" variant={"contained"}>
        {session?.language}
      </Button>
      <Box sx={{ height: 600, width: "100%", my: 2 }}>
        <Editor
          height="100%"
          defaultLanguage={session?.language}
          theme="vs-dark"
          value={session?.code}
          onChange={(value) => {
            setSession((prev) => {
              if (prev) {
                return {
                  ...prev,
                  code: value,
                } as Session;
              } else {
                return prev;
              }
            });
          }}
        />
      </Box>
    </>
  );
};

export default CodeEditor;
