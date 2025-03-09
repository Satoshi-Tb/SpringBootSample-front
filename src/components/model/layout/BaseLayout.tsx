import React, { ReactNode } from "react";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { Box, CssBaseline } from "@mui/material";
import { RecoilRoot } from "recoil";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RecoilRoot>
      <Header />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        {/* メインコンテンツ */}
        <Box component="main" sx={{ flex: 1, p: 1, mt: "60px" }}>
          {children}
        </Box>
      </Box>
    </RecoilRoot>
  );
};
