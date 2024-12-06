import React from "react";
import Navbar from "@/components/navbar";
import { Box, Container, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import Sidebar from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  if (router.pathname === "/") {
    return (
      <Box sx={{ height: "100vh" }}>
        <Container maxWidth="xl" sx={{ height: "100%" }}>
          {children}
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      <Sidebar />
      <Container
        maxWidth="xl"
        sx={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}
      >
        <Navbar />
        <Toolbar />
        {children}
      </Container>
    </Box>
  );
}
