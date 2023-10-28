import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap>
          メニューバー
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
