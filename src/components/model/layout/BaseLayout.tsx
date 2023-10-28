import React, { ReactNode } from "react";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { CssBaseline } from "@mui/material";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <SideBar />
      {/* メインコンテンツ */}
      <main style={{ flexGrow: 1, padding: 3, marginTop: 56 }}>{children}</main>
    </div>
  );
};
