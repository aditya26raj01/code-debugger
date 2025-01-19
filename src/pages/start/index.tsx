import { Box, Typography } from "@mui/material";
import React from "react";

export default function Page() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        Welcome to SandBugger.io!
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Your Ultimate Debugging Sandbox
      </Typography>
      <Typography sx={{ mt: 4 }}>
        🚀 <strong>Get Started:</strong> - Click <strong>Create Session</strong> to begin a new
        debugging session.
      </Typography>
      <Typography sx={{ mt: 4 }}>
        - Use our powerful tools to write, debug, and test code in a secure environment.
      </Typography>
      <Typography sx={{ mt: 4 }}>
        💡 <strong>Tips:</strong> - Sessions are isolated for safe experimentation.
      </Typography>
      <Typography sx={{ mt: 4 }}>
        - You can save and revisit your sessions anytime! 🎯{" "}
        <strong>Ready to Debug Smarter?</strong>
      </Typography>
      <Typography sx={{ mt: 4, fontSize: 22, fontWeight: 700 }}>Let&apos;s get started!</Typography>
    </Box>
  );
}
