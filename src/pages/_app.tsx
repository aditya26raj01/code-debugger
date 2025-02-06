import { theme } from "@/lib/theme";
import Layout from "@/providers/layout";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>BufFix.ai</title>
        <meta
          name="description"
          content="A simple AI based bug tracking tool for developers"
        />
      </Head>
      <CssBaseline />
      <ClerkProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ClerkProvider>
    </ThemeProvider>
  );
}
