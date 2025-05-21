import React from "react";
import { AppBar, Toolbar, Icon, Stack, Typography } from "@mui/material";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { FiCodesandbox } from "react-icons/fi";

export default function Navbar() {
  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack sx={{ flexDirection: "row", gap: 1.5, alignItems: "center" }}>
          <Icon component={FiCodesandbox} sx={{ fontSize: 40 }} />
          <Typography variant="h6">BugFix.ai</Typography>
        </Stack>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
