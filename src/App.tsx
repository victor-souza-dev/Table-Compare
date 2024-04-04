import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom/dist";

import { queryClient } from "./configs/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={createTheme({ palette: { mode: "light" } })}>
        <CssBaseline />
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
