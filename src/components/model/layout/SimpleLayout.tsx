import React, { ReactNode } from "react";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { CssBaseline } from "@mui/material";
import { RecoilRoot } from "recoil";

export const SimpleLayoutImple = ({ children }: { children: ReactNode }) => {
  return (
    <RecoilRoot>
      <div style={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        {/* メインコンテンツ */}
        <main style={{ flexGrow: 1, padding: 3, marginTop: 56 }}>
          {children}
        </main>
      </div>
    </RecoilRoot>
  );
};
