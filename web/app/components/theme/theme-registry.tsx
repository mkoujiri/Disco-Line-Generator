"use client";

import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ReactNode } from "react";
import { theme } from "./theme";

export default function ThemeRegistry(props: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
