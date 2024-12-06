import React from "react";
import { Box } from "@mui/material";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <SignIn routing="hash" />
    </Box>
  );
}
