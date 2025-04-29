import React, { ReactNode } from "react";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { Box, CssBaseline } from "@mui/material";
import { RecoilRoot } from "recoil";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RecoilRoot>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header />
        <Box sx={{ display: "flex" }}>
          <SideBar />
          {/* メインコンテンツ */}
          <Box component="main" sx={{ flex: 1, p: 1, mt: "60px" }}>
            {children}
          </Box>
        </Box>
      </LocalizationProvider>
    </RecoilRoot>
  );
};
